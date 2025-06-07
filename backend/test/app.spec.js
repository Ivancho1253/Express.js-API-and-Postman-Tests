const { Invitaciones } = require('../data/Invitaciones');
const { mesas } = require('../data/mesas');
//
const request = require('supertest');
const app = require('../app'); 

describe('API', () => {

    //Se testea el home de la api
    test("GET / responde con mensaje de bienvenida", async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe('Bienvenidos al Sistema de Notificaciones UCP :D');
    });

    //Se testea el login exitoso
    test("POST /api/auth/login", async () => {
        const res = await request(app).post('/api/auth/login').send({ username: 'Jose', password: '1234' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ username: 'Jose' });
    });

    //Se testea el login fallido
    test("POST /api/auth/login", async () => {
        const res = await request(app).post('/api/auth/login').send({ username: 'Gilda', password: '1234' });
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: 'Credenciales inválidas' });
    });

    //Se testea el get de mesas
    test("GET /api/mesas", async () => {
        const res = await request(app).get('/api/mesas');
    
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    
        expect(res.body[0]).toEqual({
        id: 1,
        materia: "Paradigmas II",
        titular: { nombre: "Jose", legajo: "24172" },
        vocal:   { nombre: "Gilda", legajo: "67890" },
        fecha: "2024-07-10",
        alumnos: ["Augusto", "Joaco"]
        });
    });

    //Se testea el get profesores, osea obtener todos los profesores
    test("GET /api/profesores", async () => {
        const res = await request(app).get('/api/profesores');
        expect(res.statusCode).toBe(200);
        expect(typeof res.body).toBe('object');

        expect(res.body).toEqual({
            docente1: { nombre: "Jose", legajo: "24172" },
            docente2: { nombre: "Gilda", legajo: "67890" }
        });
    });

    //Se testea el get profesor filtrado por nombre
    test("GET /api/profesores/:nombre", async () => {
        const res = await request(app).get('/api/profesores/Gilda');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ nombre: "Gilda", legajo: "67890" });
    });

    //Se testea el get profesor filtrado por nombre no existente
    test("GET /api/profesores/:nombre", async () => {
        const res = await request(app).get('/api/profesores/Pepe');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: 'Profesor no encontrado' });
    });

    //Se testea el get de invitaciones
    test("GET /api/invitaciones", async () => {
        const res = await request(app).get('/api/invitaciones');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    
        expect(res.body[0]).toEqual({
            mesa: {
                id: 4,
                materia: "Ing en software I",
                titular: { nombre: "Gilda", legajo: "67890" },
                vocal: { nombre: "Jose", legajo: "24172" },
                fecha: "01/02/2026",
                alumnos: ["Ivan Cabrera", "Joaquin Flores"]
            },
            estado: "pendiente",
            estados: {
                "Jose": "pendiente",
                "Gilda": "pendiente"
            }
        });
    });

    //Se testea el get de invitaciones con horas
    test("GET /api/invitaciones", async () => {
        const res = await request(app).get('/api/invitaciones');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    
        expect(res.body[0]).toEqual({
            mesa: {
                id: 4,
                materia: "Ing en software I",
                titular: { nombre: "Gilda", legajo: "67890" },
                vocal: { nombre: "Jose", legajo: "24172" },
                fecha: "01/02/2026",
                hora: "15:00",
                alumnos: ["Ivan Cabrera", "Joaquin Flores"]
            },
            estado: "pendiente",
            estados: {
                "Jose": "pendiente",
                "Gilda": "pendiente"
            }
        });
    });

    //Se testea el get de invitaciones filtrado por profesor
    test("GET /api/invitaciones/:usuario", async () => {
        const res = await request(app).get('/api/invitaciones/Gilda');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    
        expect(res.body[0]).toEqual({
            mesa: {
                id: 4,
                materia: "Ing en software I",
                titular: { nombre: "Gilda", legajo: "67890" },
                vocal: { nombre: "Jose", legajo: "24172" },
                fecha: "01/02/2026",
                alumnos: ["Ivan Cabrera", "Joaquin Flores"]
            },
            estado: "pendiente",
            estados: {
                "Jose": "pendiente",
                "Gilda": "pendiente"
            }
        });
    });
});

