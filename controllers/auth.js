const passport = require('passport');
const Usuario = require('../models/Usuarios');

const autenticarUsuario = passport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/inicio-sesion',
            failureFlash: true,
            badRequestMessage: 'Ambos campos son obligatorios.'
})


//cerrarSesion
const cerrarSesion = (req, res) => {
    req.logout()
    return res.redirect('/inicio-sesion');
}


//guardar el password reestablecido
const guardarPassword = async (req, res) => {
    const usuario = await Usuario.findOne({
        token: req.params.token,
        fechaExpira: {
            $gt : Date.now()
        }
    });

    if(!usuario){
        req.flash('error', 'Su token para reestablecer contraseña ya expiró o no es válido!');
        return res.redirect('/reestablecer-password');
    }

    //Resetenado datos
    usuario.password = req.body.password;
    usuario.token = undefined;
    usuario.fechaExpira = undefined;

    //Guardando nueva contraseña en la base de datos
    await usuario.save();
    req.flash('correcto', 'Su contraseña ha sido reestablecida con éxito!')
    res.redirect('/inicio-sesion');
}



module.exports = {
    autenticarUsuario,
    cerrarSesion,
    guardarPassword
}