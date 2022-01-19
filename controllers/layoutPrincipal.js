//RENDERIZADO DEL LAYOUT PRINCIPAL
const layout = async (req, res) => {

    const id = req.user._id;
    

    req.session.carrito = "Mi carrito de comrpas";

    return res.render('home', {
        NombrePagina: 'EmprendeSM  | Inicio',
        tagLine: 'Ofrece tus productos o servicios.',
        barra: true,
        boton: true,
        cerrarSesion: true,
        administrador: true,
        nombre: req.user.nombre,
        menu: true,
        css: true,
        id
    })
}

module.exports = {
    layout
}