const Usuario = require('../models/Usuarios');


const verificarCorreo = async (correo = "") => {
    const usuarioEncontrado =  await Usuario.findOne({correo});

    if(usuarioEncontrado){
        throw new Error('El correo ya se encuentra registrado. Intente con otro.')
    }
};

module.exports = {
    verificarCorreo
}