import { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext()

const STORAGE_KEY = 'app_data_v2'

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        alumnos: parsed.alumnos || [],
        materias: parsed.materias || [],
        semestres: []
      }
    }
    return {
      alumnos: [],
      semestres: [],
      materias: []
    }
  })

  useEffect(() => {
    const { semestres, ...toStore } = data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))
  }, [data])

  function addSemestre(nombre) {
    const newItem = { id: Date.now(), nombre }
    setData((prev) => ({ ...prev, semestres: [...prev.semestres, newItem] }))
  }

  function updateSemestre(id, nombre) {
    setData((prev) => ({
      ...prev,
      semestres: prev.semestres.map((s) => (s.id === id ? { ...s, nombre } : s))
    }))
  }

  function deleteSemestre(id) {
    setData((prev) => ({ ...prev, semestres: prev.semestres.filter((s) => s.id !== id) }))
  }

  function addMateria(nombre) {
    const newItem = { id: Date.now(), nombre }
    setData((prev) => ({ ...prev, materias: [...prev.materias, newItem] }))
  }

  function updateMateria(id, nombre) {
    setData((prev) => ({
      ...prev,
      materias: prev.materias.map((m) => (m.id === id ? { ...m, nombre } : m))
    }))
  }

  function deleteMateria(id) {
    setData((prev) => ({ ...prev, materias: prev.materias.filter((m) => m.id !== id) }))
  }

  return (
    <DataContext.Provider value={{ data, addSemestre, updateSemestre, deleteSemestre, addMateria, updateMateria, deleteMateria }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within DataProvider')
  return context
}
