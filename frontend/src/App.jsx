import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Proyectos from './pages/Proyectos'
import Actividades from './pages/Actividades'

export default function App(){
  const [view, setView] = useState('proyectos')
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar setView={setView} />
      <div className="p-6">
        {view === 'proyectos' ? <Proyectos /> : <Actividades />}
      </div>
    </div>
  )
}
