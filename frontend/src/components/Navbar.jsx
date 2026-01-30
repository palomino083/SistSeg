import React from 'react'

export default function Navbar({ setView }){
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between">
      <h1 className="text-xl font-semibold">Sistseg</h1>
      <div className="space-x-4">
        <button onClick={() => setView('proyectos')} className="hover:underline">Proyectos</button>
        <button onClick={() => setView('actividades')} className="hover:underline">Actividades</button>
      </div>
    </nav>
  )
}
