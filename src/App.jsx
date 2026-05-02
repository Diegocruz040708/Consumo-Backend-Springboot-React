import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
import NavbarComponent from './components/NavbarComponent'
import Dashboard from './features/dashboard/pages/Dashboard'
import AlumnosPage from './features/alumnos/pages/AlumnosPage'
import SemestrePage from './features/semestre/pages/SemestrePage'
import MateriasPage from './features/materias/pages/MateriasPage'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="flex flex-col w-full min-h-screen">
          <NavbarComponent />
          <main className="flex-1 w-full overflow-auto bg-[#f5efe7]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/alumnos" element={<AlumnosPage />} />
              <Route path="/semestre" element={<SemestrePage />} />
              <Route path="/materias" element={<MateriasPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DataProvider>
  )
}

export default App