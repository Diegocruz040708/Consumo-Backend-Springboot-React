//package com.equipo1.alumnos;

//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.*;
//
//import java.util.Optional;
//
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import com.equipo1.alumnos.model.Alumno;
//import com.equipo1.alumnos.repository.AlumnoRepository;
//import com.equipo1.alumnos.services.AlumnoService;
//
//@ExtendWith(MockitoExtension.class)
//public class AlumnoServiceTest {
//
//    @Mock
//    private AlumnoRepository alumnoRepository;
//
//    @InjectMocks
//    private AlumnoService alumnoService;
//
//    @Test
//    public void debeGuardarUnAlumno() {
//
//        Alumno alumnoParaGuardar = new Alumno();
//        alumnoParaGuardar.setNombre("Carlos");
//        alumnoParaGuardar.setCarrera("Informatica");
//
//        Alumno alumnoGuardado = new Alumno();
//        alumnoGuardado.setId(1L);
//        alumnoGuardado.setNombre("Carlos");
//        alumnoGuardado.setCarrera("Informatica");
//
//        when(alumnoRepository.save(any(Alumno.class))).thenReturn(alumnoGuardado);
//
//        Alumno resultado = alumnoService.guardarAlumno(alumnoParaGuardar);
//
//        assertNotNull(resultado.getId());
//        assertEquals("Carlos", resultado.getNombre());
//        verify(alumnoRepository, times(1)).save(alumnoParaGuardar);
//    }
//
//    @Test
//    public void debeActualizarUnAlumnoSiExiste() {
//
//        Long id = 1L;
//        Alumno alumnoExistente = new Alumno(id, "111", "ViejoNombre", "Apellido", "123", "email", "Carrera", "url");
//        Alumno datosNuevos = new Alumno(null, "111", "NuevoNombre", "Apellido", "123", "email", "Carrera", "url");
//
//        when(alumnoRepository.findById(id)).thenReturn(Optional.of(alumnoExistente));
//
//        when(alumnoRepository.save(any(Alumno.class))).thenReturn(datosNuevos);
//
//        Optional<Alumno> resultado = alumnoService.actualizarAlumno(id, datosNuevos);
//
//        assertTrue(resultado.isPresent());
//        assertEquals("NuevoNombre", resultado.get().getNombre());
//    }
//}