//Middleware para verificar la auntenticación del usuario
const verificarLogin = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
 
    res.redirect('/inicio-sesion')
}

const verificarAdmin = (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.rol === 'admin'){
            return next()
        }
    }

    /* MIDDLEWARE PARA EL RENDERIZADO DE LA VISTA HOME ADMIN */
    res.render('home', {
        NombrePagina: 'EmprendeSM | Inicio',
        tagLine: 'Página para el usuario con rango normal',
        barra: true,
        boton: false,
        cerrarSesion: true,
        nombre: req.user.nombre,
        menu: true,
        css: true,
        id: req.user._id
    })
}


module.exports = {
    verificarLogin,
    verificarAdmin //BORRAR LUEGO
}

