const express = require('express');
const router = express.Router();
const {
  crearPagoPaciente,
  obtenerPagosPacientes,
  // Importa otros controladores si es necesario
} = require('../controllers/controller.pago_paciente'); // Asegúrate de que la ruta sea correcta

// Ruta para crear un nuevo pago de paciente
router.post('/pagos-pacientes', crearPagoPaciente);

// Ruta para obtener todos los pagos de pacientes
router.get('/pagos-pacientes', obtenerPagosPacientes);

// Agrega otras rutas según tus necesidades

module.exports = router;