//ACEPTACION
//Test para aceptar de forma individual
describe("POST /api/invitaciones/aceptar", () => {

    //Se testea el post de aceptar individual por el titular
    test("cambia el estado individual a aceptada para el usuario (titular)", async () => {
      const res = await request(app).post('/api/invitaciones/aceptar').send({ id: 4, usuario: "Gilda" });

      // Confirmamos que el estado de Gilda en mesa1 haya cambiado
      const invitacion = Invitaciones.find(i => i.mesa.id === 4);
      expect(invitacion.getEstadosIndividuos()).toEqual({
        'Gilda': 'aceptada',
        'Jose': 'pendiente'
      });

      //El estado general de le mesa sigue siendo pendente pq falta Jose
      expect(invitacion.estado).toBe('pendiente'); 
      expect(invitacion.getEstadosIndividuos().Gilda).toBe("aceptada");
    });

    //Se testea el post de aceptar individual por el vocal
    test("cambia el estado individual a aceptada para el usuario (vocal)", async () => {
        const res = await request(app).post('/api/invitaciones/aceptar').send({ id: 6, usuario: "Jose" });
  
        // Confirmamos que el estado de Gilda en mesa1 haya cambiado
        const invitacion = Invitaciones.find(i => i.mesa.id === 6);
        expect(invitacion.getEstadosIndividuos()).toEqual({
          'Gilda': 'pendiente',
          'Jose': 'aceptada'
        });
  
        //El estado general de le mesa sigue siendo pendente pq falta Gilda
        expect(invitacion.estado).toBe('pendiente'); 
      }); 

    //No se encuentra la invitacion para aceptar
    test("POST /api/invitaciones/aceptar - invitación no encontrada", async () => {
        const res = await request(app).post('/api/invitaciones/aceptar').send({id: 999, usuario: "Jose"});
      
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "Invitación no encontrada" });
      });

    //Test de rechazo si se quiere aceptar la misma invitacion 2 veces
    test("rechaza segundo intento de aceptación del mismo usuario", async () => {
        await request(app).post('/api/invitaciones/aceptar').send({ id: 4, usuario: "Gilda" });
      
        const res = await request(app).post('/api/invitaciones/aceptar').send({ id: 4, usuario: "Gilda" });
      
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: "Ya aceptaste esta invitación" });
    });

    //Test de rechazo si un usuario no invitado quiere aceptar la invitacion  
    test("usuario no invitado no puede aceptar", async () => {
        const res = await request(app).post('/api/invitaciones/aceptar').send({id: 4,usuario: "Figue"});// No está ni como titular ni vocal
      
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "Invitación no encontrada" });
    });
});


//Test de aceptacion de invitacion general completa
describe("POST /api/invitaciones/aceptar - aceptación completa", () => {

    test("ambos aceptan y se agrega la mesa", async () => {
        // Primer aceptación de Gilda
        await request(app).post('/api/invitaciones/aceptar').send({ id: 4, usuario: "Gilda" });
      
        // Segunda aceptación de Jose
        const res = await request(app).post('/api/invitaciones/aceptar').send({ id: 4, usuario: "Jose" });

        // Verificar que la mesa fue agregada
        const mesaAgregada = mesas.find(m => m.id === 4);
        expect(mesaAgregada).toBeDefined();
        expect(mesaAgregada.materia).toBe("Ing en software I");

        //Testear que se filtre la mesa de GIlda
        const res2 = await request(app).get('/api/mesas/Gilda');
    
        expect(res2.statusCode).toBe(200);
        expect(Array.isArray(res2.body)).toBe(true);
        
    });

});

