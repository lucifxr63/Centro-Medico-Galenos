const express = require('express');
const router = express.Router();
const {
  crearCitaMedica,
  obtenerCitasMedicasDisponibles,
  anularCitaMedica, 
  obtenerCitasAnuladas, 
  obtenerCitaAnuladaPorId,
  consultarPacientesEnEspera,
  marcarPacienteAtendido,
  enviarCorreosDeRecordatorio
} = require('../controllers/controller.citas_medicas');

// Ruta para crear una nueva cita médica
router.post('/citas-medicas', crearCitaMedica);

// Ruta para obtener todas las citas médicas disponibles
router.get('/citas-medicas/disponibles', obtenerCitasMedicasDisponibles);

// Ruta para anular una cita médica por ID
router.put('/citas/:id/anular', anularCitaMedica);

// Ruta para obtener todas las citas médicas anuladas
router.get('/citas/anuladas', obtenerCitasAnuladas);

// Ruta para obtener una cita médica anulada por ID
router.get('/citas/anuladas/:id', obtenerCitaAnuladaPorId);

// Ruta para obtener la lista de pacientes en espera
router.get('/pacientes-en-espera', consultarPacientesEnEspera);

// Ruta para marcar a un paciente como atendido
router.put('/marcar-paciente/:citaId', marcarPacienteAtendido);

// Ruta para enviar correos de recordatorio manualmente
router.post('/enviar', enviarCorreosDeRecordatorio);


module.exports = router;
