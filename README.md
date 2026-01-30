# Sistema de Seguimiento de Proyectos

## Desarrollo local (VS Code)
1. Backend:
   - Crear y activar virtualenv en /backend
   - pip install -r requirements.txt
   - cp .env.example .env y ajustar variables
   - uvicorn main:app --reload

2. Frontend:
   - cd frontend
   - npm install
   - npm run dev

3. Si no tienes Postgres local, puedes usar docker-compose: docker-compose up -d db

## Notas
- El frontend está configurado para proxear `/api` a `http://127.0.0.1:8000` (vite.config.js). 
- Crear un usuario admin con `/api/auth/register` o implementar seed script.
