package com.equipo1.alumnos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.equipo1.alumnos.model.Alumno;
import com.equipo1.alumnos.model.Materia;
import com.equipo1.alumnos.model.Semestre;
import com.equipo1.alumnos.repository.AlumnoRepository;
import com.equipo1.alumnos.repository.MateriaRepository;
import com.equipo1.alumnos.repository.SemestreRepository;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    @Autowired
    private SemestreRepository semestreRepository; // NUEVO

    public List<Alumno> obtenerTodos() {
        return alumnoRepository.findAll();
    }

    public Optional<Alumno> obtenerPorId(Long id) {
        return alumnoRepository.findById(id);
    }

    //  GUARDAR CORREGIDO
    public Alumno guardarAlumno(Alumno alumno) {

        if (alumno.getSemestre() != null && alumno.getSemestre().getId() != null) {
            Semestre semestre = semestreRepository
                    .findById(alumno.getSemestre().getId())
                    .orElseThrow(() -> new RuntimeException("Semestre no encontrado"));

            alumno.setSemestre(semestre); // CLAVE
        }

        return alumnoRepository.save(alumno);
    }
    

    // ACTUALIZAR 
    public Optional<Alumno> actualizarAlumno(Long id, Alumno alumnoDetalles) {
        return alumnoRepository.findById(id).map(alumnoExistente -> {

            alumnoExistente.setNombre(alumnoDetalles.getNombre());
            alumnoExistente.setApellido(alumnoDetalles.getApellido());
            alumnoExistente.setEmail(alumnoDetalles.getEmail());
            alumnoExistente.setNumeroControl(alumnoDetalles.getNumeroControl());
            alumnoExistente.setTelefono(alumnoDetalles.getTelefono());
            alumnoExistente.setCarrera(alumnoDetalles.getCarrera());
            alumnoExistente.setImagenURL(alumnoDetalles.getImagenURL());

            //  
            if (alumnoDetalles.getSemestre() != null && alumnoDetalles.getSemestre().getId() != null) {
                Semestre semestre = semestreRepository
                        .findById(alumnoDetalles.getSemestre().getId())
                        .orElseThrow(() -> new RuntimeException("Semestre no encontrado"));

                alumnoExistente.setSemestre(semestre);
            }

            return alumnoRepository.save(alumnoExistente);
        });
    }

    public void eliminarAlumno(Long id) {
        alumnoRepository.deleteById(id);
    }

    // Inscribir materia
    public Alumno inscribirMateria(Long alumnoId, Long materiaId) {
        Optional<Alumno> alumnoOpt = alumnoRepository.findById(alumnoId);
        Optional<Materia> materiaOpt = materiaRepository.findById(materiaId);

        if (alumnoOpt.isPresent() && materiaOpt.isPresent()) {
            Alumno alumno = alumnoOpt.get();
            Materia materia = materiaOpt.get();

            alumno.getMaterias().add(materia);

            return alumnoRepository.save(alumno);
        } else {
            throw new RuntimeException("Alumno o Materia no encontrados");
        }
    }
}