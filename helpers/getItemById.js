const Producto = require('../models/producto');


module.exports = async function getItemById(id){
    return Producto.findById(id);
}