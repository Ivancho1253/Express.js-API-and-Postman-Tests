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
     */
    constructor(id, materia, titular, vocal, fecha, hora, alumnos = []) {
        this._id = id;
        this._materia = materia;
        this._titular = titular;
        this._vocal = vocal;
        this._fecha = fecha;
        this._hora = hora; // Nueva propiedad para la hora de la mesa
        this._alumnos = alumnos;
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
            alumnos: this._alumnos
        };
    }
}

module.exports = Mesa;
