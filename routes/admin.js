const {Router } = require('express');
const rutaAdmin = Router();
const {renderAdmin, agregarServicio, agregarProducto, renderTablasServicios, renderTablasProductos, renderEstadisticas, renderNuevoProducto, renderNuevoServicio, renderEditarProducto, editarProducto, renderEditarServicio, editarServicio, eliminarProducto, eliminarServicio} = require('../controllers/administracion');
const { verificarLogin, verificarAdmin } = require('../middlewares/login')
const { validarCampos } = require('../middlewares/validarCampos');

rutaAdmin.get('/:id', renderAdmin);

rutaAdmin.post('/:id/nuevo-servicio',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,agregarServicio);


rutaAdmin.get('/:id/nuevo-servicio',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,renderNuevoServicio);


rutaAdmin.post('/:id/nuevo-producto',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,agregarProducto);

rutaAdmin.get('/:id/nuevo-producto',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,renderNuevoProducto);



rutaAdmin.get('/:id/estadisticas', [
    verificarLogin,
    verificarAdmin,
    validarCampos
], renderEstadisticas )

rutaAdmin.get('/:id/mis-productos', [
    verificarLogin,
    verificarAdmin,
    validarCampos
], renderTablasProductos  )

rutaAdmin.get('/:id/mis-servicios', [
    verificarLogin,
    verificarAdmin,
    validarCampos
], renderTablasServicios )

rutaAdmin.get('/:id/editar-producto/:url',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,renderEditarProducto);


rutaAdmin.post('/:id/editar-producto/:url',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,editarProducto);

rutaAdmin.get('/:id/editar-servicio/:url',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,renderEditarServicio);


rutaAdmin.post('/:id/editar-servicio/:url',[
    verificarLogin,
    verificarAdmin,
    validarCampos
] ,editarServicio);


/* PARA ELIMINAR SERVICIOS O PRODUCTOS */
rutaAdmin.get('/:id/eliminar-producto/:url', eliminarProducto);
rutaAdmin.get('/:id/eliminar-servicio/:url', eliminarServicio)



/* LA RUTA ES localhost:8080/admin */
module.exports = rutaAdmin;