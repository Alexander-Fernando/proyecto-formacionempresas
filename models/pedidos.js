const {Schema, model} =  require('mongoose');


const pedidoSchema = Schema({


    email:{
        type: String,
        required: true
    },
    productos: [{
        _id: false,
        id: String,
        autor: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'
        },
        titulo: String,
        precio: Number,
        cantidad: Number
    }]
})


module.exports = model('Pedido', pedidoSchema);