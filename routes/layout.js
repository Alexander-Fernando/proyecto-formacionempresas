const {Router} = require('express');
const routerLayout = Router();
const {layout} = require('../controllers/layoutPrincipal');
const { mostrarProductos, renderProducto } = require('../controllers/productos');
const { mostrarServicios, renderServicio } = require('../controllers/servicios');
const { verificarLogin, verificarAdmin } = require('../middlewares/login');
const { validarCampos } = require('../middlewares/validarCampos');
                

                /*  HOME    */
routerLayout.get('/',[
    verificarLogin,
    verificarAdmin,
    validarCampos
], layout)

                /* SERVICIOS */
routerLayout.get('/servicios',[
    verificarLogin,
    validarCampos
] ,mostrarServicios)

routerLayout.get('/servicios/:url',[
    verificarLogin,
    validarCampos
] ,renderServicio);

                /* PRODUCTOS */
routerLayout.get('/productos',[
    verificarLogin,
    validarCampos
] ,mostrarProductos)

routerLayout.get('/productos/:url',[
    verificarLogin,
    validarCampos
] ,renderProducto);




module.exports = routerLayout;