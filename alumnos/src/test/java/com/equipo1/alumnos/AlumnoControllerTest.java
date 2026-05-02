//package com.equipo1.alumnos;
//
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//import static org.hamcrest.Matchers.*;
//import static org.mockito.Mockito.verify;
//import static org.mockito.Mockito.times;
//import java.util.Arrays;
//
//import com.equipo1.alumnos.controllers.AlumnoController;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.equipo1.alumnos.model.Alumno;
//import com.equipo1.alumnos.repository.AlumnoRepository;
//import com.equipo1.alumnos.services.AlumnoService;
//
//@WebMvcTest(AlumnoController.class)
//class AlumnoControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private AlumnoService alumnoService;
//
//    @Mock
//    private AlumnoRepository alumnoRepository;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Test
//    public void debeTraerTodosLosAlumnos() throws Exception {
//
//        Alumno alumno1 = new Alumno(1L, "123", "Israel", "Perez", "555", "israel@test.com", "Sistemas", "url1");
//        Alumno alumno2 = new Alumno(2L, "124", "Juan", "Gomez", "555", "juan@test.com", "Sistemas", "url2");
//
//        when(alumnoService.obtenerTodos()).thenReturn(Arrays.asList(alumno1, alumno2));
//
//        mockMvc.perform(get("/alumnos/traer-alumnos")
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$", hasSize(2)))
//                .andExpect(jsonPath("$[0].nombre", is("Israel")));
//    }
//
//    @Test
//    public void debeEliminarUnAlumno() throws Exception {
//        Long idParaEliminar = 1L;
//
//        mockMvc.perform(delete("/alumnos/eliminar-alumnos/{id}", idParaEliminar)
//                .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk());
//
//        verify(alumnoService, times(1)).eliminarAlumno(idParaEliminar);
//    }
//}
