const {Router} = require('express');
const rutaLogin = Router();
const { check, } = require('express-validator');
const {crearCuenta, crearUsuario} = require('../controllers/Registro');
const { verificarCorreo } = require('../helpers/BDvalidations');
const { validarCampos } = require('../middlewares/validarCampos');

rutaLogin.get('/', crearCuenta )
rutaLogin.post('/',[
    check('nombre', 'El nombre es obligatorio. Debe contener mínimo 5 caracteres y máximo 50.').isLength({min: 5, max:50}),
    check('correo', 'El correo debe ser válido.').normalizeEmail().isEmail(),
    check('correo').custom(verificarCorreo),
    check('password', 'La contraseña es obligatoria. Debe tener entre 5 y 20 caracteres.').isLength({min: 5, max: 20}),
    check('confirmar', 'Confirmar contraseña es obligatorio.').isLength({min: 5, max: 20}),
    check('confirmar').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error("Las contraseñas no son iguales.")
        }
        return true;
    }),
    validarCampos
],crearUsuario)

module.exports = rutaLogin;