//Rechazo
describe("POST /api/invitaciones/rechazar", () => {

    //Se rechaza la mesa porque uno acepta y el otro rechaza
    test("uno acepta y otro rechaza, no se agrega la mesa", async () => {
        // Acepta Gilda
        await request(app).post('/api/invitaciones/aceptar').send({ id: 5, usuario: "Gilda" });
      
        // Rechaza Jose
        const res = await request(app).post('/api/invitaciones/rechazar').send({ id: 5, usuario: "Jose" });
        
        expect(res.body).toEqual({ success: true });

        // Verifica estado de la invitación
        const invitacion = Invitaciones.find(i => i.mesa.id === 5);
        expect(invitacion.getEstadosIndividuos()).toEqual({
          Gilda: "aceptada",
          Jose: "rechazada"
        });

        expect(invitacion.estado).toBe("rechazada");
      
        // Verifica que NO se agregó la mesa
        const mesaAgregada = mesas.find(m => m.id === 5);
        expect(mesaAgregada).toBeUndefined();
    });

    //Test de rechazar una invitacion no encontrada
    test("POST /api/invitaciones/rechazar - invitación no encontrada", async () => {
        const res = await request(app).post('/api/invitaciones/rechazar').send({ id: 999, usuario: "Gilda" });
      
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: "Invitación no encontrada" });
    })

    //Test de rechazar una invitacion ya rechazada
    test("POST /api/invitaciones/rechazar - invitación ya rechazada", async () => {

        //volvemos a establecer pendiente en los estados del titular y el vocal para evitar problemas
        const invitacion = Invitaciones.find(i => i.mesa.id === 5);
        invitacion._estados = {
            [invitacion.mesa.titular.nombre]: "pendiente",
            [invitacion.mesa.vocal.nombre]: "pendiente"
        };
          
        // Rechazar por primera vez
        await request(app).post('/api/invitaciones/rechazar').send({ id: 5, usuario: "Gilda" });
      
        // Rechazar por segunda vez
        const res = await request(app).post('/api/invitaciones/rechazar').send({ id: 5, usuario: "Gilda" });
      
        // Verificamos la respuesta silenciosa
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ success: true, message: "Ya estaba rechazada." });
      });
});

//Notificaciones
describe("GET /api/notificaciones", () => {

    test("debe devolver todas las notificaciones", async () => {
        const res = await request(app).get('/api/notificaciones');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("debe devolver notificaciones filtradas por usuario", async () => {
        const usuario = "Gilda";
        const res = await request(app).get(`/api/notificaciones/${usuario}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        res.body.forEach(notif => {
            expect(notif).toEqual(
                expect.objectContaining({
                    receptor: usuario
                })
            );
        });
    });

    test("devuelve lista vacía si no hay notificaciones para el usuario", async () => {
        const res = await request(app).get('/api/notificaciones/UsuarioInexistente');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
});

describe('POST /api/notificaciones/registrar', () => {
    test('registra usuario correctamente para notificaciones push', async () => {
      const res = await request(app)
        .post('/api/notificaciones/registrar')
        .send({ usuario: 'Gilda' });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Usuario registrado para notificaciones push'
      });
    });
  
    test('retorna error si no se proporciona usuario', async () => {
      const res = await request(app)
        .post('/api/notificaciones/registrar')
        .send({});
  
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({ error: 'Usuario no proporcionado' });
    });
});
  
describe('GET /api/notificaciones/push/:usuario', () => {

    test('devuelve mensajes push pendientes para el usuario', async () => {
        // Registrar usuario y generar un mensaje de prueba
        await request(app).post('/api/notificaciones/registrar').send({ usuario: 'Gilda' });
        const invitacion = Invitaciones.find(i => i.mesa.id === 6);
        
        invitacion._estados = {
            Gilda: 'aceptada',
            Jose: 'aceptada'
        };
        invitacion.estado = 'confirmada';

        await request(app).post('/api/invitaciones/aceptar').send({ id: 6, usuario: 'Gilda' });
        await request(app).post('/api/invitaciones/aceptar').send({ id: 6, usuario: 'Jose' });
    
        const res = await request(app).get('/api/notificaciones/push/Gilda');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.mensajes)).toBe(true);
    });
  
    test('retorna 200 y arreglo vacío si usuario no tiene mensajes pendientes', async () => {

        await request(app).post('/api/notificaciones/registrar').send({ usuario: 'UsuarioSinMensajes' });
        const res = await request(app).get('/api/notificaciones/push/UsuarioSinMensajes');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.mensajes)).toBe(true);
        expect(res.body.mensajes.length).toBe(0);
    });
  });
  
   
