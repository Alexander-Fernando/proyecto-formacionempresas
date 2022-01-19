const {Schema, model} = require('mongoose');
const slug = require('slug');
const shortid = require('shortid');

const servicioSchema = Schema({
    nombreSer: {
        type: String,
        required: 'El nombre del servicio es obligatorio',
        trim: true  
    },
    descripcion: {
        type: String,
        required: 'La descripción del servicio es obligatoria',
        trim: true
    },
    lugarDel: {
        type: String,
        required: 'El lugar donde se ofrece el servicio es obligatorio.',
        trim: true
    },
    lugarFijo: {
        type: String,
        required: 'El lugar fijo desde se ofrece el servicio es obligatorio',
        trim: true
    },
    telContacto: {
        type: String,
        required: 'El teléfono de contacto del servicio es obligatorio.',
        trim: true
    },
    precio: {
        type: String,
        default: 0,
        required: 'El precio aprox del servicio es obligatorio',
        trim: true
    },
    url:{
        type: String,
        lowercase: true
    },
    imgServicio:{
        type: String
    },
    compradores: [{
        nombre: String,
        email: String,
        telefono: String
    }],
    autor:{
        type: Schema.Types.ObjectId,
        reference: 'Usuario',
        required: 'El autor del servicio es obligatorio'
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha del servicio es requerida'],
    },
    estado: {
        type: Boolean,
        required: [true,'El estado es obligatorio.'],
        default: true
    }
});

servicioSchema.pre('save', function(next){
    //Crear la url única del producto
    const url = slug(this.nombreSer);
    this.url = `${url}-${shortid.generate()}`;
    next();
})

module.exports = model('Servicio', servicioSchema);