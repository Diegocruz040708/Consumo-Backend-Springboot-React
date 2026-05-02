import api from './api'

export async function getAlumnos() {
  const res = await api.get('/alumnos/traer-alumnos')
  return res.data
}

export async function getAlumno(id) {
  const res = await api.get(`/alumnos/traer-alumno/${id}`)
  return res.data
}

export async function createAlumno(alumno) {
  const res = await api.post('/alumnos/insertar-alumnos', alumno)
  return res.data
}

export async function updateAlumno(id, alumno) {
  const res = await api.put(`/alumnos/editar-alumnos/${id}`, alumno)
  return res.data
}

export async function deleteAlumno(id) {
  const res = await api.delete(`/alumnos/eliminar-alumnos/${id}`)
  return res.data
}
