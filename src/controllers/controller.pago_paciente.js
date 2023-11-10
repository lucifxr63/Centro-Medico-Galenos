// Importa el modelo de PagoPaciente que creamos previamente
const PagoPaciente = require('../models/Models.Pago');

// Controlador para crear un nuevo pago de paciente
const crearPagoPaciente = async (req, res) => {
  try {
    const {
      paciente,
      metodoPago,
      monto,
      detallesPago,
      fechaPago,
    } = req.body;

    // Crea una nueva instancia de PagoPaciente con los datos proporcionados
    const nuevoPagoPaciente = new PagoPaciente({
      paciente,
      metodoPago,
      monto,
      detallesPago,
      fechaPago,
    });

    // Guarda el nuevo pago de paciente en la base de datos
    const pagoPacienteGuardado = await nuevoPagoPaciente.save();

    res.status(201).json(pagoPacienteGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para obtener todos los pagos de pacientes
const obtenerPagosPacientes = async (req, res) => {
  try {
    const pagosPacientes = await PagoPaciente.find();
    res.status(200).json(pagosPacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Agrega otros controladores según tus necesidades, como obtener un pago por ID, actualizar un pago, etc.

module.exports = {
  crearPagoPaciente,
  obtenerPagosPacientes,
  // Agrega otros controladores aquí si es necesario
};
