const AgendaMedico = require('../models/Models.Agenda_Medicos');


const crearAgendaMedico = async (req, res) => {
  try {
    const { medico, fecha, horariosDisponibles } = req.body;

    // Crea una nueva instancia de AgendaMedico con los datos proporcionados
    const nuevaAgendaMedico = new AgendaMedico({
      medico,
      fecha,
      horariosDisponibles,
    });

    // Guarda la nueva agenda de médico en la base de datos
    const agendaMedicoGuardada = await nuevaAgendaMedico.save();

    res.status(201).json(agendaMedicoGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const obtenerAgendasMedicos = async (req, res) => {
  try {
    const agendasMedicos = await AgendaMedico.find();
    res.status(200).json(agendasMedicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Controlador para agregar un evento especial (seminario) a la agenda de un médico
const agregarEventoEspecial = async (req, res) => {
  try {
    // Lógica para agregar un evento especial a la agenda del médico
    // ...

    res.status(201).json(agendaMedico);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para eliminar una disponibilidad programada en la agenda de un médico
const eliminarDisponibilidad = async (req, res) => {
  try {
    // Lógica para eliminar una disponibilidad programada
    // ...

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  crearAgendaMedico,
  obtenerAgendasMedicos,
  eliminarDisponibilidad,
  agregarEventoEspecial
};