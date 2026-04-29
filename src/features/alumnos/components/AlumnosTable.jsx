import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

export default function AlumnosTable({ alumnos = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-[#213555] text-white hidden sm:table-header-group">
          <tr>
            <th className="px-3 py-2 text-left text-sm">Imagen</th>
            <th className="px-3 py-2 text-left text-sm">Nombre</th>
            <th className="px-3 py-2 text-left text-sm">Apellido</th>
            <th className="px-3 py-2 text-left text-sm">Email</th>
            <th className="px-3 py-2 text-left text-sm">No. Control</th>
            <th className="px-3 py-2 text-left text-sm">Teléfono</th>
            <th className="px-3 py-2 text-left text-sm">Carrera</th>
            <th className="px-3 py-2 text-left text-sm">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {alumnos.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-6 text-center text-gray-500">
                No hay registros.
              </td>
            </tr>
          ) : (
            alumnos.map((a) => (
              <tr key={a.id} className="hover:bg-[#f3f7fb] flex flex-col sm:table-row">
                <td className="px-3 py-3 sm:py-2 block sm:table-cell sm:text-left">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Imagen</span>
                  <img
                    src={a.imagen || 'https://via.placeholder.com/48'}
                    alt={`${a.nombre} ${a.apellido}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border"
                  />
                </td>
                <td className="px-3 py-1 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Nombre</span>
                  {a.nombre}
                </td>
                <td className="px-3 py-1 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Apellido</span>
                  {a.apellido}
                </td>
                <td className="px-3 py-1 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Email</span>
                  {a.email}
                </td>
                <td className="px-3 py-1 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">No. Control</span>
                  {a.numeroControl}
                </td>
                <td className="px-3 py-1 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Teléfono</span>
                  {a.telefono}
                </td>
                <td className="px-3 py-1 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Carrera</span>
                  {a.carrera}
                </td>
                <td className="px-3 py-2 sm:py-2 block sm:table-cell">
                  <span className="sm:hidden font-bold text-xs text-gray-500">Acciones</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(a)}
                      title="Editar"
                      className="p-2 rounded hover:bg-[#eef4fb]"
                      style={{ color: '#4f709c' }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(a.id)}
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
