import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Book, Hash, Calendar } from 'lucide-react'

const semestres = [
  'Primero','Segundo','Tercero','Cuarto','Quinto','Sexto','Séptimo','Octavo','Noveno','Décimo'
]

export default function MateriaModal({ isOpen, onClose, onSave, initialData }) {
  const empty = { nombre: '', creditos: 1, semestre: '' }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (isOpen) setForm(initialData || empty)
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

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.nombre.trim()) return
    if (!form.semestre) return
    if (!form.creditos || form.creditos < 1) return
    onSave && onSave(form)
    setForm(empty)
    onClose()
  }

  function handleClose() {
    setForm(empty)
    onClose()
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
                        <select name="semestre" required value={form.semestre} onChange={handleChange} className="w-full outline-none bg-transparent h-full cursor-pointer">
                          <option value="">Seleccione semestre</option>
                          {semestres.map((s, i) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </label>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={handleClose} className="px-4 py-2 rounded border font-semibold" style={{ borderColor: '#d8c4b4', color: '#213555' }}>
                      Cancelar
                    </button>
                    <button type="submit" className="px-4 py-2 rounded font-semibold" style={{ backgroundColor: '#213555', color: '#d8c4b4' }}>
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
