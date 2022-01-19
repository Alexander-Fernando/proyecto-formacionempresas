const Usuario = require("../models/Usuarios")

//Renderizado del formulario del registro
const crearCuenta = (req, res) => {
    res.render('registro',{
        NombrePagina: 'Crear cuenta | EmprendeSM',
        css: true
    })
}


//controlador para crear usuario en la base de datos
const crearUsuario = async (req, res) => {
    const usuario = new Usuario(req.body)
    if(usuario.correo.includes('@unmsm.edu.pe')){
        usuario.rol = 'admin'
    }
    
    try {
        await usuario.save();
        res.redirect('/inicio-sesion')
    } catch (error) {
        req.flash('error', error);
        res.redirect('/registrarse')
    }
}

module.exports = {
    crearCuenta,
    crearUsuario
}