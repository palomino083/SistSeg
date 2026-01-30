from pydantic import BaseModel
from typing import Optional

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class UserBase(BaseModel):
    username: str
    email: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: Optional[str] = 'tecnico'

class User(UserBase):
    id: int
    role: str
    class Config:
        orm_mode = True

class TaskBase(BaseModel):
    title: str
    status: Optional[str] = 'Por hacer'
    progress: Optional[float] = 0.0
    assignee: Optional[str] = None
    start: Optional[str] = None
    end: Optional[str] = None
    project_id: int
    risk_level: Optional[str] = 'none'

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    class Config:
        orm_mode = True

class ProjectBase(BaseModel):
    name: str
    status: Optional[str] = 'Planificado'
    budget: Optional[float] = 0.0
    spent: Optional[float] = 0.0

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    tasks: list[Task] = []
    class Config:
        orm_mode = True
