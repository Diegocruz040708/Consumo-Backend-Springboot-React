import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X, Calendar } from 'lucide-react'

export default function SemestreModal({ isOpen, onClose, onSave, initialData }) {
  const empty = { nombre: '' }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (isOpen) {
      setForm(initialData || empty)
    }
  }, [isOpen, initialData])

  const handleClose = () => {
    setForm(empty)
    onClose()
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave && onSave(form)
    handleClose()
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
                    {initialData ? 'Editar Semestre' : 'Agregar Semestre'}
                  </Dialog.Title>
                  <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                    <X />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex flex-col md:col-span-2">
                      <span className="text-sm font-medium text-gray-700">Nombre</span>
                      <div className="mt-1 flex items-center gap-2 border rounded px-3 py-2">
                        <Calendar size={18} className="text-[#4f709c]" />
                        <input name="nombre" required value={form.nombre} onChange={handleChange} className="w-full outline-none" placeholder="Ej: Primer Semestre" />
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
