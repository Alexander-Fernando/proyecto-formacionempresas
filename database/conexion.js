const mongoose = require('mongoose');

const conexionDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('Conectado a la BD');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse al DB');
    }
}

module.exports = {
    conexionDB
}