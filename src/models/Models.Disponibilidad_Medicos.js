const mongoose = require('mongoose');

const agendaMedicoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  diaSemana: {
    type: String,
    required: true,
  },
  horasDisponibles: [
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
  ],
  medicoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico', // Referencia a la colección de médicos
    required: true,
  },
  feriado: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('disponibilidad_medicos', agendaMedicoSchema);
