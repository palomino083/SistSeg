from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import database, crud

router = APIRouter()

@router.get('/kpis')
def get_kpis():
    # Ejemplo simplificado: retornar valores ficticios o calcular con queries
    return {
        'avg_physical_progress': 45.2,
        'financial_execution_pct': 35.0,
        'cost_time_variation': -10.2,
        'critical_risks_count': 2
    }

@router.get('/curve/{project_id}')
def get_curve(project_id: int):
    # retornar curva S mock o calcular desde hitos/avance
    return [
        {'period': '2025-09', 'planned': 10, 'actual': 5},
        {'period': '2025-10', 'planned': 35, 'actual': 20},
        {'period': '2025-11', 'planned': 65, 'actual': 42},
        {'period': '2025-12', 'planned': 100, 'actual': 60},
    ]
