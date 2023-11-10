const citaMedicaSchema = require('../models/Models.Citas_Medicas');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cron = require('node-cron');
// Envía el correo de confirmación al paciente
const transporter = nodemailer.createTransport({
    // Configura el transporte de correo (puedes usar Gmail u otro servicio)
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});


// Controlador para enviar correos de recordatorio
const enviarCorreosDeRecordatorio = async () => {
    try {
      // Obtén la fecha de mañana
      const fechaManana = new Date();
      fechaManana.setDate(fechaManana.getDate() + 1);
  
      // Consulta todas las citas médicas programadas para mañana
      const citasManana = await CitaMedica.find({ fechaHora: fechaManana });
  
      // Itera sobre las citas y envía correos de recordatorio
      citasManana.forEach(async (cita) => {
        const { paciente, centroMedico, especialidad, medico, fechaHora, correoElectronico } = cita;
  
        // Crea el contenido del correo de recordatorio
        const correoOptions = {
          from: 'tu_correo@gmail.com',
          to: correoElectronico,
          subject: 'Recordatorio de Cita Médica',
          html: `<p>Recuerda que tienes una cita médica programada para mañana:</p>
                 <p>Centro Médico: ${centroMedico}</p>
                 <p>Especialidad: ${especialidad}</p>
                 <p>Médico: ${medico}</p>
                 <p>Fecha y Hora: ${fechaHora}</p>
                 <p>Por favor, llega puntual y preparado. ¡Te esperamos!</p>`,
        };
  
        // Envía el correo de recordatorio
        await transporter.sendMail(correoOptions);
  
        // Marca la cita como confirmada y establece la hora de atención
        cita.confirmada = true;
        cita.horaTomada = new Date();
        await cita.save();
      });
  
      console.log('Correos de recordatorio enviados con éxito');
    } catch (error) {
      console.error('Error al enviar los correos de recordatorio', error);
    }
  };
  
  // Programa la tarea para que se ejecute todos los días a las 9:00 AM
  cron.schedule('0 9 * * *', () => {
    enviarCorreosDeRecordatorio();
  });

// Controlador para crear una nueva cita médica
const crearCitaMedica = async (req, res) => {
    try {
        const {
            paciente,
            centroMedico,
            especialidad,
            medico,
            fechaHora,
            correoElectronico,
        } = req.body;

        // Crea una nueva instancia de CitaMedica con los datos proporcionados
        const nuevaCitaMedica = new CitaMedica({
            paciente,
            centroMedico,
            especialidad,
            medico,
            fechaHora,
            confirmada: false, // La cita no está confirmada al principio
            correoElectronico,
        });


        // Guarda la nueva cita médica en la base de datos
        const citaMedicaGuardada = await nuevaCitaMedica.save();


        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: correoElectronico,
            subject: 'Confirmación de Cita Médica',
            text: `Estimado paciente, su cita médica para el ${fechaHora} en ${centroMedico} con el médico ${medico} ha sido registrada. Por favor, confirme su cita.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo de confirmación enviado: ' + info.response);
            }
        });

        res.status(201).json(citaMedicaGuardada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controlador para obtener todas las citas médicas disponibles
const obtenerCitasMedicasDisponibles = async (req, res) => {
    try {
        const citasMedicasDisponibles = await CitaMedica.find({
            confirmada: false,
        });
        res.status(200).json(citasMedicasDisponibles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controlador para anular una cita médica por ID
const anularCitaMedica = async (req, res) => {
    try {
        const citaId = req.params.id;

        // Buscar la cita médica por su ID
        const citaMedica = await CitaMedica.findById(citaId);

        if (!citaMedica) {
            return res.status(404).json({ mensaje: 'Cita médica no encontrada' });
        }

        // Verificar si la cita médica ya está confirmada o si ya pasó la fecha/hora
        if (citaMedica.confirmada || citaMedica.fechaHora <= new Date()) {
            return res.status(400).json({ mensaje: 'No es posible anular esta cita médica' });
        }

        // Anular la cita médica y guardar la hora de anulación
        citaMedica.confirmada = false;
        citaMedica.horaTomada = new Date();
        citaMedica.correoConfirmacionEnviado = false;

        await citaMedica.save();

        res.status(200).json({ mensaje: 'Cita médica anulada con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener todas las citas médicas anuladas
const obtenerCitasAnuladas = async (req, res) => {
    try {
        // Buscar todas las citas médicas anuladas (confirmada: false)
        const citasAnuladas = await CitaMedica.find({ confirmada: false });

        res.status(200).json(citasAnuladas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para obtener una cita médica anulada por ID
const obtenerCitaAnuladaPorId = async (req, res) => {
    try {
        const citaId = req.params.id;

        // Buscar la cita médica anulada por su ID
        const citaAnulada = await CitaMedica.findOne({ _id: citaId, confirmada: false });

        if (!citaAnulada) {
            return res.status(404).json({ mensaje: 'Cita médica anulada no encontrada' });
        }

        res.status(200).json(citaAnulada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Controlador para obtener la lista de pacientes en espera
const consultarPacientesEnEspera = async (req, res) => {
    try {
        // Consulta todas las citas médicas no confirmadas
        const pacientesEnEspera = await CitaMedica.find({ confirmada: false })
            .populate('paciente') // Rellena la información del paciente
            .populate('medico'); // Rellena la información del médico

        res.status(200).json(pacientesEnEspera);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controlador para marcar a un paciente como atendido
const marcarPacienteAtendido = async (req, res) => {
    try {
        const { citaId } = req.params;

        // Busca la cita médica por su ID
        const citaMedica = await CitaMedica.findById(citaId);

        if (!citaMedica) {
            return res.status(404).json({ mensaje: 'Cita médica no encontrada' });
        }

        // Marca la cita como confirmada y establece la hora de atención
        citaMedica.confirmada = true;
        citaMedica.horaTomada = new Date();

        // Guarda la cita médica actualizada en la base de datos
        await citaMedica.save();

        res.status(200).json({ mensaje: 'Paciente marcado como atendido con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Exportar los controladores
module.exports = {
    crearCitaMedica,
    obtenerCitasMedicasDisponibles,
    anularCitaMedica,
    obtenerCitasAnuladas,
    obtenerCitaAnuladaPorId,
    consultarPacientesEnEspera,
    marcarPacienteAtendido,
    enviarCorreosDeRecordatorio
};