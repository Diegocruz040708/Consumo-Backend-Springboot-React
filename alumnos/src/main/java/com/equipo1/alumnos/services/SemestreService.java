package com.equipo1.alumnos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.equipo1.alumnos.model.Semestre;
import com.equipo1.alumnos.repository.SemestreRepository;

@Service
public class SemestreService {
    @Autowired
    private SemestreRepository semestreRepository;
    public List<Semestre> obtenerTodos() {
        return semestreRepository.findAll();
    }
    public Optional<Semestre> obtenerPorId(Long id) {
        return semestreRepository.findById(id);
    }
    public Semestre guardarSemestre(Semestre semestre) {
        return semestreRepository.save(semestre);
    }
    public Optional<Semestre> actualizarSemestre(Long id, Semestre semestreDetalles) {
        return semestreRepository.findById(id).map(semestreExistente -> {
            semestreExistente.setNombre(semestreDetalles.getNombre());
            return semestreRepository.save(semestreExistente);
        });
    }
    public void eliminarSemestre(Long id) {
        semestreRepository.deleteById(id);
    }
}