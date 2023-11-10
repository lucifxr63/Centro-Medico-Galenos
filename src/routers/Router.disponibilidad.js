const express = require('express');
const router = express.Router();
const {crearCalendario} = require('../controllers/controller.disponibilidad'); // Asegúrate de que la ruta es correcta

router.post('/crearCalendario', crearCalendario);

module.exports = router;
