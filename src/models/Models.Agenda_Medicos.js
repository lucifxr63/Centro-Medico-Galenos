const mongoose = require('mongoose');

// Define el esquema de la agenda de un médico
const agendaMedicoSchema = new mongoose.Schema({
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico', // Referencia a la colección de médicos
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  horariosDisponibles: [
    {
      horaInicio: {
        type: String,
        required: true,
      },
      horaFin: {
        type: String,
        required: true,
      },
      disponible: {
        type: Boolean,
        default: true,
      },
    },
    // Agrega más objetos para otros horarios disponibles según sea necesario
  ],
});

// Crea el modelo basado en el esquema
const AgendaMedico = mongoose.model('Agenda_Medicos', agendaMedicoSchema);

module.exports = AgendaMedico;
