import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, User, Mail, Hash, Phone, Book, Image, Layers } from 'lucide-react'
import { createAlumno, updateAlumno } from '../../../services/alumnoService'

export default function AlumnoModal({ isOpen, onClose, onSave, initialData, semestres }) {

  const empty = { 
    nombre: '', 
    apellido: '', 
    email: '', 
    numeroControl: '', 
    telefono: '', 
    carrera: '', 
    imagen: '',
    semestreId: ''
  }

  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const carrerasDisponibles = [
    "Ingeniería en Sistemas",
    "Ingeniería Industrial",
    "Licenciatura en Administración",
    "Arquitectura",
    "Derecho"
  ]

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          nombre: initialData.nombre || '',
          apellido: initialData.apellido || '',
          email: initialData.email || '',
          numeroControl: initialData.numeroControl || '',
          telefono: initialData.telefono || '',
          carrera: initialData.carrera || '',
          imagen: initialData.imagenURL || '',
          semestreId: initialData.semestre?.id || ''
        })
      } else {
        setForm(empty)
      }
    }
  }, [isOpen, initialData])

  const handleClose = () => {
    setForm(empty)
    onClose()
  }

  function handleChange(e) {
    const { name, value } = e.target
    
    if (name === 'telefono') {
      const val = value.replace(/\D/g, '')
      if (val.length <= 10) setForm((s) => ({ ...s, [name]: val }))
      return
    }

    setForm((s) => ({ ...s, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (form.telefono.length !== 10) {
      alert("El teléfono debe tener exactamente 10 dígitos.")
      return
    }

    const dominiosPermitidos = ["@tlaxiaco.tecnm.mx", "@gmail.com"]
    const esCorreoValido = dominiosPermitidos.some(dominio => 
      form.email.toLowerCase().endsWith(dominio)
    )

    if (!esCorreoValido) {
      alert("El correo debe ser institucional (@tlaxiaco.tecnm.mx) o Gmail (@gmail.com)")
      return
    }

    if (!form.semestreId) {
      alert("Debes seleccionar un semestre")
      return
    }

    ;(async () => {
      setSaving(true)
      setSubmitError(null)

      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        numeroControl: form.numeroControl,
        telefono: form.telefono,
        carrera: form.carrera,
        imagenURL: form.imagen || null,
        semestre: {
          id: Number(form.semestreId)
        }
      }

      try {
        let saved
        if (initialData && initialData.id) {
          saved = await updateAlumno(initialData.id, payload)
        } else {
          saved = await createAlumno(payload)
        }

        onSave && onSave(saved)
        handleClose()

      } catch (err) {
        console.error(err)
        setSubmitError('Error al guardar alumno')
      } finally {
        setSaving(false)
      }
    })()
  }

  // clases con sombreado interno
  const inputClass = "w-full outline-none bg-transparent placeholder-gray-400"
  const wrapperBase = "flex items-center gap-2 border rounded px-3 py-2 bg-4F709C transition-all duration-200"

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>

        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">

          <Dialog.Panel className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl">

            <div className="flex justify-between">
              <h3 className="text-lg font-bold">
                {initialData ? 'Editar Alumno' : 'Agregar Alumno'}
              </h3>
              <button onClick={handleClose}><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Nombre */}
              <div>
                <label className="text-sm text-gray-600">Nombre</label>
                <div className={`${wrapperBase} ${form.nombre ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <User size={18}/>
                  <input name="nombre" required value={form.nombre} onChange={handleChange} placeholder="Ej: Juan" className={inputClass}/>
                </div>
              </div>

              {/* Apellido */}
              <div>
                <label className="text-sm text-gray-600">Apellido</label>
                <div className={`${wrapperBase} ${form.apellido ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <User size={18}/>
                  <input name="apellido" required value={form.apellido} onChange={handleChange} placeholder="Ej: Pérez" className={inputClass}/>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-600">Correo</label>
                <div className={`${wrapperBase} ${form.email ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <Mail size={18}/>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="Ej: alumno@gmail.com" className={inputClass}/>
                </div>
              </div>

              {/* Número control */}
              <div>
                <label className="text-sm text-gray-600">Número de control</label>
                <div className={`${wrapperBase} ${form.numeroControl ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <Hash size={18}/>
                  <input name="numeroControl" required value={form.numeroControl} onChange={handleChange} placeholder="Ej: 21161045" className={inputClass}/>
                </div>
              </div>

              {/* Semestre */}
              <div>
                <label className="text-sm text-gray-600">Semestre</label>
                <div className={`${wrapperBase} ${form.semestreId ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <Layers size={18}/>
                  <select name="semestreId" value={form.semestreId} onChange={handleChange} required className={inputClass}>
                    <option value="">Selecciona un semestre</option>
                    {semestres.map((s) => (
                      <option key={s.id} value={s.id}>{s.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="text-sm text-gray-600">Teléfono</label>
                <div className={`${wrapperBase} ${form.telefono ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <Phone size={18}/>
                  <input type="tel" name="telefono" required value={form.telefono} onChange={handleChange} placeholder="Ej: 9531234567" className={inputClass}/>
                </div>
              </div>

              {/* Carrera */}
              <div>
                <label className="text-sm text-gray-600">Carrera</label>
                <div className={`${wrapperBase} ${form.carrera ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <Book size={18}/>
                  <select name="carrera" required value={form.carrera} onChange={handleChange} className={inputClass}>
                    <option value="">Selecciona una carrera</option>
                    {carrerasDisponibles.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Imagen */}
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Imagen URL</label>
                <div className={`${wrapperBase} ${form.imagen ? 'bg-gray-100' : ''} focus-within:bg-gray-100`}>
                  <Image size={18}/>
                  <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://ejemplo.com/foto.jpg" className={inputClass}/>
                </div>
              </div>

              {/* Botones */}
              <div className="md:col-span-2 flex justify-end gap-2">
                <button type="button" onClick={handleClose} className="border px-4 py-2 rounded">
                  Cancelar
                </button>
                <button type="submit" className="bg-[#213555] text-white px-4 py-2 rounded">
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>

            </form>

            {submitError && <p className="text-red-500 mt-2">{submitError}</p>}

          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}