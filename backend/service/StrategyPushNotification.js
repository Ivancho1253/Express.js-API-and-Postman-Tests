const StrategyNotification = require('./StrategyNotification');

/**
 * Implementación de Strategy para notificaciones push
 * Maneja el almacenamiento y envío de notificaciones push a usuarios suscritos
 */
class StrategyPushNotification extends StrategyNotification {
  /**
   * Inicializa las estructuras para manejar suscripciones y mensajes
   */
  constructor() {
    super();
    this.subscriptions = new Map(); // Mantenemos un registro de usuarios suscritos
    this.mensajesPendientes = new Map(); // Almacenamos mensajes pendientes por usuario
  }

  /**
   * Envía una notificación push a los usuarios correspondientes
   * @param {string} nombreTitular - Nombre del profesor titular
   * @param {string} materia - Nombre de la materia
   * @param {string} fecha - Fecha de la mesa
   * @param {string} hora - Hora de la mesa
   * @param {string} tipo - Tipo de mesa (virtual/presencial)
   * @param {string} aula - Aula (si es presencial)
   * @param {string} linkWebex - Link de Webex (si es virtual)
   * @param {string} nombreVocal - Nombre del profesor vocal
   */
  notificar(nombreTitular, materia, fecha, hora, tipo, aula, linkWebex, nombreVocal) {
    // Construir información adicional según el tipo de mesa
    let infoAdicional = '';
    if (tipo === 'virtual' && linkWebex) {
      infoAdicional = ` Modalidad: Virtual.`;
    } else if (tipo === 'presencial' && aula) {
      infoAdicional = ` Modalidad: Presencial en ${aula}`;
    } else {
      infoAdicional = ` Modalidad: ${tipo === 'virtual' ? 'Virtual' : 'Presencial'}`;
    }

    // Creamos mensajes personalizados para cada profesor
    const mensajeTitular = {
      titulo: 'Mesa Confirmada ✅',
      cuerpo: `Mesa de ${materia} confirmada para ${fecha} a las ${hora}.${infoAdicional}`,
      timestamp: Date.now()
    };

    const mensajeVocal = {
      titulo: 'Mesa Confirmada ✅',
      cuerpo: `Mesa de ${materia} confirmada para ${fecha} a las ${hora}.${infoAdicional}`,
      timestamp: Date.now()
    };
    
    // Guardamos los mensajes para cada profesor
    if (this.subscriptions.has(nombreTitular)) {
      if (!this.mensajesPendientes.has(nombreTitular)) {
        this.mensajesPendientes.set(nombreTitular, []);
      }
      this.mensajesPendientes.get(nombreTitular).push(mensajeTitular);
      console.log('Mensaje push guardado para titular:', nombreTitular);
    }

    if (this.subscriptions.has(nombreVocal)) {
      if (!this.mensajesPendientes.has(nombreVocal)) {
        this.mensajesPendientes.set(nombreVocal, []);
      }
      this.mensajesPendientes.get(nombreVocal).push(mensajeVocal);
      console.log('Mensaje push guardado para vocal:', nombreVocal);
    }
  }

  /**
   * Obtiene los mensajes pendientes para un usuario
   * @param {string} usuario - Usuario del que obtener mensajes
   * @returns {Array} Lista de mensajes pendientes
   */
  obtenerMensajesPendientes(usuario) {
    const mensajes = this.mensajesPendientes.get(usuario) || [];
    this.mensajesPendientes.set(usuario, []); // Limpiamos los mensajes después de obtenerlos
    return mensajes;
  }

  /**
   * Registra un usuario para recibir notificaciones
   * @param {string} usuario - Usuario a registrar
   * @returns {boolean} True si el registro fue exitoso
   */
  registrarUsuario(usuario) {
    this.subscriptions.set(usuario, true);
    return true;
  }

  /**
   * Elimina un usuario de las notificaciones
   * @param {string} usuario - Usuario a eliminar
   */
  eliminarUsuario(usuario) {
    this.subscriptions.delete(usuario);
    this.mensajesPendientes.delete(usuario);
  }
}

module.exports = StrategyPushNotification; 