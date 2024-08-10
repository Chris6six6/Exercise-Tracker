require('dotenv').config({ path: 'sample.env' });
const mongoose = require('mongoose');

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Modelos

// Modelo User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Modelo Exercise
const exerciseSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // Valor por defecto
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

// Modelo Log
const logSchema = new mongoose.Schema({
  username: { type: String, required: true },
  count: { type: Number, required: true },
  _id: { type: String, required: true },
  log: [{
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
  }]
});
const Log = mongoose.model('Log', logSchema);

// Controladores

// Crear usuario
const crearUsuario = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.json({ "username": user.username, "_id": user._id });
  } catch (error) {
    res.status(400).json({ error: 'Invalid username' });
  }
}

// Mostrar usuarios
const mostrarUsuarios = async (req, res) => {
  try {
    const allUsers = await User.find(); // Encuentra todos los usuarios
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving users' });
  }
}

// Agregar ejercicio
const agregarEjercicio = async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Crear un nuevo ejercicio con los datos del request
    const nuevoEjercicio = new Exercise({
      user_id: user._id,
      description,
      duration: parseInt(duration), // Asegúrate de que la duración sea un número
      date: date ? new Date(date) : new Date(), // Convertir la fecha a objeto Date
    });

    // Guardar el ejercicio en la base de datos
    const ejercicio = await nuevoEjercicio.save();

    // Responder con los datos del ejercicio creado
    res.json({
      _id: user._id,
      username: user.username,
      date: ejercicio.date.toDateString(), // Formatea la fecha
      duration: ejercicio.duration,
      description: ejercicio.description,
    });

  } catch (error) {
    console.error('Error al agregar ejercicio:', error); // Depuración
    res.status(500).json({ error: 'Error al agregar ejercicio' });
  }
};



module.exports = {
  crearUsuario,
  mostrarUsuarios,
  agregarEjercicio
};
