import api from './api'

export async function getMaterias() {
  const res = await api.get('/materias/materias')
  return res.data
}

export async function getMateria(id) {
  const res = await api.get(`/materias/traer-materia/${id}`)
  return res.data
}

export async function createMateria(materia) {
  const res = await api.post('/materias/insertar-materia', materia)
  return res.data
}

export async function updateMateria(id, materia) {
  const res = await api.put(`/materias/editar-materia/${id}`, materia)
  return res.data
}

export async function deleteMateria(id) {
  const res = await api.delete(`/materias/eliminar-materia/${id}`)
  return res.data
}

export async function getMateriasPorSemestre(semestreId) {
  const res = await api.get(`/materias/por-semestre/${semestreId}`)
  return res.data
}
