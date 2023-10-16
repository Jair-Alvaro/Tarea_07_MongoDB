const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://0.0.0.0:27017/videojuegosDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected!');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

const juegoSchema = new mongoose.Schema({
    titulo: String,
    desarrollador: String,
    plataforma: String,
    imagenUrl: String
  });
  
  const Juego = mongoose.model('Juego', juegoSchema);
  
  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.get('/ingresar', (req, res) => {
    res.render('ingresar');
  });
  
  app.post('/ingresar', (req, res) => {
    const { titulo, desarrollador, plataforma, imagenUrl } = req.body;
    const nuevoJuego = new Juego({
      titulo: titulo,
      desarrollador: desarrollador,
      plataforma: plataforma, 
      imagenUrl: imagenUrl
    });
  
    nuevoJuego.save();
    res.redirect('/mostrar');
  });
  
  app.get('/mostrar', (req, res) => {
    Juego.find({})
      .then(juegos => {
        res.render('mostrar', { juegos: juegos });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Error interno del servidor');
      });
  });
  
  app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000/');
  });