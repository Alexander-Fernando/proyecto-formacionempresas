const Servicio = require('../models/servicio');
const Usuario = require('../models/Usuarios');

const renderServicio = async (req, res, next) => {
    const servicio = await Servicio.findOne({url: req.params.url, estado:true}).lean();
    const autorServicio = await Usuario.findById(servicio.autor);

    if(!servicio){
        return next();
    }

    return res.render('servicio-perfil', {
        NombrePagina: `Servicio | EmprendeSM`, 
        cssProducto: true,
        jsProducto: true,
        servicio,
        nombreAutor: autorServicio.nombre,
        idAutor: autorServicio._id
    })
}


const mostrarServicios = async (req, res, next) => {
    const serviciosTotal = await Servicio.find({estado:true}).lean();
    if(!serviciosTotal) return next();
    return res.render('servicios', {
        NombrePagina: 'Servicios | EmprendeSM',
        cssTodoProductos: true,
        serviciosTotal
    })
};

module.exports = {
    renderServicio,
    mostrarServicios
}