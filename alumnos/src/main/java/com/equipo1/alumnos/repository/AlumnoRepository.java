package com.equipo1.alumnos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.equipo1.alumnos.model.Alumno;

import java.util.Optional;

public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
Optional<Alumno> findByNombreAndApellido(String nombre, String apellido);
Optional<Alumno> findByNumeroControl(String numeroControl);
Optional<Alumno> findByEmail(String email);
}
