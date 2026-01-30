import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
const api = axios.create({ baseURL: API_URL })

export const getProyectos = () => api.get('/proyectos')
export const addProyecto = (data) => api.post('/proyectos', data)
export const getActividades = () => api.get('/actividades')
export const addActividad = (data) => api.post('/actividades', data)

export default api
