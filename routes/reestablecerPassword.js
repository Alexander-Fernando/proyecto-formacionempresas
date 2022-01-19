const { Router} = require('express');
const { guardarPassword } = require('../controllers/auth');
const { formReestablecerPassword } = require('../controllers/inicioSesion');
const { generarToken } = require('../helpers/tokenEmail');
const validarToken = require('../helpers/validarToken');
const RSruta = Router();

RSruta.get('/',  formReestablecerPassword)
RSruta.post('/', generarToken)
RSruta.get('/:token', validarToken)
RSruta.post('/:token', guardarPassword)

module.exports = RSruta;