import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, description }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-start justify-between">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6" style={{ color: '#213555' }}>
                    {title}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <X />
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-700">{description}</div>

                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={onClose} className="px-4 py-2 rounded border" style={{ borderColor: '#d8c4b4', color: '#213555' }}>
                    Cancelar
                  </button>
                  <button onClick={onConfirm} className="px-4 py-2 rounded" style={{ backgroundColor: '#b91c1c', color: '#fff' }}>
                    Eliminar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
