const { Router } = require('express');
const { autenticarUsuario } = require('../controllers/auth');
const { formInicioSesion } = require('../controllers/inicioSesion');
const inicioSesionRuta = Router();

inicioSesionRuta.get('/', formInicioSesion)
inicioSesionRuta.post('/',autenticarUsuario)
module.exports = inicioSesionRuta;