import { Users, BookOpen, CalendarDays } from 'lucide-react'
import { useEffect, useState } from 'react'
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import StatCard from '../components/StatCard'

// IMPORTA TUS SERVICES
import { getAlumnos } from '../../../services/alumnoService'
import { getSemestres } from '../../../services/semestreService'
import { getMaterias } from '../../../services/materiaService'

export default function Dashboard() {

  const [alumnos, setAlumnos] = useState([])
  const [semestres, setSemestres] = useState([])
  const [materias, setMaterias] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // TRAER TODO DEL BACKEND
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    setError(null)

    try {
      const [alumnosData, semestresData, materiasData] = await Promise.all([
        getAlumnos(),
        getSemestres(),
        getMaterias()
      ])

      setAlumnos(alumnosData)
      setSemestres(semestresData)
      setMaterias(materiasData)

    } catch (err) {
      console.error(err)
      setError('Error al cargar datos del dashboard')
    } finally {
      setLoading(false)
    }
  }

  // ALUMNOS POR SEMESTRE (REAL)
  const alumnosPorSemestre = semestres.map((s) => ({
    label: s.nombre,
    value: alumnos.filter(a => a.semestre?.id === s.id).length
  }))

  // MATERIAS (puedes mejorar esto luego si relacionas alumnos)
  const materiasData = materias.map((m) => ({
    label: m.nombre,
    value: 1 // por ahora simple
  }))

  return (
    <div className="w-full min-h-full bg-[#f5efe7] py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#213555]">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Resumen general del sistema
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <StatCard title="Alumnos" value={alumnos.length} icon={Users} bgColor="#213555" />
          <StatCard title="Semestres" value={semestres.length} icon={CalendarDays} bgColor="#4f709c" />
          <StatCard title="Materias" value={materias.length} icon={BookOpen} bgColor="#8a9bb0" />
        </div>

        {/* LOADING / ERROR */}
        {loading && <div className="text-center">Cargando datos...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* GRÁFICAS */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* BARRAS */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-1 text-[#213555]">
                Alumnos por Semestre
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Datos reales del sistema
              </p>

              <BarChart
                data={alumnosPorSemestre}
                color={['#213555', '#4f709c', '#8a9bb0', '#d8c4b4']}
                maxBarHeight={200}
              />
            </div>

            {/* PIE */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-bold mb-1 text-[#213555]">
                Materias
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                Distribución actual
              </p>

              <PieChart data={materiasData} size={200} />
            </div>

          </div>
        )}

        {/* VACÍO */}
        {!loading && alumnos.length === 0 && semestres.length === 0 && (
          <div className="mt-8 bg-white rounded-xl p-8 shadow-md text-center">
            <p className="text-gray-400 text-lg">
              No hay datos aún. Agrega alumnos, semestres y materias.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}