from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import os

from . import models, crud, schemas
from .database import engine, Base, SessionLocal
from .auth import create_access_token, authenticate_user, get_current_user, require_role
from . import analytics

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title='Sistema de Seguimiento de Proyectos')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analytics.router, prefix="/api/analytics")

# Auth endpoints
from fastapi.security import OAuth2PasswordRequestForm

@app.post('/api/auth/register', response_model=schemas.User)
def register(user: schemas.UserCreate):
    db = SessionLocal()
    existing = crud.get_user_by_username(db, user.username)
    if existing:
        raise HTTPException(status_code=400, detail='Username already registered')
    return crud.create_user(db, user)

@app.post('/api/auth/login')
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail='Incorrect username or password')
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Projects & tasks (protected)
@app.get('/api/proyectos', response_model=list[schemas.Project])
def listar_proyectos():
    db = SessionLocal()
    return crud.get_projects(db)

@app.post('/api/proyectos', response_model=schemas.Project, dependencies=[Depends(require_role(['admin','manager']))])
def crear_proyecto(proyecto: schemas.ProjectCreate):
    db = SessionLocal()
    return crud.create_project(db, proyecto)

@app.get('/api/tareas/{proyecto_id}', response_model=list[schemas.Task])
def listar_tareas(proyecto_id: int):
    db = SessionLocal()
    return crud.get_tasks_by_project(db, proyecto_id)

@app.post('/api/tareas', response_model=schemas.Task, dependencies=[Depends(require_role(['admin','manager','tecnico']))])
def crear_tarea(tarea: schemas.TaskCreate):
    db = SessionLocal()
    return crud.create_task(db, tarea)
