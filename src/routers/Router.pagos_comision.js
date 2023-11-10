const express = require('express');
const router = express.Router();
const {
  crearPagoComision,
  obtenerPagosComisiones,
  obtenerPagoComisionPorID,
  eliminarPagoComisionPorID,
  generarInformeGeneral,
  generarInformePorMedico,
  emitirComprobante,
  registrarPagoComision
} = require('../controllers/controller.pagos_comision');

// Ruta para crear un nuevo registro de pago de comisión
router.post('/pagos-comision', crearPagoComision);

// Ruta para obtener todos los registros de pagos de comisiones
router.get('/pagos-comision', obtenerPagosComisiones);

// Ruta para obtener un registro de pago de comisión por ID
router.get('/pagos-comision/:id', obtenerPagoComisionPorID);

// Ruta para eliminar un registro de pago de comisión por ID
router.delete('/pagos-comision/:id', eliminarPagoComisionPorID);

// Ruta para generar un informe general de recaudación
router.get('/informe-general', generarInformeGeneral);

// Ruta para generar un informe individualizado de recaudación por médico
router.get('/informe-por-medico', generarInformePorMedico);

// Ruta para emitir un comprobante de comisión
router.post('/emitir-comprobante', emitirComprobante);

// Ruta para registrar un pago de comisión
router.post('/pagos-comision', registrarPagoComision);

module.exports = router;
