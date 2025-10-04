from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login():
    # TODO: Implement login
    return {"msg": "Login endpoint"}

@router.post("/register")
def register():
    # TODO: Implement registration
    return {"msg": "Register endpoint"}
