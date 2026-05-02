import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import MateriasList from '../components/MateriasList'
import MateriaModal from '../components/MateriaModal'
import ConfirmDialog from '../../alumnos/components/ConfirmDialog'
import Notifications from '../../alumnos/components/Notifications'
import { getMaterias, deleteMateria } from '../../../services/materiaService'

export default function MateriasPage() {
  const [materias, setMaterias] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 6
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [candidateDelete, setCandidateDelete] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function openAdd() {
    setEditing(null)
    setIsOpen(true)
  }

  function openEdit(materia) {
    setEditing(materia)
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
    // El modal realiza la petición; aquí refrescamos la lista completa
    fetchMaterias()
    addNotification('Operación realizada correctamente', 'success')
    closeModal()
  }

  function requestDelete(id) {
    setCandidateDelete(id)
    setConfirmOpen(true)
  }

  function confirmDelete() {
    if (candidateDelete) {
      ;(async () => {
        try {
          setLoading(true)
          await deleteMateria(candidateDelete)
          addNotification('Materia eliminada correctamente', 'danger')
          await fetchMaterias()
        } catch (e) {
          console.error(e)
          addNotification('Error al eliminar materia', 'danger')
        } finally {
          setLoading(false)
          setCandidateDelete(null)
          setConfirmOpen(false)
        }
      })()
    } else {
      setConfirmOpen(false)
    }
  }

  // search + pagination
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return materias
    return materias.filter((m) => (m.nombre || '').toLowerCase().includes(term))
  }, [materias, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  useEffect(() => { if (page > totalPages) setPage(1) }, [totalPages])
  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  async function fetchMaterias() {
    setLoading(true)
    setError(null)
    try {
      const data = await getMaterias()
      setMaterias(data)
    } catch (e) {
      console.error(e)
      setError('Error al obtener materias')
      addNotification('Error al cargar materias', 'danger')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMaterias()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full min-h-full bg-[#f5efe7] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold" style={{ color: '#213555' }}>Materias</h1>
          <div className="flex items-center gap-3">
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Buscar por nombre" className="px-3 py-2 rounded border" />
            <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-md shadow-sm" style={{ backgroundColor: '#4f709c', color: '#fff' }}>
              <Plus size={18} /> Agregar
            </button>
          </div>
        </div>

        <MateriasList materias={current} onEdit={openEdit} onDelete={requestDelete} />
        {loading && <div className="text-center text-sm text-gray-600 mt-3">Cargando...</div>}
        {error && <div className="text-center text-sm text-red-600 mt-3">{error}</div>}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">Mostrando {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} de {filtered.length}</div>
          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border" style={{ borderColor: '#d8c4b4' }}>Anterior</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1 rounded ${page === i + 1 ? 'font-bold' : ''}`} style={{ backgroundColor: page === i + 1 ? '#4f709c' : undefined, color: page === i + 1 ? '#fff' : '#213555' }}>{i + 1}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded border" style={{ borderColor: '#d8c4b4' }}>Siguiente</button>
          </div>
        </div>

        <MateriaModal isOpen={isOpen} onClose={closeModal} onSave={handleSave} initialData={editing} />

        <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} title="Eliminar materia" description="¿Seguro que quieres eliminar esta materia? Esta acción no se puede deshacer." />

        <Notifications notifications={notifications} remove={removeNotification} />
      </div>
    </div>
  )

}