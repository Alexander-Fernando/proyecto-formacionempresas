const Producto = require('../models/producto');
const Usuario = require('../models/Usuarios');

const renderProducto = async (req, res, next) => {

    const producto = await Producto.findOne({urlProduc: req.params.url, estado:true}).lean()
    
    const autorProducto = await Usuario.findById(producto.autor);

    if(!producto){
        return next();
    }

    return res.render('producto-perfil', {
        NombrePagina: 'Producto | EmprendeSM', 
        cssProducto: true,
        jsProducto: true,
        producto,
        nombreAutor: autorProducto.nombre,
        autorProducto
    })
}

const mostrarProductos = async (req, res, next) => {

        const productosTotal = await Producto.find({estado: true}).lean();

        if(!productosTotal) return next();
        return res.render('productos', {
            NombrePagina: 'Productos | EmprendeSM',
            cssTodoProductos: true,
            productosTotal,
            carritoJS: true
    })
};


module.exports = {
    renderProducto,
    mostrarProductos,
}