const mongoose = require('mongoose');

// Define el esquema de las citas médicas
const citaMedicaSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente', // Referencia a la colección de pacientes
    required: true,
  },
  centroMedico: {
    type: String,
    required: true,
  },
  especialidad: {
    type: String,
    required: true,
  },
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico', // Referencia a la colección de médicos
    required: true,
  },
  fechaHora: {
    type: Date,
    required: true,
  },
  confirmada: {
    type: Boolean,
    default: false,
  },
  horaTomada: {
    type: Date,
  },
  correoConfirmacionEnviado: {
    type: Boolean,
    default: false,
  },
  correoElectronico: {
    type: String, // Campo para el correo electrónico del paciente
  },
});

// Crea el modelo basado en el esquema
const CitaMedica = mongoose.model('Cita_Medica', citaMedicaSchema);

module.exports = CitaMedica;
