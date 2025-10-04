# Coal Pile Measurement Backend

This backend uses FastAPI, Celery, Redis, and PostgreSQL. It is designed for photogrammetry-based coal pile measurement, job queueing, and client management.

## Features
- User authentication and client portal
- Image/video upload for 3D reconstruction
- Meshroom CLI integration for photogrammetry
- Trimesh/CloudCompare integration for volume calculation
- ArUco/checkerboard detection for scale calibration
- Job queue with Celery + Redis
- PostgreSQL for persistent storage
- PDF/CSV report generation
- REST API for frontend integration

## Setup (Development)
1. Clone the repo and enter the backend directory.
2. Create a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start Redis and PostgreSQL (Docker recommended).
5. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
6. Start Celery worker:
   ```bash
   celery -A app.worker worker --loglevel=info
   ```

## Configuration
- Edit `.env` for database, Redis, and other settings.
- Set paths for Meshroom, CloudCompare, and GPU options as needed.

## Documentation
- See `docs/` for API and usage details.
