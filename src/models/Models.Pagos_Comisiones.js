const mongoose = require('mongoose');

// Define el esquema de pago de comisión de médicos
const pagoComisionSchema = new mongoose.Schema({
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico', // Referencia a la colección de médicos
    required: true,
  },
  monto: {
    type: Number,
    required: true,
  },
  metodoPago: {
    type: String,
    required: true,
  },
  fechaPago: {
    type: Date,
    required: true,
  },
});

// Crea el modelo basado en el esquema
const PagoComision = mongoose.model('Pago_Comision', pagoComisionSchema);

module.exports = PagoComision;
