const {Router} = require('express');
const { renderCarrito } = require('../controllers/carrito');
const carritoRuta = Router();

carritoRuta.get('/', renderCarrito);


module.exports = carritoRuta;