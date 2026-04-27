import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, User, Mail, Hash, Phone, Book, Image } from 'lucide-react'

export default function AlumnoModal({ isOpen, onClose, onSave, initialData }) {
  const empty = { nombre: '', apellido: '', email: '', numeroControl: '', telefono: '', carrera: '', imagen: '' }
  const [form, setForm] = useState(empty)

  // Opciones de carreras
  const carrerasDisponibles = [
    "Ingeniería en Sistemas",
    "Ingeniería Industrial",
    "Licenciatura en Administración",
    "Arquitectura",
    "Derecho"
  ]

  useEffect(() => {
    if (isOpen) {
      setForm(initialData || empty)
    }
  }, [isOpen, initialData])

  // Función para cerrar y limpiar
  const handleClose = () => {
    setForm(empty) // Borra los datos
    onClose()
  }

  function handleChange(e) {
    const { name, value } = e.target
    
    // Validación en tiempo real para teléfono (solo números y max 10)
    if (name === 'telefono') {
      const val = value.replace(/\D/g, '') // Elimina lo que no sea número
      if (val.length <= 10) setForm((s) => ({ ...s, [name]: val }))
      return
    }

    setForm((s) => ({ ...s, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Validación de Teléfono (Exactamente 10)
    if (form.telefono.length !== 10) {
      alert("El teléfono debe tener exactamente 10 dígitos.")
      return
    }

    // Validación de Dominio de Correo
    const dominiosPermitidos = ["@tlaxiaco.tecnm.mx", "@gmail.com"]
    const esCorreoValido = dominiosPermitidos.some(dominio => 
      form.email.toLowerCase().endsWith(dominio)
    )

    if (!esCorreoValido) {
      alert("El correo debe ser institucional (@tlaxiaco.tecnm.mx) o Gmail (@gmail.com)")
      return
    }

    onSave && onSave(form)
    handleClose() // Borra datos y cierra al terminar
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-start justify-between">
                  <Dialog.Title as="h3" className="text-lg font-bold" style={{ color: '#213555' }}>
                    {initialData ? 'Editar Alumno' : 'Agregar Alumno'}
                  </Dialog.Title>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                    <X />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Campos de Nombre y Apellido igual... */}
                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Nombre</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <User size={18} className="text-[#4f709c]" />
                        <input name="nombre" required value={form.nombre} onChange={handleChange} className="w-full outline-none" placeholder="Nombre" />
                      </div>
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Apellido</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <User size={18} className="text-[#4f709c]" />
                        <input name="apellido" required value={form.apellido} onChange={handleChange} className="w-full outline-none" placeholder="Apellido" />
                      </div>
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Correo </span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <Mail size={18} className="text-[#4f709c]" />
                        <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full outline-none" placeholder="usuario@gmail.com " />
                      </div>
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Número de Control</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <Hash size={18} className="text-[#4f709c]" />
                        <input name="numeroControl" required value={form.numeroControl} onChange={handleChange} className="w-full outline-none" placeholder="00000000" />
                      </div>
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Teléfono (10 dígitos)</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <Phone size={18} className="text-[#4f709c]" />
                        <input type="tel" name="telefono" required value={form.telefono} onChange={handleChange} className="w-full outline-none" placeholder="1234567890" />
                      </div>
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Carrera</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2 bg-white">
                        <Book size={18} className="text-[#4f709c]" />
                        <select name="carrera" required value={form.carrera} onChange={handleChange} className="w-full outline-none bg-transparent h-full cursor-pointer">
                          <option value="">Seleccione una carrera</option>
                          {carrerasDisponibles.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </label>

                    {/* Imagen URL igual... */}
                    <label className="flex flex-col md:col-span-2">
                      <span className="text-sm font-medium text-gray-700">Imagen URL</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <Image size={18} className="text-[#4f709c]" />
                        <input name="imagen" value={form.imagen} onChange={handleChange} className="w-full outline-none" placeholder="https://..." />
                      </div>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={handleClose} className="px-4 py-2 rounded border font-semibold" style={{ borderColor: '#d8c4b4', color: '#213555' }}>
                      Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 rounded font-semibold transition-opacity hover:opacity-90" style={{ backgroundColor: '#213555', color: '#d8c4b4' }}>
                      Guardar
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}