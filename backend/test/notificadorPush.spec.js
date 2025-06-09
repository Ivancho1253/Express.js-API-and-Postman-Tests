const NotificadorPush = require('../models/NotificadorPush');
const PushStrategyNotification = require('../service/StrategyPushNotification');

jest.mock('../service/StrategyPushNotification', () => {
  return jest.fn().mockImplementation(() => {
    return {
      notificar: jest.fn(),
      registrarUsuario: jest.fn(() => true),
      eliminarUsuario: jest.fn(),
    };
  });
});

describe('NotificadorPush', () => {
    let notificador;

    beforeEach(() => {
        PushStrategyNotification.mockClear();
        notificador = new NotificadorPush();

    });

    test('usa singleton correctamente', () => {

        const notificador2 = new NotificadorPush();
        expect(notificador).toBe(notificador2);

    });

    test('llama a notificar de la estrategia con los parámetros correctos', () => {

        const mesa = {
            materia: 'Economía',
            fecha: '2025-07-01',
            hora: '14:00',
            tipo: 'presencial',
            aula: 'Aula 101',
            linkWebex: '',
            titular: { nombre: 'Gilda' },
            vocal: { nombre: 'Carlos' },
        };

        notificador.notificar(mesa);

        expect(notificador.estrategiaPush.notificar).toHaveBeenCalledWith(
            'Gilda',
            'Economía',
            '2025-07-01',
            '14:00',
            'presencial',
            'Aula 101',
            '',
            'Carlos'
        );
    });

    test('registra usuarios usando la estrategia', () => {
        const resultado = notificador.registrarUsuario('Figue');
        expect(resultado).toBe(true);
        expect(notificador.estrategiaPush.registrarUsuario).toHaveBeenCalledWith('Figue');
    });

    test('elimina usuarios usando la estrategia', () => {
        notificador.eliminarUsuario('Figue');
        expect(notificador.estrategiaPush.eliminarUsuario).toHaveBeenCalledWith('Figue');
    });
});
