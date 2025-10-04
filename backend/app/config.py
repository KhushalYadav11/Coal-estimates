import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Coal Pile Measurement Backend"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://user:password@localhost/coal_db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecret")
    MESHROOM_PATH: str = os.getenv("MESHROOM_PATH", "/usr/local/bin/meshroom_batch")
    CLOUDCOMPARE_PATH: str = os.getenv("CLOUDCOMPARE_PATH", "/usr/local/bin/CloudCompare")
    GPU_ENABLED: bool = os.getenv("GPU_ENABLED", "true").lower() == "true"
    COAL_DENSITY: float = float(os.getenv("COAL_DENSITY", 0.8))  # tonnes/m^3
    FRAME_EXTRACTION_INTERVAL: float = float(os.getenv("FRAME_EXTRACTION_INTERVAL", 1.0))

settings = Settings()
