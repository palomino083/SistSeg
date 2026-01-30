import React, { useState } from 'react'
import { login, setAuthToken } from './api'

export default function Login({ setToken }){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    try{
      const data = await login({username, password})
      setAuthToken(data.access_token)
      setToken(data.access_token)
    }catch(err){
      setError('Credenciales incorrectas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Ingresar</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="mb-3">
          <label className="block text-sm">Usuario</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} className="border p-2 w-64" />
        </div>
        <div className="mb-3">
          <label className="block text-sm">Contraseña</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="border p-2 w-64" />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Entrar</button>
      </form>
    </div>
  )
}
