package com.equipo1.alumnos.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Semestre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;

    // Un semestre tiene MUCHAS materias
    @OneToMany(mappedBy = "semestre", cascade = CascadeType.ALL)
    @JsonIgnore // Evita el error de recursividad infinita al convertir a JSON
    private List<Materia> materias;
}
