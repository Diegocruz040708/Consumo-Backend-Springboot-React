import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import SemestresTable from '../components/SemestresTable'
import SemestreModal from '../components/SemestreModal'
import ConfirmDialog from '../components/ConfirmDialog'
import Notifications from '../components/Notifications'
import { getSemestres, createSemestre, updateSemestre, deleteSemestre } from '../../../services/semestreService'

export default function SemestrePage() {
  const [semestres, setSemestres] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 5
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [candidateDelete, setCandidateDelete] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function openAdd() {
    setEditing(null)
    setIsOpen(true)
  }

  function openEdit(semestre) {
    setEditing(semestre)
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

  async function handleSave(form) {
    setLoading(true)
    setError(null)
    try {
      const name = (form.nombre || '').trim().toLowerCase()
      const exists = semestres.some((s) => (s.nombre || '').trim().toLowerCase() === name && (!editing || s.id !== editing.id))
      if (exists) {
        addNotification('Este semestre o materia ya se encuentra registrado', 'danger')
      } else {
        if (editing && editing.id) {
          await updateSemestre(editing.id, { nombre: form.nombre })
          addNotification('Semestre actualizado correctamente', 'success')
        } else {
          await createSemestre({ nombre: form.nombre })
          addNotification('Semestre agregado correctamente', 'success')
        }
      }
      await fetchSemestres()
      closeModal()
    } catch (e) {
      console.error(e)
      setError('Error al guardar semestre')
      addNotification('Error al guardar semestre', 'danger')
    } finally {
      setLoading(false)
    }
  }

  function requestDelete(id) {
    setCandidateDelete(id)
    setConfirmOpen(true)
  }

  async function confirmDelete() {
    if (candidateDelete) {
      setLoading(true)
      setError(null)
      try {
        await deleteSemestre(candidateDelete)
        addNotification('Semestre eliminado correctamente', 'danger')
        await fetchSemestres()
      } catch (e) {
        console.error(e)
        setError('Error al eliminar semestre')
        addNotification('Error al eliminar semestre', 'danger')
      } finally {
        setLoading(false)
        setCandidateDelete(null)
        setConfirmOpen(false)
      }
    } else {
      setConfirmOpen(false)
    }
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return semestres
    return semestres.filter((s) => (s.nombre || '').toLowerCase().includes(term))
  }, [semestres, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [totalPages])

  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  async function fetchSemestres() {
    setLoading(true)
    setError(null)
    try {
      const data = await getSemestres()
      setSemestres(data)
    } catch (e) {
      console.error(e)
      setError('Error al obtener semestres')
      addNotification('Error al cargar semestres', 'danger')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSemestres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full min-h-full bg-[#f5efe7] py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#213555' }}>
            Semestre
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

        <SemestresTable semestres={current} onEdit={openEdit} onDelete={requestDelete} />
        {loading && <div className="text-center text-sm text-gray-600 mt-3">Cargando...</div>}
        {error && <div className="text-center text-sm text-red-600 mt-3">{error}</div>}

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

        <SemestreModal isOpen={isOpen} onClose={closeModal} onSave={handleSave} initialData={editing} />

        <ConfirmDialog isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={confirmDelete} title="Eliminar semestre" description="¿Seguro que quieres eliminar este semestre? Esta acción no se puede deshacer." />

        <Notifications notifications={notifications} remove={removeNotification} />
      </div>
    </div>
  )
}
