const express = require('express');
const router = express.Router();
const { crearAgendaMedico,obtenerAgendasMedicos,eliminarDisponibilidad,agregarEventoEspecial} = require('../controllers/controller.Agenda_Medicos');


// Ruta para crear una nueva agenda de médico
router.post('/medicos/agendas-medicos', crearAgendaMedico);

// Ruta para obtener todas las agendas de médicos
router.get('/medicos/agendas-medicos', obtenerAgendasMedicos);

// Ruta para agregar un evento especial (seminario) a la agenda de un médico
router.post('/medicos/:medicoId/agenda/eventos-especiales', agregarEventoEspecial);

// Ruta para eliminar una disponibilidad programada en la agenda de un médico
router.delete('/medicos/:medicoId/agenda/disponibilidades/:agendaId', eliminarDisponibilidad);

module.exports = router; 