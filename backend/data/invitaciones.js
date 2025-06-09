// data/Invitaciones.js
const { Invitacion } = require('../models/Invitacion');
const Profesor = require('../models/Profesor');
const Mesa = require('../models/Mesa');

//Se crean los profesores
const docente1 = new Profesor('Jose', '24172');
const docente2 = new Profesor('Gilda', '67890');

//Se crean las mesas con información completa
const mesa1 = new Mesa(4, 'Ing en software I', docente2, docente1, '01/02/2026', '15:00', ['Ivan Cabrera', 'Joaquin Flores'], 'presencial', 'Aula 301', '');
const mesa2 = new Mesa(5, 'Paradigmas II', docente1, docente2, '01/02/2026', '10:30', ['Augusto', 'Rodrigo Magallanes'], 'virtual', '', 'https://ucp.webex.com/meet/paradigmasII-mesa2026');//cambiar por uno posta
const mesa3 = new Mesa(6, 'Sistemas Operativos', docente2, docente1, '01/02/2026', '14:00', ['Ramiro Oviedo', 'Joaquin Flores'], 'presencial', 'Laboratorio 2', '');
const mesa4 = new Mesa(7, 'Redes', docente1, docente2, '01/02/2026', '16:45', ['Ivan Cabrera', 'Joaquin Flores'], 'virtual', '', 'https://ucp.webex.com/meet/redes-examen-feb2026');//cambiar por uno posta


const Invitaciones = [
  // Invitaciones formato
  // new Invitacion(mesa estado),
  new Invitacion(mesa1, 'pendiente'),
  new Invitacion(mesa2, 'pendiente'),
  new Invitacion(mesa3, 'pendiente'),
  new Invitacion(mesa4, 'pendiente'),
];

module.exports = { Invitaciones };
