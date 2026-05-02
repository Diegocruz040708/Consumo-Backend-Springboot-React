package com.equipo1.alumnos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 8, max = 10)
    private String numeroControl;

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellido;

    @NotBlank
    @Pattern(regexp = "^\\d{10}$")
    private String telefono;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String carrera;

    private String imagenURL;
@ManyToOne
@JoinColumn(name = "semestre_id", nullable = false)
private Semestre semestre;
    @ManyToMany
    @JoinTable(
        name = "carga_academica",
        joinColumns = @JoinColumn(name = "alumno_id"),
        inverseJoinColumns = @JoinColumn(name = "materia_id")
    )
    private List<Materia> materias;
}