const mongoose = require('mongoose');
const Especialidad = require('../models/Models.especialidad'); // Reemplaza con la ubicación correcta de tu modelo

// Controlador para obtener todas las especialidades médicas
const obtenerEspecialidadesMedicas = async (req, res) => {
  try {
    const especialidades = await Especialidad.find();
    res.status(200).json(especialidades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  obtenerEspecialidadesMedicas,
};
