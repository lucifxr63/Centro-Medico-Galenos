const mongoose = require('mongoose');
const moment = require('moment');
const CalendarioBase = require('../models/Models.Disponibilidad_Medicos'); // Asegúrate de que la ruta es correcta

// Controlador para crear el calendario base
const crearCalendario = async (req, res) => {
  const medicoId = req.body.medicoId; // Asegúrate de obtener el ID del médico de la solicitud
  const horasDisponibles = [
    {
      "horaInicio": "09:00 AM",
      "horaFin": "10:00 AM",
      "disponible": true
    },
    {
      "horaInicio": "10:30 AM",
      "horaFin": "11:30 AM",
      "disponible": true
    },
    {
      "horaInicio": "12:00 PM",
      "horaFin": "01:00 PM",
      "disponible": true
    },
    {
      "horaInicio": "03:00 PM",
      "horaFin": "04:00 PM",
      "disponible": true
    },
    {
      "horaInicio": "04:30 PM",
      "horaFin": "05:30 PM",
      "disponible": true
    }
  ]

  // Establece las fechas de inicio y fin
  const fechaInicio = moment(req.body.fechaInicio);
  const fechaFin = moment(req.body.fechaInicio);

  try {
    while (fechaInicio.isSameOrBefore(fechaFin)) {
      const diaSemana = fechaInicio.format('dddd');
      const fecha = fechaInicio.format('YYYY-MM-DD');

      // ...

      // Crea el objeto con los datos del calendario
      const calendarioBase = new CalendarioBase({
        fecha,
        diaSemana,
        horasDisponibles, // Asegúrate de tener esta información, podría ser un array
        medicoId: new mongoose.Types.ObjectId(medicoId), // Usa 'new' para crear el ObjectId
        feriado: false
      });

      // ...

      // Guarda el registro en la base de datos
      await calendarioBase.save();

      // Avanza al siguiente día
      fechaInicio.add(1, 'day');
    }

    res.status(201).send('Calendario creado con éxito.');
  } catch (error) {
    res.status(500).send('Error al crear el calendario: ' + error.message);
  }
};

module.exports = {
  crearCalendario
};
