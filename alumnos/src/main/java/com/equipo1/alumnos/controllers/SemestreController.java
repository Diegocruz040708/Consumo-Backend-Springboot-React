package com.equipo1.alumnos.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.equipo1.alumnos.model.Semestre;
import com.equipo1.alumnos.services.SemestreService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/semestres")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Semestres", description = "API para la gestión del catálogo de semestres")
public class SemestreController {
    @Autowired
    private SemestreService semestreService;
    @Operation(summary = "Obtener todos los semestres", description = "Devuelve la lista completa de semestres registrados.")
    @GetMapping("/traer-semestres")
    public List<Semestre> traerSemestres() {
        return semestreService.obtenerTodos();
    }
    @Operation(summary = "Buscar semestre por ID", description = "Devuelve los datos de un semestre específico.")
    @GetMapping("/traer-semestre/{id}")
    public ResponseEntity<Semestre> traerUnSemestre(@PathVariable Long id) {
        Optional<Semestre> semestre = semestreService.obtenerPorId(id);
        return semestre.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @Operation(summary = "Registrar un nuevo semestre", description = "Agrega un nuevo semestre al catálogo.")
    @PostMapping("/insertar-semestre")
    public Semestre insertarSemestre(@Valid @RequestBody Semestre semestre) {
        return semestreService.guardarSemestre(semestre);
    }
    @Operation(summary = "Actualizar semestre", description = "Modifica el nombre de un semestre existente.")
    @PutMapping("/editar-semestre/{id}")
    public ResponseEntity<Semestre> actualizarSemestre(@PathVariable Long id, @Valid @RequestBody Semestre semestre) {
        Optional<Semestre> actualizado = semestreService.actualizarSemestre(id, semestre);
        return actualizado.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @Operation(summary = "Eliminar semestre", description = "Elimina un semestre de la base de datos.")
    @DeleteMapping("/eliminar-semestre/{id}")
    public ResponseEntity<Void> eliminarSemestre(@PathVariable Long id) {
        semestreService.eliminarSemestre(id);
        return ResponseEntity.ok().build();
    }
}