const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Lista de especialidades médicas
const especialidadesMedicas = [
  'Cardiología',
  'Dermatología',
  'Gastroenterología',
  'Neumología',
  'Neurología',
  'Cirugía General',
  'Cirugía Ortopédica',
  'Cirugía Plástica',
  'Obstetricia y Ginecología',
  'Oftalmología',
  'Otorrinolaringología',
  'Urología',
  'Pediatría',
  'Endocrinología',
  'Psiquiatría',
  'Medicina Interna',
  'Radiología',
  'Anestesiología',
  'Oncología',
  'Medicina Familiar'
];

const userSchema = new Schema({
  // Otros campos...

  especialidadMedica: {
    type: String,
    enum: especialidadesMedicas, // Usar el arreglo de especialidades médicas como enum
    required: true
  },

  // Otros campos específicos de cada rol...
});

// Creación del modelo de usuario
const User = mongoose.model('especialidades', userSchema);

module.exports = User;