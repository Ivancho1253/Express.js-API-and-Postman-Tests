const PushStrategyNotification = require('../service/StrategyPushNotification');

describe('PushStrategyNotification', () => {

    let pushNotifier;

    beforeEach(() => {
        pushNotifier = new PushStrategyNotification();
    });

    test('registra y obtiene mensajes pendientes correctamente', () => {
        pushNotifier.registrarUsuario('Carlos');

        pushNotifier.notificar(
        'Carlos',
        'Paradigma II',
        '2025-06-20',
        '14:00',
        'presencial',
        'Aula 101',
        '',
        'Gilda'
        );

        const mensajes = pushNotifier.obtenerMensajesPendientes('Carlos');

        expect(mensajes.length).toBe(1);
        expect(mensajes[0].titulo).toBe('Mesa Confirmada ✅');
    });

    test('no notifica si el usuario no está suscrito', () => {
        pushNotifier.notificar(
        'Jose',
        'I.S II',
        '2025-06-20',
        '15:00',
        'virtual',
        '',
        'https://webex.com/12345',
        'Figue'
        );

        const mensajes = pushNotifier.obtenerMensajesPendientes('Jose');
        expect(mensajes).toEqual([]);
    });

    test('notifica a ambos usuarios suscritos', () => {
        pushNotifier.registrarUsuario('Jose');
        pushNotifier.registrarUsuario('Gilda');

        pushNotifier.notificar(
        'Jose',
        'I.S II',
        '2025-06-20',
        '16:00',
        'presencial',
        'Aula 205',
        '',
        'Gilda'
        );

        const mensajesJose = pushNotifier.obtenerMensajesPendientes('Jose');
        const mensajesGilda = pushNotifier.obtenerMensajesPendientes('Gilda');

        expect(mensajesJose.length).toBe(1);
        expect(mensajesJose[0].cuerpo).toContain('confirmada para');

        expect(mensajesGilda.length).toBe(1);
        expect(mensajesGilda[0].cuerpo).toContain('confirmada para');
    });

    test('limpia los mensajes después de obtenerlos', () => {
        pushNotifier.registrarUsuario('Carlos');

        pushNotifier.notificar(
        'Carlos',
        'Paradigmas II',
        '2025-06-20',
        '17:00',
        'virtual',
        '',
        'https://webex.com/67890',
        'Jose'
        );

        const mensajes1 = pushNotifier.obtenerMensajesPendientes('Carlos');
        const mensajes2 = pushNotifier.obtenerMensajesPendientes('Carlos');

        expect(mensajes1.length).toBe(1);
        expect(mensajes2.length).toBe(0);
    });

    test('elimina correctamente un usuario de las notificaciones', () => {
        pushNotifier.registrarUsuario('Gilda');
    
        pushNotifier.notificar(
          'Gilda',
          'I.S I',
          '2025-06-21',
          '18:00',
          'presencial',
          'Aula 301',
          '',
          'Carlos'
        );
    
        expect(pushNotifier.obtenerMensajesPendientes('Gilda').length).toBe(1);
    
        pushNotifier.eliminarUsuario('Gilda');
    
        expect(pushNotifier.subscriptions.has('Gilda')).toBe(false);
        expect(pushNotifier.mensajesPendientes.has('Gilda')).toBe(false);
      });
});