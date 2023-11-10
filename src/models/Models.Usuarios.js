const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true
  },
  fechaNacimiento: Date,
  genero: String,
  direccion: String,
  telefono: String,
  correoElectronico: {
    type: String,
    required: true
  },
  contrasena: {
    type: String,
    required: true
  },
  salt: String,
  locked: Boolean,
  loginAttempts: Number,
  rol: {
    type: String,
    enum: ['paciente', 'medico', 'secretaria'],
    required: true
  },
  // Campos adicionales específicos de cada rol
  especialidadMedica: String, // Solo para médicos
  horarioTrabajo: String, // Solo para médicos
  calendarioDisponibilidad: Object, // Solo para médicos
  funciones: String, // Solo para secretarias
  registroTransacciones: Object, // Solo para secretarias
  historialMedico: String // Solo para pacientes
});

// Creación del modelo de usuario
const User = mongoose.model('Usuario', userSchema);

module.exports = User;