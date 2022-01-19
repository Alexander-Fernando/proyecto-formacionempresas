const Mongoose = require('mongoose');
const {Router} = require('express');
const { sendMailVentas, sendMail } = require('../helpers/email-contacto');
const Pedido = require('../models/pedidos');
const Usuario = require('../models/Usuarios');

//ESTA ES LA RUTA /COMPRA
const rutaCompras = Router();

rutaCompras.post('/', async(req, res) => {
    let hash = {};
    let array = req.body.productos.filter(o => hash[o.autorProducto] ? false : hash[o.autorProducto] = true)

    //Envíar correo al vendedor
    array.forEach(async (produc) => {
        const id = Mongoose.Types.ObjectId(produc.autorProducto);
        const user = await Usuario.findById(id);
        const correo = user.correo;
        await sendMailVentas(correo, "Mis ventas | EmprendeSM", "Felicitaciones, te han realizado una compra ")
    })

    //Envíar correo al comprador
    await sendMail(req.body.email, "Gracias por comprar en EmprendeSM", "Muchas gracias por su compra. Puede contactarse con el vendedor para coordinar la entrega.")

    const compra = new Pedido({
        email: req.body.email,
        productos: req.body.productos
    })

    try {
        await compra.save();
        req.flash('correcto', 'Compra realizada correctamente.')
    } catch (error) {
        req.flash('error', error.message);
    }
})


module.exports = rutaCompras;