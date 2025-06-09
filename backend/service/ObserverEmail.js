require('dotenv').config(); // Para usar variables del .env
const EmailService = require('../service/EmailService');

/**
 * Implementación del Observer para envío de notificaciones por email
 * Utiliza el servicio de email para enviar las notificaciones
 */
class ObserverEmail {
  /**
   * Inicializa el servicio de email
   */
  constructor() {
    this.emailService = new EmailService();
  }

  /**
   * Procesa y envía una notificación por email
   * @param {Object} mensaje - Mensaje a enviar
   * @param {string} mensaje.receptor - Profesor que recibe el email
   * @param {string} mensaje.materia - Nombre de la materia
   * @param {string} mensaje.fecha - Fecha de la mesa
   * @param {string} mensaje.hora - Hora de la mesa
   * @param {string} mensaje.tipo - Tipo de mesa (virtual/presencial)
   * @param {string} mensaje.aula - Aula (si es presencial)
   * @param {string} mensaje.linkWebex - Link de Webex (si es virtual)
   * @param {string} mensaje.rol - Rol del profesor en la mesa
   * @param {string} mensaje.otroProfesor - Nombre del otro profesor
   * @param {string} mensaje.rolOtro - Rol del otro profesor
   */
  async update(mensaje) {
    const { receptor, materia, fecha, hora, tipo, aula, linkWebex, rol, otroProfesor, rolOtro } = mensaje;

    // Construir información de modalidad
    let infoModalidad = '';
    let detallesModalidad = '';
    
    if (tipo === 'virtual') {
      infoModalidad = '<strong>Modalidad:</strong> Virtual';
      if (linkWebex) {
        detallesModalidad = `<p><strong>Link de acceso:</strong> <a href="${linkWebex}" target="_blank">${linkWebex}</a></p>`;
      }
    } else if (tipo === 'presencial') {
      infoModalidad = '<strong>Modalidad:</strong> Presencial';
      if (aula) {
        detallesModalidad = `<p><strong>Aula:</strong> ${aula}</p>`;
      }
    }

    const to = process.env.EMAIL_DESTINO; // ← DIRECTAMENTE DEL .env
    if (!to) return console.warn(`EMAIL_DESTINO no definido en .env`);
    /* istanbul ignore next */
    await this.emailService.sendEmail({
      to,
      subject: `Mesa de Examen Confirmada - ${materia}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">🎓 Mesa de Examen Confirmada</h2>
          
          <p>Hola <strong>${receptor}</strong>,</p>
          
          <p>Su participación como <strong>${rol}</strong> en la mesa de examen ha sido confirmada.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #495057;">📋 Detalles de la Mesa</h3>
            <p><strong>Materia:</strong> ${materia}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Hora:</strong> ${hora}</p>
            <p>${infoModalidad}</p>
            <p><strong>Su rol:</strong> ${rol}</p>
            <p><strong>Profesor ${rolOtro}:</strong> ${otroProfesor}</p>
          </div>
          
          ${detallesModalidad}
          
          <p style="color: #6c757d; font-size: 14px;">
            Por favor, asegúrese de estar disponible en la fecha y hora indicadas.
          </p>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          
          <p style="color: #6c757d; font-size: 12px;">
            Saludos,<br>
            <strong>Sistema de Notificaciones UCP</strong>
          </p>
        </div>
      `
    });
  }
}

module.exports = ObserverEmail;
