import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import AlumnosTable from '../components/AlumnosTable'
import AlumnoModal from '../components/AlumnoModal'
import ConfirmDialog from '../components/ConfirmDialog'
import Notifications from '../components/Notifications'
import { getAlumnos, deleteAlumno } from '../../../services/alumnoService'
import { getSemestres } from '../../../services/semestreService' 

export default function AlumnosPage() {
  const [alumnos, setAlumnos] = useState([])
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

  function handleSave() {
    fetchAlumnos()
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
          await deleteAlumno(candidateDelete)
          addNotification('Alumno eliminado correctamente', 'danger')
          await fetchAlumnos()
        } catch (e) {
          console.error(e)
          addNotification('Error al eliminar alumno', 'danger')
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

  // 🔍 FILTRO
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return alumnos

    return alumnos.filter((a) =>
      (a.nombre || '').toLowerCase().includes(term) ||
      (a.numeroControl || '').toLowerCase().includes(term)
    )
  }, [alumnos, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))

  useEffect(() => {
    if (page > totalPages) setPage(1)
  }, [totalPages])

  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  // 🔹 TRAER ALUMNOS
  async function fetchAlumnos() {
    setLoading(true)
    setError(null)
    try {
      const data = await getAlumnos()
      setAlumnos(data)
    } catch (e) {
      console.error(e)
      setError('Error al obtener alumnos')
      addNotification('Error al cargar alumnos', 'danger')
    } finally {
      setLoading(false)
    }
  }

  // 🔹 TRAER SEMESTRES
  async function fetchSemestres() {
    try {
      const data = await getSemestres()
      setSemestres(data)
    } catch (e) {
      console.error(e)
      addNotification('Error al cargar semestres', 'danger')
    }
  }

  useEffect(() => {
    fetchAlumnos()
    fetchSemestres() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full min-h-full bg-[#f5efe7] py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: '#213555' }}>
            Alumnos
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Buscar..."
              className="px-3 py-2 rounded border w-full sm:w-56"
            />

            <button
              onClick={openAdd}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md shadow-sm"
              style={{ backgroundColor: '#4f709c', color: '#fff' }}
            >
              <Plus size={18} /> Agregar
            </button>
          </div>
        </div>

        {/* TABLA */}
        <AlumnosTable
          alumnos={current}
          onEdit={openEdit}
          onDelete={requestDelete}
        />

        {loading && <div className="text-center mt-3">Cargando...</div>}
        {error && <div className="text-center text-red-600 mt-3">{error}</div>}

        {/* PAGINACIÓN */}
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

        {/* MODAL */}
        <AlumnoModal
          isOpen={isOpen}
          onClose={closeModal}
          onSave={handleSave}
          initialData={editing}
          semestres={semestres} 
        />

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={confirmDelete}
          title="Eliminar alumno"
          description="¿Seguro?"
        />

        <Notifications notifications={notifications} remove={removeNotification} />
      </div>
    </div>
  )
}