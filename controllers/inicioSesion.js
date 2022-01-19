//CONTROLADOR PARA RENDERIZAR LOS FORMULARIOS
const formInicioSesion = (req, res) => {
    res.render('inicio-sesion',{
       NombrePagina: 'Inicio Sesión | EmprendeSM',
       css: true
    })
}

const formReestablecerPassword = (req, res) => {
    res.render('reestablecer-password', {
        NombrePagina: 'Olvidé mi contraseña',
        css: true
    })
}

module.exports = {
    formInicioSesion,
    formReestablecerPassword
}