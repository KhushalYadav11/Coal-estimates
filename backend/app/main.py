from fastapi import FastAPI
from app.routers import auth, jobs, models, reports, dashboard

app = FastAPI()

app.include_router(auth.router)
app.include_router(jobs.router)
app.include_router(models.router)
app.include_router(reports.router)
app.include_router(dashboard.router)
