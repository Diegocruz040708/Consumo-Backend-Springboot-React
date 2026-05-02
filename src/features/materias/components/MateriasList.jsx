import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

export default function MateriasList({ materias = [], onEdit, onDelete }) {
  if (!materias || materias.length === 0) {
    return <div className="text-center py-8 text-gray-500">No hay materias.</div>
  }

  return (
    <div className="space-y-3">
      {materias.map((m) => (
        <div key={m.id} className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-[#eef6ff] flex items-center justify-center" style={{ border: '2px solid #d8c4b4' }}>
              <div className="text-[#4f709c] font-bold">M</div>
            </div>
            <div>
              <div className="text-lg font-semibold" style={{ color: '#213555' }}>{m.nombre}</div>
              <div className="text-sm text-gray-600">Créditos: <span className="font-medium">{m.creditos}</span> • Semestre: <span className="font-medium">{m.semestre ? (m.semestre.nombre || m.semestre) : '-'}</span></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => onEdit && onEdit(m)} title="Editar" className="p-2 rounded hover:bg-[#eef4fb]" style={{ color: '#4f709c' }}>
              <Edit size={16} />
            </button>
            <button onClick={() => onDelete && onDelete(m.id)} title="Eliminar" className="p-2 rounded hover:bg-[#fff1ea]" style={{ color: '#d8c4b4' }}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}