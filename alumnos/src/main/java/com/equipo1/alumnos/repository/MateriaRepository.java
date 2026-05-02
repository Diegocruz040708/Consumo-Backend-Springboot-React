package com.equipo1.alumnos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.equipo1.alumnos.model.Materia;

import java.util.List;

public interface MateriaRepository extends JpaRepository<Materia, Long> {
    List<Materia> findBySemestreId(Long semestreId);
}
