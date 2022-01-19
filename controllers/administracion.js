const Usuario = require("../models/Usuarios");
const Servicio = require('../models/servicio');
const Producto = require('../models/producto');
const cloudinary = require('cloudinary').v2;
cloudinary.config = (process.env.CLOUDINARY_URL);


/* RENDERIZADO DE LAS VISTAS DEL PANEL DE ADMINISTRACIÓN */
const renderAdmin = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id)

    if(!usuario){
        return json({error: 'No se encontró al usuario con el id en la base de datos'});
    }

    const {nombre, imagen} = usuario;

    if(req.user._id != id){
        return res.redirect('/');
    }

    return res.render('panel-admin/panel-administracion', {
        NombrePagina: 'Panel Administración | EmprendeSM',
        cssAdmin: true,
        jsAdmin: true, 
        nombre, imagen, id
    })
}

const renderTablasProductos = async(req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id)
    if(!usuario){
        return res.redirect('/');
    }
    
    if(req.user._id != id){
        req.flash('error', 'No puede ingresar al panel de administración de otro usuario.')
        return res.redirect('/');
    }

    const {nombre, imagen} = usuario;
    const productos = await Producto.find({autor: id, estado: true}).lean();

    return res.render('panel-admin/tabla-productos', {
        NombrePagina: 'Panel Administración | EmprendeSM',
        cssAdmin: true,
        jsAdmin: true, 
        nombre, imagen, id, productos
    })
}

const renderEditarProducto = async (req, res,next) => {
    const productoEditar = await Producto.findOne({urlProduc: req.params.url, estado:true}).lean();
    const {id} = req.params;
    const usuario = await Usuario.findById(id)

    if(!usuario){
        next();
    }

    const {nombre, imagen} = usuario;

    if(!productoEditar){
        req.flash('error', 'No existe el producto a editar.');
        return next();
    }

    if(req.user._id != id){
        req.flash('error', 'No puede ingresar al panel de administración de otro usuario.')
        return res.redirect('/');
    }

    return res.render('panel-admin/editar-producto', {
        NombrePagina: 'Editar producto | EmprendeSM',
        productoEditar,
        id: req.user._id,
        cssAdmin: true,
        jsAdmin: true,
        nombre, imagen
    })

}

const renderEditarServicio = async (req, res,next) => {
    const servicioEditar = await Servicio.findOne({url: req.params.url}).lean();
    const {id} = req.params;
    const usuario = await Usuario.findById(id)
    if(!usuario){
        next();
    }

    const {nombre, imagen} = usuario;

    if(!servicioEditar){
        req.flash('error', 'No existe el servicio a editar.');
        return next();
    }

    if(req.user._id != id){
        req.flash('error', 'No puede ingresar al panel de administración de otro usuario.')
        return res.redirect('/');
    }

    return res.render('panel-admin/editar-servicio', {
        NombrePagina: 'Editar servicio | EmprendeSM',
        servicioEditar,
        id: req.user._id,
        cssAdmin: true,
        jsAdmin: true,
        nombre, imagen
    })

}

const renderEstadisticas = async(req,res) => {
    const {id} = req.params;

    const usuario = await Usuario.findById(id)

    if(!usuario){
        return json({error: 'No se encontró al usuario con el id en la base de datos'});
    }

    const {nombre, imagen} = usuario;

    if(req.user._id != id){
        return res.redirect('/');
    }

    return res.render('panel-admin/estadisticas', {
        NombrePagina: 'Panel Administración | EmprendeSM',
        cssAdmin: true,
        jsAdmin: true, 
        nombre, imagen, id
    })

}

const renderNuevoProducto = async(req,res) => {
    const {id} = req.params;

    const usuario = await Usuario.findById(id)

    if(!usuario){
        return json({error: 'No se encontró al usuario con el id en la base de datos'});
    }

    const {nombre, imagen} = usuario;

    if(req.user._id != id){
        return res.redirect('/');
    }

    return res.render('panel-admin/nuevo-producto', {
        NombrePagina: 'Panel Administración | EmprendeSM',
        cssAdmin: true,
        jsAdmin: true, 
        nombre, imagen, id
    })
}

const renderNuevoServicio = async(req,res) => {
    const {id} = req.params;

    const usuario = await Usuario.findById(id)

    if(!usuario){
        return json({error: 'No se encontró al usuario con el id en la base de datos'});
    }

    const {nombre, imagen} = usuario;

    if(req.user._id != id){
        return res.redirect('/');
    }

    return res.render('panel-admin/nuevo-servicio', {
        NombrePagina: 'Panel Administración | EmprendeSM',
        cssAdmin: true,
        jsAdmin: true, 
        nombre, imagen, id
    })
}

