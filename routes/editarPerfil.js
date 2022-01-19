const { Router } = require('express');
const { check } = require('express-validator');
const { vistaEditarPerfil, actualizarPerfil } = require('../controllers/editarPerfil');
const { verificarLogin, verificarAdmin } = require('../middlewares/login');
const { validarCampos, validarCampos2 } = require('../middlewares/validarCampos');
const editRuta = Router();


editRuta.get('/:id',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,vistaEditarPerfil)


editRuta.post('/:id',[
    check('carrera', 'La carrera es obligatoria').notEmpty(),
    check('telefonomovil', 'El teléfono movil debe tener 9 dígitos.').isLength({min: 9, max:9}),
    check('telefonofijo', 'El teléfono fijo debe tener 6 o 7 dígitos.').isLength({min:6, max:7}),
    check('direccion', 'La dirección es obligatoria.').notEmpty(),
    validarCampos2
],actualizarPerfil)

module.exports = editRuta