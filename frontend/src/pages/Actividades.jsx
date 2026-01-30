import { useEffect, useState } from 'react'
import { getActividades, addActividad } from '../services/api'

export default function Actividades(){
  const [actividades, setActividades] = useState([])
  const [nuevo, setNuevo] = useState({ nombre:'', estado:'Pendiente', proyecto_id:1 })

  useEffect(()=>{ getActividades().then(res=>setActividades(res.data)).catch(()=>setActividades([])) },[])

  const handleAdd = async ()=>{
    try{
      await addActividad(nuevo)
      setNuevo({ nombre:'', estado:'Pendiente', proyecto_id:1 })
      const res = await getActividades(); setActividades(res.data)
    }catch(err){ alert('Error creando actividad') }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Actividades</h2>
      <div className="mb-4 flex gap-2">
        <input className="border p-2" placeholder="Nombre" value={nuevo.nombre} onChange={e=>setNuevo({...nuevo, nombre:e.target.value})} />
        <select className="border p-2" value={nuevo.estado} onChange={e=>setNuevo({...nuevo, estado:e.target.value})}>
          <option>Pendiente</option>
          <option>En progreso</option>
          <option>Finalizado</option>
        </select>
        <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">Agregar</button>
      </div>
      <ul>
        {actividades.map(a=> <li key={a.id} className="bg-white shadow rounded p-3 mb-2"><strong>{a.nombre}</strong> — {a.estado}</li>)}
      </ul>
    </div>
  )
}
