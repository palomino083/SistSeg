import React, { useEffect, useState } from 'react'
import { getProjects, getTasks } from './api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(()=>{ async function load(){
    const p = await getProjects(); setProjects(p); if(p[0]) setSelected(p[0].id)
  } load() }, [])

  useEffect(()=>{ if(selected) getTasks(selected).then(setTasks) }, [selected])

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Proyectos</h1>
      <div className="flex gap-6">
        <div className="w-80 bg-white p-4 rounded shadow">
          {projects.map(p=> <div key={p.id} onClick={()=>setSelected(p.id)} className={`p-2 cursor-pointer ${p.id===selected? 'bg-indigo-50' : ''}`}>{p.name}</div>)}
        </div>
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h2 className="font-semibold">Tareas</h2>
          <ul>
            {tasks.map(t=> <li key={t.id} className="p-2 border-b">{t.title} - {t.progress}%</li>)}
          </ul>
          <Link to="/analytics" className="mt-4 inline-block text-indigo-600">Ver analítica</Link>
        </div>
      </div>
    </div>
  )
}
