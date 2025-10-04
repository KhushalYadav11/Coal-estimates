from app.worker import celery_app
from app.config import settings
from app.db import SessionLocal
from app.models import Job
import os, subprocess, shutil
import trimesh

@celery_app.task
def run_meshroom_job(job_id: int, input_path: str):
    db = SessionLocal()
    try:
        job = db.query(Job).filter(Job.id == job_id).first()
        if not job:
            return {"error": "Job not found"}
        
        # Update job status to processing
        job.status = "processing"
        db.commit()
        # Prepare output dir
        output_dir = os.path.join("/tmp/coal_results", f"job_{job_id}")
        os.makedirs(output_dir, exist_ok=True)
        # Run Meshroom CLI
        meshroom_cmd = [settings.MESHROOM_PATH, "--input", input_path, "--output", output_dir]
        subprocess.run(meshroom_cmd, check=True)
        # Find .obj
        obj_path = os.path.join(output_dir, "texturedMesh.obj")
        if not os.path.exists(obj_path):
            # fallback: search for any .obj
            for root, _, files in os.walk(output_dir):
                for f in files:
                    if f.endswith(".obj"):
                        obj_path = os.path.join(root, f)
                        break
        if not os.path.exists(obj_path):
            job.status = "failed"
            job.model_path = None
            db.commit()
            return {"error": "No 3D model generated"}
        
        # Update job with model path
        job.model_path = obj_path
        job.status = "reconstructed"
        db.commit()
        
        # Trigger volume calculation
        compute_volume.delay(job_id, obj_path)
        return {"status": "success", "model_path": obj_path}
        
    except subprocess.CalledProcessError as e:
        job.status = "failed"
        job.model_path = None
        db.commit()
        return {"error": f"Meshroom processing failed: {str(e)}"}
    except Exception as e:
        job.status = "failed"
        job.model_path = None
        db.commit()
        return {"error": f"Unexpected error: {str(e)}"}
    finally:
        db.close()

@celery_app.task
def compute_volume(job_id: int, obj_path: str):
    db = SessionLocal()
    try:
        job = db.query(Job).filter(Job.id == job_id).first()
        if not job:
            return {"error": "Job not found"}
        
        if not os.path.exists(obj_path):
            job.status = "failed"
            db.commit()
            return {"error": "Model file not found"}
        # Use Trimesh for volume calculation
        mesh = trimesh.load(obj_path)
        volume = mesh.volume
        bounds = mesh.bounding_box.extents
        length, width, height = bounds.tolist()
        # Estimate weight
        weight = volume * float(settings.COAL_DENSITY)
        job.volume = volume
        job.length = length
        job.width = width
        job.height = height
        job.weight = weight
        job.status = "complete"
        db.commit()
        return {"status": "success", "volume": volume, "weight": weight}
        
    except Exception as e:
        job.status = "failed"
        db.commit()
        return {"error": f"Volume calculation failed: {str(e)}"}
    finally:
        db.close()
