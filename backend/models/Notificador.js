const ConsolaStrategyNotification = require('../service/ConsolaStrategyNotification');
const PushStrategyNotification = require('../service/StrategyPushNotification');

/**
 * Implementación del patrón Observer para el sistema de notificaciones
 * Maneja el envío de notificaciones a múltiples observadores (email, escritorio, etc.)
 */
class Notificador {
  /**
   * Constructor que implementa el patrón Singleton
   * @param {Object} profesores - Objeto con los profesores disponibles
   */
  constructor(profesores) {
    if (Notificador._instance) return Notificador._instance;

    this.notificaciones = [];
    this.profesores = profesores;
    this.observers = []; // Observer para email

    Notificador._instance = this;
  }

  /**
   * Obtiene la instancia única del Notificador (Singleton)
   * @param {Object} profesores - Objeto con los profesores disponibles
   * @returns {Notificador} Instancia única del notificador
   */
  static getInstance(profesores) {
    if (!Notificador._instance) {
      Notificador._instance = new Notificador(profesores);
    }
    return Notificador._instance;
  }

  /**
   * Agrega un nuevo observador al sistema de notificaciones
   * @param {Object} observer - Observador que implementa el método update
   */
  addObserver(observer) {
    this.observers.push(observer);
  }

  /**
   * Elimina un observador del sistema de notificaciones
   * @param {Object} observer - Observador a eliminar
   */
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  /**
   * Notifica a todos los observadores registrados
   * @param {Object} mensaje - Mensaje a enviar a los observadores
   */
  notifyObservers(mensaje) {
    this.observers.forEach(observer => observer.update(mensaje));
  }

  /**
   * Procesa y envía notificaciones para una mesa de examen
   * @param {Mesa} mesa - Mesa de examen para la cual enviar notificaciones
   */
  notificar(mesa) {
    const { materia, fecha, hora, tipo, aula, linkWebex, titular, vocal } = mesa;

    // Mensajes para los profesores (email) - usando Observer
    const mensajesEmail = [
      this._crearMensaje(titular.nombre, vocal.nombre, 'Titular', 'Vocal', materia, fecha, hora, tipo, aula, linkWebex),
      this._crearMensaje(vocal.nombre, titular.nombre, 'Vocal', 'Titular', materia, fecha, hora, tipo, aula, linkWebex)
    ];

    // Enviar notificaciones por email usando Observer
    mensajesEmail.forEach(msg => {
      this.notificaciones.push(msg);
      this.notifyObservers(msg);
    });
  }

  /**
   * Crea un mensaje de notificación
   * @private
   * @param {string} receptor - Profesor que recibe la notificación
   * @param {string} otroProfesor - Otro profesor de la mesa
   * @param {string} rol - Rol del profesor receptor
   * @param {string} rolOtro - Rol del otro profesor
   * @param {string} materia - Nombre de la materia
   * @param {string} fecha - Fecha de la mesa
   * @param {string} hora - Hora de la mesa
   * @param {string} tipo - Tipo de mesa (virtual/presencial)
   * @param {string} aula - Aula (si es presencial)
   * @param {string} linkWebex - Link de Webex (si es virtual)
   * @returns {Object} Mensaje formateado
   */
  _crearMensaje(receptor, otroProfesor, rol, rolOtro, materia, fecha, hora, tipo, aula, linkWebex) {
    return {
      receptor,
      materia,
      fecha,
      hora,
      tipo,
      aula,
      linkWebex,
      rol,
      otroProfesor,
      rolOtro,
      timestamp: new Date()
    };
  }

  obtenerNotificaciones() {
    return this.notificaciones;
  }

  obtenerNotificacionesPorUsuario(usuario) {
    return this.notificaciones.filter(n => n.receptor === usuario);
  }

  // Método para registrar suscripciones push
  registrarSuscripcionPush(usuario, subscription) {
    this.estrategiaPush.registrarSuscripcion(usuario, subscription);
  }
}

module.exports = Notificador;

