import api from './api'

export async function getSemestres() {
  const res = await api.get('/semestres/traer-semestres')
  return res.data
}

export async function getSemestre(id) {
  const res = await api.get(`/semestres/traer-semestre/${id}`)
  return res.data
}

export async function createSemestre(semestre) {
  const res = await api.post('/semestres/insertar-semestre', semestre)
  return res.data
}

export async function updateSemestre(id, semestre) {
  const res = await api.put(`/semestres/editar-semestre/${id}`, semestre)
  return res.data
}

export async function deleteSemestre(id) {
  const res = await api.delete(`/semestres/eliminar-semestre/${id}`)
  return res.data
}
