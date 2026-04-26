import { BookOpen, GraduationCap, Menu, X, Users } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { label: 'Dashboard', path: '/', icon: null },
    { label: 'Alumnos', path: '/alumnos', icon: GraduationCap },
    { label: 'Docentes', path: '/docentes', icon: Users },
    { label: 'Materias', path: '/materias', icon: BookOpen }
  ]

  return (
    <nav className="bg-[#213555] px-6 py-4 shadow-lg sticky top-0 z-50 w-full">
      <div className="w-full flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h2 className="!text-[#F5EFE7] text-xl font-bold hover:text-[#d8c4b4] transition-colors">
  Sistema Académico
</h2>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 text-lg rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-[#4f709c] text-[#f5efe7]'
                  : 'text-[#f5efe7] hover:text-[#d8c4b4] hover:bg-[#4f709c] hover:bg-opacity-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#f5efe7]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? 'bg-[#4f709c] text-[#f5efe7]'
                  : 'text-[#f5efe7] hover:text-[#d8c4b4] hover:bg-[#4f709c] hover:bg-opacity-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}