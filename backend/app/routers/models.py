from fastapi import APIRouter

router = APIRouter(prefix="/models", tags=["models"])

@router.get("/{job_id}")
def get_model(job_id: int):
    # TODO: Serve 3D model files
    return {"msg": f"Model for job {job_id}"}
