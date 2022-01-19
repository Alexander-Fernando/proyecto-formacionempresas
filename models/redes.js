const {Schema, model} = require('mongoose');


const redesSchema = Schema({
    web: {
        type: String,
        trim: true,
        default: '---'
    },
    github: {
        type: String,
        trim: true,
        default: '---'
    },
    twitter: {
        type: String,
        trim: true,
        default: '---'
    },
    instagram:{
        type: String,
        trim: true,
        default: '---'
    },
    facebook: {
        type: String,
        trim: true,
        default: '---'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es obligatorio']
    }
})


module.exports = model('Redes', redesSchema);
