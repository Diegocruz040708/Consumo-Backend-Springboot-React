import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavbarComponent from './components/NavbarComponent'
import Dashboard from './features/dashboard/pages/Dashboard'
import AlumnosPage from './features/alumnos/pages/AlumnosPage'
import DocentesPage from './features/docentes/pages/DocentesPage'
import MateriasPage from './features/materias/pages/MateriasPage'

function App() {
  return (
    <Router>
      <div className="flex flex-col w-full h-full">
        <NavbarComponent />
        <div className="flex-1 w-full overflow-auto bg-[#f5efe7]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alumnos" element={<AlumnosPage />} />
            <Route path="/docentes" element={<DocentesPage />} />
            <Route path="/materias" element={<MateriasPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App