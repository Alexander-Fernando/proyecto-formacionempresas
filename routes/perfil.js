const {Router} = require('express');
const { renderPerfil } = require('../controllers/perfil');
const { verificarLogin, verificarAdmin } = require('../middlewares/login');
const { validarCampos } = require('../middlewares/validarCampos');
const rutaPerfil = Router();


//Mostramos un perfil de usuario a través de su id(único)

rutaPerfil.get('/:id',[
    verificarLogin,
    verificarAdmin,
    validarCampos
],renderPerfil);


module.exports = rutaPerfil;