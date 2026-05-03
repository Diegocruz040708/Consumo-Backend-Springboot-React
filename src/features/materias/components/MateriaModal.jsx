import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Book, Hash, Calendar } from 'lucide-react'
import api from '../../../services/api'
import { createMateria, updateMateria } from '../../../services/materiaService'

export default function MateriaModal({ isOpen, onClose, onSave, initialData, existingMaterias = [] }) {
  const empty = { nombre: '', creditos: 1, semestreId: '' }
  const [form, setForm] = useState(empty)
  const [semestres, setSemestres] = useState([])
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  useEffect(() => {
    if (!isOpen) return
    // cargar semestres desde backend
    ;(async () => {
      try {
        const res = await api.get('/semestres/traer-semestres')
        setSemestres(res.data || [])
      } catch (e) {
        console.error('Error al obtener semestres', e)
        setSemestres([])
      }
    })()

    if (initialData) {
      setForm({
        nombre: initialData.nombre || '',
        creditos: initialData.creditos || 1,
        semestreId: initialData.semestre ? String(initialData.semestre.id) : ''
      })
    } else {
      setForm(empty)
    }
  }, [isOpen, initialData])

  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'creditos') {
      const n = parseInt(value || '0', 10)
      setForm((s) => ({ ...s, creditos: isNaN(n) ? '' : n }))
      return
    }
    setForm((s) => ({ ...s, [name]: value }))
  }

  function handleClose() {
    setForm(empty)
    onClose()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre.trim()) return
    if (!form.semestreId) return
    if (!form.creditos || form.creditos < 1) return

    // validate duplicates locally before submitting
    const name = (form.nombre || '').trim().toLowerCase()
    const duplicate = existingMaterias.some((m) => (m.nombre || '').trim().toLowerCase() === name && (!initialData || m.id !== initialData.id))
    if (duplicate) {
      setSubmitError('Esta materia ya se encuentra registrado')
      return
    }

    setSaving(true)
    setSubmitError(null)
    const payload = {
      nombre: form.nombre,
      creditos: form.creditos,
      semestre: { id: Number(form.semestreId) }
    }
    try {
      let saved
      if (initialData && initialData.id) {
        saved = await updateMateria(initialData.id, payload)
      } else {
        saved = await createMateria(payload)
      }
      onSave && onSave(saved)
      handleClose()
    } catch (err) {
      console.error(err)
      setSubmitError('Error al guardar materia')
    } finally {
      setSaving(false)
    }
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-start justify-between">
                  <Dialog.Title as="h3" className="text-lg font-bold" style={{ color: '#213555' }}>
                    {initialData ? 'Editar Materia' : 'Agregar Materia'}
                  </Dialog.Title>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                    <X />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Nombre</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <Book size={18} className="text-[#4f709c]" />
                        <input name="nombre" required value={form.nombre} onChange={handleChange} className="w-full outline-none" placeholder="Nombre de la materia" />
                      </div>
                    </label>

                    <label className="flex flex-col">
                      <span className="text-sm font-medium text-gray-700">Créditos</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <Hash size={18} className="text-[#4f709c]" />
                        <input name="creditos" required type="number" min={1} value={form.creditos} onChange={handleChange} className="w-full outline-none" />
                      </div>
                    </label>

                    <label className="flex flex-col md:col-span-2">
                      <span className="text-sm font-medium text-gray-700">Semestre</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2 bg-white">
                        <Calendar size={18} className="text-[#4f709c]" />
                        <select name="semestreId" required value={form.semestreId} onChange={handleChange} className="w-full outline-none bg-transparent h-full cursor-pointer">
                          <option value="">Seleccione semestre</option>
                          {semestres.map((s) => (
                            <option key={s.id} value={s.id}>{s.nombre}</option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={handleClose} className="px-4 py-2 rounded border font-semibold" style={{ borderColor: '#d8c4b4', color: '#213555' }}>
                      Cancelar
                    </button>
                    <button type="submit" disabled={saving} className="px-4 py-2 rounded font-semibold" style={{ backgroundColor: '#213555', color: '#d8c4b4' }}>
                      {saving ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </form>
                {submitError && <div className="mt-2 text-sm text-red-600">{submitError}</div>}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}