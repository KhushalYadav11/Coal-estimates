from fastapi import APIRouter

router = APIRouter(prefix="/reports", tags=["reports"])

@router.get("/{job_id}")
def get_report(job_id: int):
    # TODO: Generate and return PDF/CSV report
    return {"msg": f"Report for job {job_id}"}
