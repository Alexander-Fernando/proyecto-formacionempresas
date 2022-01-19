//Creación del Token en el modelo de Usuario
const crypto = require('crypto');
const Usuario = require('../models/Usuarios');
const enviarEmail = require('../helpers/envioEmail');

const generarToken = async (req, res) => {
    const verificarUsuario = await Usuario.findOne({correo: req.body.correo});

    if(!verificarUsuario){
        req.flash('error', 'No existe usuario con ese correo. Digite correctamente su correo.');
        return res.redirect('/reestablecer-password');
    }

    verificarUsuario.token = crypto.randomBytes(20).toString('hex');
    verificarUsuario.fechaExpira = Date.now() + 3600000;

    await verificarUsuario.save();

    const resetPasswordURL = `http://${req.headers.host}/reestablecer-password/${verificarUsuario.token}`;
    
    //Envío del email al usuario para reestablecer password
    await enviarEmail.enviar({
        usuario: verificarUsuario,
        subject: 'Reestablecimiento de contraseña en EmprendeSM!',
        resetUrl: resetPasswordURL,
        archivo: 'reset'
    })


    req.flash('correcto', 'Revise su correo para reestablecer su contraseña.')
    res.redirect('/inicio-sesion');
}

module.exports = {
    generarToken
}