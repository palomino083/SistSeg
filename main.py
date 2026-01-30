from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import auth, activities

app = FastAPI(title="Sistema de Supervisión de Actividades")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(activities.router, prefix="/api/activities", tags=["activities"])
