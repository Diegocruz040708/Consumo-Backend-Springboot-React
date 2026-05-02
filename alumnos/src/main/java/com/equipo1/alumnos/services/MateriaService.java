package com.equipo1.alumnos.services;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.equipo1.alumnos.model.Materia;
import com.equipo1.alumnos.repository.MateriaRepository;

@Service
public class MateriaService {
    @Autowired
    private MateriaRepository materiaRepository;
    // Obtener todas las materias del catálogo
    public List<Materia> obtenerTodos() {
        return materiaRepository.findAll();
    }
    // Obtener una materia específica por su ID
    public Optional<Materia> obtenerPorId(Long id) {
        return materiaRepository.findById(id);
    }
    //Filtrar materias por el ID del semestre
    public List<Materia> obtenerPorSemestre(Long semestreId) {
        return materiaRepository.findBySemestreId(semestreId);
    }
    //Guardar una nueva materia
    public Materia guardarMateria(Materia materia) {
        return materiaRepository.save(materia);
    }
    // Actualizar una materia existente
    public Optional<Materia> actualizarMateria(Long id, Materia materiaDetalles) {
        return materiaRepository.findById(id).map(materiaExistente -> {
            materiaExistente.setNombre(materiaDetalles.getNombre());
            materiaExistente.setCreditos(materiaDetalles.getCreditos());
            // Si el semestre también se actualiza, lo actualizamos
            materiaExistente.setSemestre(materiaDetalles.getSemestre());

            return materiaRepository.save(materiaExistente);
        });
    }
    public void eliminarMateria(Long id) {
        materiaRepository.deleteById(id);
    }
}