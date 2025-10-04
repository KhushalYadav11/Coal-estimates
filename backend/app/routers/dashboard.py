from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/")
def dashboard():
    # TODO: Return dashboard analytics
    return {"msg": "Dashboard data"}
