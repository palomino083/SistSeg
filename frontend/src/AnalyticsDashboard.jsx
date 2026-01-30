import React, { useEffect, useState } from 'react'
import { getKpis, getCurve } from './api'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function AnalyticsDashboard(){
  const [kpis, setKpis] = useState(null)
  const [curve, setCurve] = useState([])

  useEffect(()=>{ getKpis().then(setKpis); getCurve(1).then(setCurve) }, [])

  if(!kpis) return <div className="p-6">Cargando...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Analítica</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">Avance físico: <div className="text-xl font-semibold">{kpis.avg_physical_progress}%</div></div>
        <div className="p-4 bg-white rounded shadow">Ejecución financiera: <div className="text-xl font-semibold">{kpis.financial_execution_pct}%</div></div>
        <div className="p-4 bg-white rounded shadow">Riesgos críticos: <div className="text-xl font-semibold text-red-600">{kpis.critical_risks_count}</div></div>
      </div>

      <div className="bg-white p-4 rounded shadow" style={{height:300}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={curve}>
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="planned" stroke="#8884d8" />
            <Line type="monotone" dataKey="actual" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