const renderTablasServicios = async(req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id)

    if(!usuario){
        return res.redirect('/');
    }

    if(req.user._id != id){
        req.flash('error', 'No puede ingresar al panel de otro usuario.');
        return res.redirect('/');
    }
    
    const {nombre, imagen} = usuario;
    const servicios = await Servicio.find({autor: id, estado: true}).lean();


    return res.render('panel-admin/tabla-servicios', {
        NombrePagina: 'Panel Administración | EmprendeSM',
        cssAdmin: true,
        jsAdmin: true, 
        nombre, imagen, id, servicios
    })

}

const agregarServicio = async (req, res) => {

    const {nombreSer, descripcion, lugarDel, lugarFijo, telContacto, precio} = req.body;

    const data = {
        nombreSer, descripcion, lugarDel, lugarFijo, telContacto, precio
    }

    const newServicio = new Servicio(data);

    /* SUBIR IMÁGENES PARA LOS SERVICIOS */
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imgServicio) {
        req.flash('error', 'Agregue una imagen a su servicio.')
        return res.redirect('back');
    }

    newServicio.fecha = Date();
    newServicio.autor = req.user._id;

    if(req.files){
        const {tempFilePath} = req.files.imgServicio;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        newServicio.imgServicio = secure_url;
    }
    
    await newServicio.save();

    req.flash('correcto', 'Servicio creado correctamente.')
    return res.redirect(`/servicios/${newServicio.url}`);
};

const agregarProducto = async (req, res) => {

    const {nombreProduc, descripcionProduc, especificaciones, lugarDelivery, ubicacion, precioProduc,teleContacto} = req.body;

    const data = {
        nombreProduc, descripcionProduc, especificaciones, lugarDelivery, ubicacion, precioProduc,teleContacto
    }

    const newProducto = new Producto(data);
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imgProducto) {
        req.flash('error', 'Agregue una imagen a su producto')
        return res.redirect('back');
    }
    
    newProducto.fechaCreacion = Date();
    newProducto.autor = req.user._id;

    if(req.files){
        const {tempFilePath} = req.files.imgProducto;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        newProducto.imgProducto = secure_url;
    }
    
    await newProducto.save();

    req.flash('correcto','Producto creado correctamente.')
    return res.redirect(`/productos/${newProducto.urlProduc}`);
};

const editarProducto = async (req, res, next) => {
    const productoActualizado = req.body;
    const productoDB = await Producto.findOne({urlProduc: req.params.url});

    if(req.files){
        if(productoDB.imgProducto){
            const nombreArr = productoDB.imgProducto.split('/');
            const idImagenCloudinary = nombreArr[nombreArr.length-1];
            const [public_id] = idImagenCloudinary.split('.');
            cloudinary.uploader.destroy(public_id);
        }

        const {tempFilePath} = req.files.imgProducto;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        productoActualizado.imgProducto = secure_url;
    }

    await Producto.findOneAndUpdate({urlProduc: req.params.url}, productoActualizado,{
        new: true,
        runValidators: true
    } )

    req.flash('correcto', 'Producto actualizado correctamente.')
    res.redirect(`/admin/${req.user._id}/mis-productos`)
}

const editarServicio = async (req, res, next) => {
    const servicioActualizado = req.body;
    const servicioDB = await Servicio.findOne({url: req.params.url});

    if(req.files){
        if(servicioDB.imgServicio){
            const nombreArr = servicioDB.imgServicio.split('/');
            const idImagenCloudinary = nombreArr[nombreArr.length-1];
            const [public_id] = idImagenCloudinary.split('.');
            cloudinary.uploader.destroy(public_id);
        }

        const {tempFilePath} = req.files.imgServicio;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        servicioActualizado.imgServicio = secure_url;
    }


    await Servicio.findOneAndUpdate({url: req.params.url}, servicioActualizado, {
        new: true,
        runValidators: true
    })    

    req.flash('correcto', 'Servicio actualizado correctamente.')
    return res.redirect(`/admin/${req.user._id}/mis-servicios`)
};

const eliminarProducto =  async (req, res) => {
    const {url} = req.params;
    await Producto.findOneAndUpdate({urlProduc: url}, {estado: false},{
        new: true,
        runValidators: true
    });
    
    req.flash('correcto', 'Producto eliminado correctamente');
    return res.redirect(`/admin/${req.user._id}/mis-productos`);
}

const eliminarServicio = async (req, res) => {
    const {url} = req.params;
    await Servicio.findOneAndUpdate({url}, {estado: false},{
        new: true,
        runValidators: true
    });
    req.flash('correcto', 'Servicio eliminado correctamente');
    return res.redirect(`/admin/${req.user._id}/mis-servicios`);
}

module.exports = {
    eliminarProducto,
    eliminarServicio,
    renderAdmin,
    agregarServicio,
    agregarProducto,
    renderTablasProductos,
    renderEstadisticas,
    renderNuevoProducto,
    renderNuevoServicio,
    renderTablasServicios,
    renderEditarProducto,
    editarServicio,
    editarProducto,
    renderEditarServicio
};