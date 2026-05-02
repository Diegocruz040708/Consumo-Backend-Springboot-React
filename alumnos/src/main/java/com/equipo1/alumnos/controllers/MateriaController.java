package com.equipo1.alumnos.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.equipo1.alumnos.model.Materia;
import com.equipo1.alumnos.services.MateriaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/materias")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Materias", description = "API para la gestión del catálogo de materias y su relación con semestres")
public class MateriaController {
    @Autowired
    private MateriaService materiaService;
    @Operation(summary = "Obtener todas las materias", description = "Devuelve una lista completa de las materias registradas.")
    @GetMapping("/materias")
    public List<Materia> traerMaterias() {
        return materiaService.obtenerTodos();
    }

    @Operation(summary = "Buscar materia por ID", description = "Devuelve los datos de una materia específica.")
    @GetMapping("/traer-materia/{id}")
    public ResponseEntity<Materia> traerUnaMateria(@PathVariable Long id) {
        Optional<Materia> materia = materiaService.obtenerPorId(id);
        return materia.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @Operation(summary = "Filtrar materias por semestre", description = "Devuelve la lista de materias que pertenecen a un ID de semestre específico.")
    @GetMapping("/por-semestre/{semestreId}")
    public List<Materia> traerMateriasPorSemestre(@PathVariable Long semestreId) {
        return materiaService.obtenerPorSemestre(semestreId);
    }
    @Operation(summary = "Registrar una nueva materia", description = "Guarda una materia validando que cumpla con los créditos y se asocie a un semestre existente.")
    @PostMapping("/insertar-materia")
    public Materia insertarMateria(@Valid @RequestBody Materia materia) {
        return materiaService.guardarMateria(materia);
    }
    @Operation(summary = "Actualizar datos de la materia", description = "Actualiza la información (nombre, créditos, semestre) de una materia existente.")
    @PutMapping("/editar-materia/{id}")
    public ResponseEntity<Materia> actualizarMateria(@PathVariable Long id, @Valid @RequestBody Materia materia) {
        Optional<Materia> actualizado = materiaService.actualizarMateria(id, materia);
        return actualizado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @Operation(summary = "Eliminar materia", description = "Elimina físicamente una materia de la base de datos.")
    @DeleteMapping("/eliminar-materia/{id}")
    public ResponseEntity<Void> eliminarMateria(@PathVariable Long id) {
        materiaService.eliminarMateria(id);
        return ResponseEntity.ok().build();
    }
}