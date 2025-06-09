const PushStrategyNotification = require('../service/StrategyPushNotification');

/**
 * Implementación del patrón Strategy para notificaciones push
 * Maneja el envío de notificaciones push a los usuarios suscritos
 */
class NotificadorPush {
  /**
   * Constructor que implementa el patrón Singleton
   */
  constructor() {
    if (NotificadorPush._instance) return NotificadorPush._instance;
    
    this.estrategiaPush = new PushStrategyNotification();
    NotificadorPush._instance = this;
  }

  /**
   * Obtiene la instancia única del NotificadorPush (Singleton)
   * @returns {NotificadorPush} Instancia única del notificador push
   */
  static getInstance() {
    if (!NotificadorPush._instance) {
      NotificadorPush._instance = new NotificadorPush();
    }
    return NotificadorPush._instance;
  }

  /**
   * Envía notificaciones push para una mesa de examen
   * @param {Mesa} mesa - Mesa de examen para la cual enviar notificaciones
   */
  notificar(mesa) {
    const { materia, titular, vocal, fecha, hora, tipo, aula, linkWebex } = mesa;
    
    // Enviamos la notificación push usando la estrategia
    this.estrategiaPush.notificar(
      titular.nombre,
      materia,
      fecha,
      hora,
      tipo,
      aula,
      linkWebex,
      vocal.nombre
    );
  }

  /**
   * Registra un usuario para recibir notificaciones push
   * @param {string} usuario - Usuario a registrar
   * @returns {boolean} True si el registro fue exitoso
   */
  registrarUsuario(usuario) {
    return this.estrategiaPush.registrarUsuario(usuario);
  }

  /**
   * Elimina un usuario de las notificaciones push
   * @param {string} usuario - Usuario a eliminar
   */
  eliminarUsuario(usuario) {
    this.estrategiaPush.eliminarUsuario(usuario);
  }
}

module.exports = NotificadorPush; 