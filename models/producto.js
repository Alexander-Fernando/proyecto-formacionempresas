const {Schema, model} = require('mongoose');
const slug = require('slug');
const shortid = require('shortid');

const productoSchema = Schema({
    nombreProduc: {
        type: String,
        required: 'El nombre del producto es obligatorio',
        trim: true  
    },
    descripcionProduc: {
        type: String,
        required: 'La descripción del producto es obligatoria',
        trim: true
    },
    especificaciones:{
        type: String,
        trim: true,
        required: 'Las especificaciones del producto son obligatorias.'
    },
    lugarDelivery: {
        type: String,
        required: 'El lugar donde se ofrece el producto es obligatorio.',
        trim: true
    },
    ubicacion: {
        type: String,
        required: 'El lugar fijo desde se ofrece el producto es obligatorio',
        trim: true
    },
    teleContacto: {
        type: String,
        required: 'El teléfono de contacto del producto es obligatorio.',
        trim: true
    },
    precioProduc: {
        type: String,
        default: 0,
        required: 'El precio aprox del producto es obligatorio',
        trim: true
    },
    urlProduc:{
        type: String,
        lowercase: true
    },
    imgProducto:{
        type: String
    },
    compradoresProducto: [{
        nombre: String,
        email: String,
        telefono: String
    }],
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El autor es obligatorio.']
    },
    fechaCreacion:{
        type: Date,
        required: 'La fecha de creación es requerida.'
    },
    estado: {
        type: Boolean,
        required: [true,'El estado es obligatorio.'],
        default: true
    }
});


productoSchema.pre('save', function(next){
    //Crear la url única del producto
    const url = slug(this.nombreProduc);
    this.urlProduc = `${url}-${shortid.generate()}`;
    next();
})

module.exports = model('Producto', productoSchema);