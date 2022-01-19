const Usuario = require("../models/Usuarios");

const validarToken = async (req,res) => {
    const usuario = await Usuario.findOne({
        token: req.params.token,
        fechaExpira: {
            $gt : Date.now()
        }
    });

    if(!usuario){
        req.flash('error', 'Su token para reestablecer contraseña ya expiró o no es válido.');
        return res.redirect('/reestablecer-password');
    }

    res.render('nuevo-password',{
        NombrePagina: 'Nueva contraseña| EmprendeSM',
        css:true
    })
}

module.exports = validarToken;