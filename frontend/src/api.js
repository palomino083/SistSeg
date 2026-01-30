import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export function setAuthToken(token){
  if(token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete api.defaults.headers.common['Authorization']
}

export async function login(credentials){
  const form = new URLSearchParams()
  form.append('username', credentials.username)
  form.append('password', credentials.password)
  const res = await api.post('/auth/login', form)
  return res.data
}

export async function getProjects(){
  const res = await api.get('/proyectos')
  return res.data
}

export async function getTasks(projectId){
  const res = await api.get(`/tareas/${projectId}`)
  return res.data
}

export async function createTask(task){
  const res = await api.post('/tareas', task)
  return res.data
}

export async function getKpis(){
  const res = await api.get('/analytics/kpis')
  return res.data
}

export async function getCurve(projectId){
  const res = await api.get(`/analytics/curve/${projectId}`)
  return res.data
}

export default api
