const PagoComision = require('../models/Models.Pagos_Comisiones'); // Importa el modelo de PagoComision

// Controlador para crear un nuevo registro de pago de comisión
const crearPagoComision = async (req, res) => {
    try {
        const { medico, monto, metodoPago, fechaPago } = req.body;

        // Crea una nueva instancia de PagoComision con los datos proporcionados
        const nuevoPagoComision = new PagoComision({
            medico,
            monto,
            metodoPago,
            fechaPago,
        });

        // Guarda el nuevo registro de pago de comisión en la base de datos
        const pagoComisionGuardado = await nuevoPagoComision.save();

        res.status(201).json(pagoComisionGuardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controlador para obtener todos los registros de pagos de comisiones
const obtenerPagosComisiones = async (req, res) => {
    try {
        const pagosComisiones = await PagoComision.find();
        res.status(200).json(pagosComisiones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener un registro de pago de comisión por ID
const obtenerPagoComisionPorID = async (req, res) => {
    try {
        const pagoComision = await PagoComision.findById(req.params.id);
        if (!pagoComision) {
            return res.status(404).json({ mensaje: 'Registro de pago de comisión no encontrado' });
        }
        res.status(200).json(pagoComision);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para eliminar un registro de pago de comisión por ID
const eliminarPagoComisionPorID = async (req, res) => {
    try {
        const pagoComision = await PagoComision.findByIdAndDelete(req.params.id);
        if (!pagoComision) {
            return res.status(404).json({ mensaje: 'Registro de pago de comisión no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Controlador para generar un informe general de recaudación
const generarInformeGeneral = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;

        // Consulta los pagos de comisiones dentro del rango de fechas especificado
        const informeGeneral = await PagoComision.find({
            fechaPago: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin),
            },
        });

        res.status(200).json(informeGeneral);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para generar un informe individualizado de recaudación por médico
const generarInformePorMedico = async (req, res) => {
    try {
        const { medicoId, fechaInicio, fechaFin } = req.query;

        // Consulta los pagos de comisiones para un médico específico dentro del rango de fechas especificado
        const informePorMedico = await PagoComision.find({
            medico: medicoId,
            fechaPago: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin),
            },
        });

        res.status(200).json(informePorMedico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para emitir un comprobante de comisión para un médico
const emitirComprobante = async (req, res) => {
    try {
        const { medicoId, monto, metodoPago } = req.body;

        // Crea una nueva instancia de PagoComision con los datos proporcionados
        const nuevoPagoComision = new PagoComision({
            medico: medicoId,
            monto,
            metodoPago,
            fechaPago: new Date(),
        });

        // Guarda el nuevo pago de comisión en la base de datos
        const pagoComisionGuardado = await nuevoPagoComision.save();

        res.status(201).json(pagoComisionGuardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controlador para registrar el pago de comisión a un médico
const registrarPagoComision = async (req, res) => {
    try {
        const { medico, monto, metodoPago, fechaPago } = req.body;

        // Crea una nueva instancia de PagoComision con los datos proporcionados
        const nuevoPagoComision = new PagoComision({
            medico,
            monto,
            metodoPago,
            fechaPago,
        });

        // Guarda el registro del pago de comisión en la base de datos
        const pagoComisionGuardado = await nuevoPagoComision.save();

        res.status(201).json(pagoComisionGuardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    crearPagoComision,
    obtenerPagosComisiones,
    obtenerPagoComisionPorID,
    eliminarPagoComisionPorID,
    generarInformeGeneral,
    generarInformePorMedico,
    emitirComprobante,
    registrarPagoComision
};
