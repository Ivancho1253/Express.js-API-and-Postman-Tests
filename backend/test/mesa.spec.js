const Mesa = require('../models/Mesa');
const Profesor = require('../models/Profesor');

describe("Clase Mesa", () => {
  let mesa;
  beforeEach(() => {
    const titular = new Profesor('Figueredo');
    const vocal   = new Profesor('Gilda');
    mesa = new Mesa(1, 'Algebra', titular, vocal, '01/01/2025', '15:00', ['Ivan Cabrera', 'Joaquin Flores']);
  });

  test("propiedades iniciales", () => {
    expect(mesa.id).toBe(1);
    expect(mesa.materia).toBe('Algebra');
    expect(mesa.titular).toBeInstanceOf(Profesor);
    expect(mesa.vocal).toBeInstanceOf(Profesor);
    expect(mesa.fecha).toBe('01/01/2025');
    expect(mesa.hora).toBe('15:00');
    expect(mesa.alumnos).toEqual(['Ivan Cabrera', 'Joaquin Flores']);
  });

  test("agregar alumno nuevo", () => {
    mesa.agregarAlumno('Rodrigo Magallanes');
    expect(mesa.alumnos).toContain('Rodrigo Magallanes');
  });

  test("no agrega alumno duplicado", () => {
    mesa.agregarAlumno('Ivan Cabrera');
    const count = mesa.alumnos.filter(a => a === 'Ivan Cabrera').length;
    expect(count).toBe(1);
  });

  test("toJSON devuelve objeto con las mismas propiedades", () => {
    const json = mesa.toJSON();
    expect(json).toEqual({
      id: 1,
      materia: 'Algebra',
      titular: mesa.titular,
      vocal: mesa.vocal,
      fecha: mesa.fecha,
      hora: mesa.hora,
      tipo: mesa.tipo,
      aula: mesa.aula,
      linkWebex: mesa.linkWebex,
      alumnos: mesa.alumnos
    });
  });

});



//Test tradicionales
//describe("Test Docentes", () => {
//    
//    test("el docente puede rechazar la invitación", () => {
//        const titular = new Profesor("El Figue");
//        const vocal = new Profesor("Gilda");
//
//        const alumnos = ["Joackensio", "El Figue", "El Figue", "El Figue"];
//        const mesa = new Mesa(titular, vocal, "01/01/2025", alumnos);
//        const invitacion = new Invitacion();
//        
//        invitacion.enviar(mesa, titular, vocal);        
//        titular.rechazarMesa(mesa.id);
//        vocal.rechazarMesa(mesa.id);
//        
//        expect(mesa.docentes.length).toBe(0);
//    });
//
//    test("el docente puede confirmar la invitación", () => {
//        const titular = new Profesor("El Figue");
//        const vocal = new Profesor("Gilda");
//
//        const alumnos = ["Joackensio", "El Figue", "El Figue", "El Figue"];
//        const mesa = new Mesa(titular, vocal, "01/01/2025", alumnos);
//        const invitacion = new Invitacion();
//        
//        invitacion.enviar(mesa, titular, vocal);        
//        titular.confirmarMesa(mesa.id);
//        
//    })
//
//    test("enviar invitación y reciben notificaciones ambos docentes", () => {
//        const titular = new Profesor("El Figue");
//        const vocal = new Profesor("Gilda");
//        const alumnos = ["Joackensio", "Pepito", "Maria"];
//        const mesa = new Mesa(titular, vocal, "01/01/2025", alumnos);
//        const invitacion = new Invitacion();
//    
//        invitacion.enviar(mesa, titular, vocal);
//    
//        expect(titular.notificaciones).toContain(mesa);
//        expect(vocal.notificaciones).toContain(mesa);
//    });
//
//    test("crear una invitacion para sin vocal", () => {
//        const titular = new Profesor("El Figue");
//        const alumnos = ["Joackensio", "Pepito", "Maria"];
//        const mesa = new Mesa(titular, null, "01/01/2025", alumnos);
//        const invitacion = new Invitacion();
//    
//        invitacion.enviar(mesa, titular, null);
//    
//        expect(titular.notificaciones).toContain(mesa);
//    })    
//
//    test("crear una mesa", () => {
//        const titular = new Profesor("Jose");
//        const vocal = new Profesor("Gilda");
//        const mesa = new Mesa(titular, vocal, "01/01/2025");
//    
//        expect(mesa.titular.nombre).toBe("Jose");
//        expect(mesa.vocal.nombre).toBe("Gilda");
//        expect(mesa.fecha).toBe("01/01/2025");
//    });
//
//    test("mesa pasa a completada después de la fecha", () => {
//        const titular = new Profesor("Jose");
//        const vocal = new Profesor("Gilda");
//        const alumnos = ["Alumno1", "Alumno2"];
//        const hoy = "08/05/2025";
//        const mesa = new Mesa(titular, vocal, hoy, alumnos);
//
//        titular.confirmarMesa(mesa.id);
//        vocal.confirmarMesa(mesa.id);
//        
//        mesa.actualizarEstado();
//        expect(mesa.estado).toBe("confirmado por deus");
//    });
//
//    test("mesa sigue pendiente  si no confirman ambos", () => {
//        const titular = new Profesor("Jose");
//        const vocal   = new Profesor("Gilda");
//        const alumnos = ["Alumno1", "Alumno2"];
//        const hoy     = "23/05/2025";
//        const mesa    = new Mesa(titular, vocal, hoy, alumnos);
//
//        titular.confirmarMesa(mesa.id);
//    
//        mesa.actualizarEstado();
//        expect(mesa.estado).toBe("pendiente");
//    });
//
//    test("mesa pasa a rechazada si rechazan ambos profesores", () => {
//        const titular = new Profesor("Jose");
//        const vocal   = new Profesor("Gilda");
//        const alumnos = ["Alumno1", "Alumno2"];
//        const hoy     = "23/05/2025";
//        const mesa    = new Mesa(titular, vocal, hoy, alumnos);
//
//        titular.rechazarMesa(mesa.id);
//        vocal.rechazarMesa(mesa.id);
//    
//        mesa.actualizarEstado();
//        expect(mesa.estado).toBe("rechazada :c");
//    })
//
//
//
//})
//