import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import AlumnosTable from '../components/AlumnosTable'
import AlumnoModal from '../components/AlumnoModal'
import ConfirmDialog from '../components/ConfirmDialog'
import Notifications from '../components/Notifications'

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 5
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [candidateDelete, setCandidateDelete] = useState(null)
  const [notifications, setNotifications] = useState([])

  function openAdd() {
    setEditing(null)
    setIsOpen(true)
  }

  function openEdit(alumno) {
    setEditing(alumno)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setEditing(null)
  }

  function addNotification(message, type = 'info') {
    const id = Date.now() + Math.random()
    setNotifications((s) => [...s, { id, message, type }])
  }

  function removeNotification(id) {
    setNotifications((s) => s.filter((n) => n.id !== id))
  }

  function handleSave(data) {
    if (editing) {
      setAlumnos((prev) => prev.map((a) => (a.id === editing.id ? { ...a, ...data } : a)))
      addNotification('Alumno actualizado correctamente', 'success')
    } else {
      setAlumnos((prev) => [...prev, { id: Date.now(), ...data }])
      addNotification('Alumno agregado correctamente', 'success')
    }
    closeModal()
  }

  function handleDelete(id) {
    setAlumnos((prev) => prev.filter((a) => a.id !== id))
  }

  function requestDelete(id) {
    setCandidateDelete(id)
    setConfirmOpen(true)
  }

  function confirmDelete() {
    if (candidateDelete) {
      setAlumnos((prev) => prev.filter((a) => a.id !== candidateDelete))
      addNotification('Alumno eliminado correctamente', 'danger')
    }
    setCandidateDelete(null)
    setConfirmOpen(false)
  }

  // filtered + pagination
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return alumnos
    return alumnos.filter((a) => (a.nombre || '').toLowerCase().includes(term) || (a.numeroControl || '').toLowerCase().includes(term))
  }, [alumnos, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [totalPages])

  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="w-full min-h-full bg-[#f5efe7] py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#213555' }}>
            Alumnos
          </h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input 
              value={search} 
              onChange={(e) => { setSearch(e.target.value); setPage(1) }} 
              placeholder="Buscar..." 
              className="px-3 py-2 rounded border w-full sm:w-56" 
            />
            <button onClick={openAdd} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md shadow-sm whitespace-nowrap" style={{ backgroundColor: '#4f709c', color: '#fff' }}>
              <Plus size={18} /> Agregar
            </button>
          </div>
        </div>

        <AlumnosTable alumnos={current} onEdit={openEdit} onDelete={requestDelete} />

        {/* Pagination controls */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 order-2 sm:order-1">
            Mostrando {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} de {filtered.length}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 order-1 sm:order-2 flex-wrap justify-center">
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2 sm:px-3 py-1 rounded border text-sm sm:text-base" style={{ borderColor: '#d8c4b4' }}>Ant</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`px-2 sm:px-3 py-1 rounded text-sm sm:text-base ${page === i + 1 ? 'font-bold' : ''}`} style={{ backgroundColor: page === i + 1 ? '#4f709c' : undefined, color: page === i + 1 ? '#fff' : '#213555' }}>{i + 1}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-2 sm:px-3 py-1 rounded border text-sm sm:text-base" style={{ borderColor: '#d8c4b4' }}>Sig</button>
          </div>
        </div>

        <AlumnoModal isOpen={isOpen} onClose={closeModal} onSave={handleSave} initialData={editing} />

        <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} title="Eliminar alumno" description="¿Seguro que quieres eliminar a este alumno? Esta acción no se puede deshacer." />

        <Notifications notifications={notifications} remove={removeNotification} />
      </div>
    </div>
  )
}