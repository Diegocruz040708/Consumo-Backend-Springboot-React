package com.equipo1.alumnos.mapper;
import java.util.ArrayList;
import java.util.List;

import com.equipo1.alumnos.dto.AlumnoDTO;
import com.equipo1.alumnos.dto.MateriaDTO;
import com.equipo1.alumnos.model.Alumno;
import com.equipo1.alumnos.model.Materia;
public class AlumnoMapper {
    public static AlumnoDTO mapearADTO(Alumno alumno) {
        AlumnoDTO dto = new AlumnoDTO();
        dto.setId(alumno.getId());
        dto.setNumeroControl(alumno.getNumeroControl());
        // Juntamos nombre y apellido aquí mismo
        dto.setNombreCompleto(alumno.getNombre() + " " + alumno.getApellido());
        dto.setCarrera(alumno.getCarrera());

        // Transformamos la lista de Materias a lista de MateriaDTOs
        List<MateriaDTO> materiasDTO = new ArrayList<>();
        if (alumno.getMaterias() != null) {
            for (Materia materia : alumno.getMaterias()) {
                MateriaDTO matDTO = new MateriaDTO();
                matDTO.setId(materia.getId());
                matDTO.setNombre(materia.getNombre());
                matDTO.setCreditos(materia.getCreditos());
                materiasDTO.add(matDTO);
            }
        }
        dto.setMateriasInscritas(materiasDTO);
        return dto;
    }
}
