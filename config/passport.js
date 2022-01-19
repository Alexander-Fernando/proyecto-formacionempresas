const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/Usuarios')


passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password'
    }, async (correo, password, done ) => {
        const usuario = await Usuario.findOne({correo})

        if(!usuario) return done(null,false,{
            message: 'No está registrado en la BD!'
        });

        const verificarContraseña = usuario.compararPassword(password)

        if(!verificarContraseña){
            return done(null,false,{
                message: 'Contraseña incorrecta!'
            })
        }

        return done(null, usuario);
    }));


    passport.serializeUser((usuario,done) => {
        done(null, usuario._id)
    })

    passport.deserializeUser(async(id,done) => {
        const usuario = await Usuario.findById(id).exec();
        return done(null, usuario)
    })

module.exports = passport;