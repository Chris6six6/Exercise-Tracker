const express = require('express');
const app = express();
const cors = require('cors');
const myApp = require('./myApp.js');
require('dotenv').config();

// Middleware para permitir solicitudes CORS (Cross-Origin Resource Sharing)
app.use(cors());
// Middleware para analizar cuerpos de solicitud en formato JSON
app.use(express.json());
// Middleware para analizar cuerpos de solicitud en formato 'application/x-www-form-urlencoded' - 'extended: true' permite estructuras de datos complejas
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Crear username
app.get('/api/users', myApp.mostrarUsuarios);
app.post('/api/users', myApp.crearUsuario);

// Agregar ejercicios
app.post('/api/users/:_id/exercises', myApp.agregarEjercicio);



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
