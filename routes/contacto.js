const { Router } = require('express');
const { check } = require('express-validator');
const { renderContacto, enviarCorreoContacto } = require('../controllers/contacto');
const {validarFormularioContacto } = require('../middlewares/validarCampos');
const rutaContacto =  Router();

rutaContacto.get('/', renderContacto);
rutaContacto.post('/',[
    check('nombreCorreo', 'El nombre es obligatorio.').notEmpty(),
    check('asuntoCorreo', 'El asunto es obligatorio').notEmpty(),
    check('correoContacto', 'Ingrese un correo válido.').isEmail(),
    check('mensajeCorreo', 'Ingrese un mensaje. Debe contener entre 10 y 100 caracteres.').isLength({min: 10, max: 100}),
    validarFormularioContacto
] ,enviarCorreoContacto);


module.exports =  rutaContacto;
