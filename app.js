const express = require('express')
const {conexion} = require('./src/database/database')
const cors = require("cors");
//Rutas
const dispo = require('./src/routers/Router.disponibilidad');
const especialidades = require('./src/routers/Router.especialidades');
const citas = require('./src/routers/Router.citas_medicas');
const agenda = require('./src/routers/Router.Agenda_Medicos');
const pagosComision = require('./src/routers/Router.pagos_comision');
const pagosPaciente = require('./src/routers/Router.Pago_paciente');

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const PUERTO = process.env.PORT || 3001;
const app = express()

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // form-urlencoded
//app.set('view engine', 'pug');

//middleware
app.use(express.json());

// routes
app.get('/',(req,res) =>{
    res.send('welcome to my api');
});

// API
const apidispo = dispo;
const apiespecs = especialidades;
const apicitas = citas;
const apiAgenda = agenda;
const apiPagoC = pagosComision;
const apiPagoP = pagosPaciente;

app.use('/api',apidispo);
app.use('/api',apiespecs)
app.use('/api',apicitas);
app.use('/api',apiAgenda);
app.use('/api',apiPagoC);
app.use('/api',apiPagoP);

app.listen(PUERTO,()=>{
    console.log(`el servidor esta escuchando en el puerto ${PUERTO}`);
});

