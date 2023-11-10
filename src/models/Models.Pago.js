const mongoose = require('mongoose');

// Define el esquema de pagos de pacientes
const pagoPacienteSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente', // Referencia a la colección de pacientes
    required: true,
  },
  metodoPago: {
    type: String,
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  detallesPago: {
    type: String,
    required: true,
  },
  fechaPago: {
    type: Date,
    required: true,
  },
});

// Crea el modelo basado en el esquema
const PagoPaciente = mongoose.model('Pago_Paciente', pagoPacienteSchema);

module.exports = PagoPaciente;
