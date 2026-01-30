from sqlalchemy.orm import Session
import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Users
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed = pwd_context.hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Projects
def get_projects(db: Session):
    return db.query(models.Project).all()

def create_project(db: Session, proyecto: schemas.ProjectCreate):
    db_proyecto = models.Project(**proyecto.dict())
    db.add(db_proyecto)
    db.commit()
    db.refresh(db_proyecto)
    return db_proyecto

# Tasks
def get_tasks_by_project(db: Session, proyecto_id: int):
    return db.query(models.Task).filter(models.Task.project_id == proyecto_id).all()

def create_task(db: Session, tarea: schemas.TaskCreate):
    db_tarea = models.Task(**tarea.dict())
    db.add(db_tarea)
    db.commit()
    db.refresh(db_tarea)
    return db_tarea
