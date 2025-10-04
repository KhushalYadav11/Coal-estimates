from fastapi import APIRouter

router = APIRouter(prefix="/jobs", tags=["jobs"])


from fastapi import UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os, shutil, uuid
from app.deps import get_db
from app.models import Job
from app.tasks import run_meshroom_job, compute_volume

UPLOAD_DIR = "/tmp/coal_uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/")
def submit_job(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: int = 1  # TODO: Replace with real user auth
):
    # Save uploaded file (image zip or video)
    job_uuid = str(uuid.uuid4())
    user_dir = os.path.join(UPLOAD_DIR, f"user_{user_id}")
    os.makedirs(user_dir, exist_ok=True)
    file_path = os.path.join(user_dir, f"{job_uuid}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Create DB job entry
    job = Job(user_id=user_id, status="pending")
    db.add(job)
    db.commit()
    db.refresh(job)

    # Trigger Meshroom job via Celery
    run_meshroom_job.delay(job.id, file_path)

    return {"job_id": job.id, "status": "submitted"}

@router.get("/")
def list_jobs():
    # TODO: List jobs for user
    return {"jobs": []}
