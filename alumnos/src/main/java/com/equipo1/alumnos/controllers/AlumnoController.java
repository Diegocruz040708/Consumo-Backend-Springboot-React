package com.equipo1.alumnos.controllers;

import java.util.List;
import java.util.Optional;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.equipo1.alumnos.dto.AlumnoDTO;
import com.equipo1.alumnos.mapper.AlumnoMapper;
import com.equipo1.alumnos.model.Alumno;
import com.equipo1.alumnos.services.AlumnoService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
@RestController
@RequestMapping("/alumnos")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Alumnos", description = "API para la gestión de alumnos del Instituto de Tlaxiaco (la Máxima casa de estudios)")

public class AlumnoController {
    @Autowired
    private AlumnoService alumnoService;
    @Operation(summary = "Obtener todos los alumnos", description = "Devuelve una lista completa de los alumnos registrados en la base de datos.")
    @GetMapping("/traer-alumnos")
    public List<Alumno> traerAlumnos() {
        return alumnoService.obtenerTodos();
    }
    @Operation(summary = "Buscar alumno por ID", description = "Devuelve los datos de un único alumno según su ID.")
    @GetMapping("/traer-alumno/{id}")
    public ResponseEntity<Alumno> traerUnAlumno(@PathVariable Long id) {
        Optional<Alumno> alumno = alumnoService.obtenerPorId(id);
        return alumno.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @Operation(summary = "Registrar un nuevo alumno", description = "Guarda un alumno en la base de datos validando que cumpla con las reglas de negocio.")
    @PostMapping("/insertar-alumnos")
    public Alumno insertarAlumno(@Valid @RequestBody Alumno alumno) {
        return alumnoService.guardarAlumno(alumno);
    }
    @Operation(summary = "Actualizar datos del alumno", description = "Actualiza la información de un alumno existente mediante su ID.")
    @PutMapping("/editar-alumnos/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(@PathVariable Long id, @Valid @RequestBody Alumno alumno) {
        Optional<Alumno> actualizado = alumnoService.actualizarAlumno(id, alumno);
        return actualizado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @Operation(summary = "Actualizar datos del alumno", description = "Actualiza la información de un alumno existente mediante su ID.")
    @DeleteMapping("/eliminar-alumnos/{id}")
    public ResponseEntity<Void> eliminarAlumno(@PathVariable Long id) {

        alumnoService.eliminarAlumno(id);
        return ResponseEntity.ok().build();
    }

    

    @Operation(summary = "Inscribir materia", description = "Asocia una materia existente al historial/carga académica de un alumno.")
    @PostMapping("/{alumnoId}/inscribir-materia/{materiaId}")
    public ResponseEntity<AlumnoDTO> inscribirMateriaAAlumno(@PathVariable Long alumnoId, @PathVariable Long materiaId) {
        try {
            Alumno alumnoActualizado = alumnoService.inscribirMateria(alumnoId, materiaId);
            //mapeamos a nuestro DTO limpio
            AlumnoDTO alumnoLimpio = AlumnoMapper.mapearADTO(alumnoActualizado);
            return ResponseEntity.ok(alumnoLimpio);

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
