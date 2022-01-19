const { Schema, model} = require('mongoose');
const bcryptjs = require('bcryptjs');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio!']
    },
    correo: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, 'El correo es obligatorio!']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        trim: true
    },
    token: String,
    fechaExpira: Date,
    rol: {
        type: String,
        default: 'usuario',
        emin: ['usuario', 'admin']
    },
    telefonomovil: {
        type:String,
        default:"--",
        trim: true
    },
    telefonofijo: {
        type:String,
        default:"---"
    },
    direccion: {
        type: String,
        default:"---"
    },
    imagen: {
        type: String
    },
    carrera:{
        type: String,
        default: '---'
    }
})

//HASHEAR LOS PASSWORDS
usuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    const hash = await bcryptjs.hash(this.password, 12);
    this.password = hash;

    next();
})

usuarioSchema.post('save', function(error, doc, next) {
    if((error.name) === 'MongoError' && error.code === 1100 ){
        next('El correo ya se encuentra registrado.');
    }else{
        next(error)
    }
})

//Autenticación de usuarios
usuarioSchema.methods = {
    compararPassword: function(password){
        return bcryptjs.compareSync(password, this.password)
    }
}

module.exports = model('Usuario', usuarioSchema)
