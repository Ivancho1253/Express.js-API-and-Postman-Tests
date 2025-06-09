/**
 * Clase que representa una mesa de examen
 * Contiene información sobre la materia, profesores y alumnos
 */
class Mesa {
    /**
     * Crea una nueva instancia de Mesa
     * @param {number} id - Identificador único de la mesa
     * @param {string} materia - Nombre de la materia
     * @param {Profesor} titular - Profesor titular de la mesa
     * @param {Profesor} vocal - Profesor vocal de la mesa
     * @param {string} fecha - Fecha de la mesa en formato YYYY-MM-DD
     * @param {string} hora - Hora de la mesa en formato HH:MM
     * @param {string[]} alumnos - Lista de nombres de alumnos inscriptos
     * @param {string} tipo - Tipo de mesa: 'virtual' o 'presencial'
     * @param {string} aula - Aula donde se realiza la mesa (solo para presencial)
     * @param {string} linkWebex - Link de Webex para la mesa (solo para virtual)
     */
    constructor(id, materia, titular, vocal, fecha, hora, alumnos = [], tipo = 'presencial', aula = '', linkWebex = '') {
        this._id = id;
        this._materia = materia;
        this._titular = titular;
        this._vocal = vocal;
        this._fecha = fecha;
        this._hora = hora;
        this._alumnos = alumnos;
        this._tipo = tipo; // 'virtual' o 'presencial'
        this._aula = aula; // Solo para mesas presenciales
        this._linkWebex = linkWebex; // Solo para mesas virtuales
    }

    // Getters para acceder a las propiedades privadas
    get id() {
        return this._id;
    }

    get materia() {
        return this._materia;
    }

    get titular() {
        return this._titular;
    }

    get vocal() {
        return this._vocal;
    }

    get fecha() {
        return this._fecha;
    }

    get hora() {
        return this._hora;
    }

    get alumnos() {
        return this._alumnos;
    }

    get tipo() {
        return this._tipo;
    }

    get aula() {
        return this._aula;
    }

    get linkWebex() {
        return this._linkWebex;
    }

    // Setters para modificar propiedades después de la creación
    set aula(nuevaAula) {
        this._aula = nuevaAula;
    }

    set linkWebex(nuevoLink) {
        this._linkWebex = nuevoLink;
    }

    /**
     * Agrega un alumno a la mesa si no está ya inscripto
     * @param {string} nombre - Nombre del alumno a agregar
     */
    agregarAlumno(nombre) {
        if (!this._alumnos.includes(nombre)) {
            this._alumnos.push(nombre);
        }
    }

    /**
     * Convierte la mesa a formato JSON para serialización
     * @returns {Object} Representación JSON de la mesa
     */
    toJSON() {
        return {
            id: this._id,
            materia: this._materia,
            titular: this._titular,
            vocal: this._vocal,
            fecha: this._fecha,
            hora: this._hora,
            alumnos: this._alumnos,
            tipo: this._tipo,
            aula: this._aula,
            linkWebex: this._linkWebex
        };
    }
}

module.exports = Mesa;
