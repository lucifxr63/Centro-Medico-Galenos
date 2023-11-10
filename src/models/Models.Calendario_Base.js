const mongoose = require('mongoose');

// Define el esquema de días de atención y feriados
const diasAtencionFeriadosSchema = new mongoose.Schema({
  diasAtencion: [
    {
      diaSemana: {
        type: String,
        required: true,
      },
      horarios: [
        {
          horaInicio: {
            type: String,
            required: true,
          },
          horaFin: {
            type: String,
            required: true,
          },
        },
        // Agrega más objetos para otros horarios según sea necesario
      ],
    },
    // Agrega más objetos para otros días de atención según sea necesario
  ],
  feriados: [
    {
      nombre: {
        type: String,
        required: true,
      },
      fecha: {
        type: Date,
        required: true,
      },
    },
    // Agrega más objetos para otras fechas de feriados según sea necesario
  ],
});

// Crea el modelo basado en el esquema
const DiasAtencionFeriados = mongoose.model('DiasAtencionFeriados', diasAtencionFeriadosSchema);

module.exports = DiasAtencionFeriados;
