package com.equipo1.alumnos.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.equipo1.alumnos.model.Semestre;
public interface SemestreRepository extends JpaRepository<Semestre, Long>{
}
