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
     { label: 'Semestre', path: '/semestre', icon: Users },
     { label: 'Materias', path: '/materias', icon: BookOpen }
   ]

  return (
      <nav className="bg-[#213555] pl-0 pr-4 sm:pr-6 py-3 sm:py-4 shadow-lg sticky top-0 z-50 w-full">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
         <Link to="/" className="flex items-center -ml-20">
           <GraduationCap className="text-[#F5EFE7] hover:text-[#d8c4b4] transition-colors w-8 h-8 sm:w-10 sm:h-10" />
         </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-2 py-2 text-base lg:text-lg transition-colors border-b-2 ${
                isActive(item.path)
                  ? 'border-[#f5efe7] text-[#f5efe7]'
                  : 'border-transparent text-[#f5efe7] hover:text-[#d8c4b4] hover:border-[#d8c4b4]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[#f5efe7] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menú"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute w-full left-0 top-full bg-[#213555] border-t border-[#4f709c]">
            <div className="flex flex-col px-4 py-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-3 border-b-2 transition-colors text-base ${
                    isActive(item.path)
                      ? 'border-[#f5efe7] text-[#f5efe7]'
                      : 'border-transparent text-[#f5efe7] hover:text-[#d8c4b4] hover:border-[#d8c4b4]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
    </nav>
  )
}