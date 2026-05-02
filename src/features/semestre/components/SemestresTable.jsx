import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

export default function SemestresTable({ semestres = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-[#213555] text-white hidden sm:table-header-group">
          <tr>
            <th className="px-3 py-2 text-left text-sm">#</th>
            <th className="px-3 py-2 text-left text-sm">Nombre</th>
            <th className="px-3 py-2 text-left text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {semestres.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                No hay semestres registrados.
              </td>
            </tr>
          ) : (
            semestres.map((s, index) => (
              <tr key={s.id} className="hover:bg-[#f3f7fb] flex flex-col sm:table-row">
                <td className="px-3 py-3 sm:py-2 block sm:table-cell sm:text-left">
                  <span className="sm:hidden font-bold text-xs text-gray-500">#</span>
                  {(index + 1)}
                </td>
                <td className="px-3 py-1 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Nombre</span>
                  {s.nombre}
                </td>
                <td className="px-3 py-2 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Acciones</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(s)}
                      title="Editar"
                      className="p-2 rounded hover:bg-[#eef4fb]"
                      style={{ color: '#4f709c' }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(s.id)}
                      title="Eliminar"
                      className="p-2 rounded hover:bg-[#fff1ea]"
                      style={{ color: '#d8c4b4' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
