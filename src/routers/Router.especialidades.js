const express = require('express');
const  router = express.Router();
const {obtenerEspecialidadesMedicas} = require('../controllers/controller.especialidades');

//obtener todas las especialidades

router.get('/especialidades-medicas', obtenerEspecialidadesMedicas);

module.exports = router;