import { useEffect, useState } from 'react'
import { getProyectos, addProyecto } from '../services/api'

export default function Proyectos(){
  const [proyectos, setProyectos] = useState([])
  const [nuevo, setNuevo] = useState({ nombre:'', descripcion:'', responsable:'' })

  useEffect(()=>{ getProyectos().then(res=>setProyectos(res.data)).catch(()=>setProyectos([])) },[])

  const handleAdd = async ()=>{
    try{
      await addProyecto(nuevo)
      setNuevo({ nombre:'', descripcion:'', responsable:'' })
      const res = await getProyectos(); setProyectos(res.data)
    }catch(err){ alert('Error creando proyecto') }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Proyectos</h2>
      <div className="mb-4 flex gap-2">
        <input className="border p-2" placeholder="Nombre" value={nuevo.nombre} onChange={e=>setNuevo({...nuevo, nombre:e.target.value})} />
        <input className="border p-2" placeholder="Responsable" value={nuevo.responsable} onChange={e=>setNuevo({...nuevo, responsable:e.target.value})} />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Agregar</button>
      </div>
      <ul>
        {proyectos.map(p=> <li key={p.id} className="bg-white shadow rounded p-3 mb-2"><strong>{p.nombre}</strong> — {p.responsable}</li>)}
      </ul>
    </div>
  )
}
