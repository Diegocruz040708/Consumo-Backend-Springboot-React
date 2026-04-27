import React from 'react'
import { Edit, Trash2 } from 'lucide-react'

export default function AlumnosTable({ alumnos = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-[#213555] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Imagen</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Apellido</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Número de Control</th>
            <th className="px-4 py-2 text-left">Teléfono</th>
            <th className="px-4 py-2 text-left">Carrera</th>
            <th className="px-4 py-2 text-left">Acciones</th>
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
              <tr key={a.id} className="hover:bg-[#f3f7fb]">
                <td className="px-4 py-3">
                  <img
                    src={a.imagen || 'https://via.placeholder.com/48'}
                    alt={`${a.nombre} ${a.apellido}`}
                    className="w-12 h-12 object-cover rounded-full border"
                  />
                </td>
                <td className="px-4 py-3">{a.nombre}</td>
                <td className="px-4 py-3">{a.apellido}</td>
                <td className="px-4 py-3">{a.email}</td>
                <td className="px-4 py-3">{a.numeroControl}</td>
                <td className="px-4 py-3">{a.telefono}</td>
                <td className="px-4 py-3">{a.carrera}</td>
                <td className="px-4 py-3">
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
