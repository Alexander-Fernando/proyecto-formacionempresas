const Redes = require('../models/redes');
const Usuario = require('../models/Usuarios');

const renderPerfil = async (req, res, next) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    const redes = new Redes({usuario: id});
    const redesBusqueda = await Redes.findOne({usuario: id});

    if(!redesBusqueda){
        try {
            await redes.save();
        } catch (error) {   
            console.log("error al añadir redes");
        }
    }
    

    const {web, github, twitter, instagram, facebook} = await Redes.findOne({usuario: id});

    const {nombre, correo, direccion, telefonofijo, telefonomovil, carrera, imagen} = usuario;

    if(!usuario) return next();

    if(req.user._id == id){
        return res.render('perfil-usuario', {
            NombrePagina: `${usuario.nombre} | EmprendeSM`,
            cssPerfil: true,
            nombre,
            correo,
            direccion,
            telefonofijo,
            telefonomovil,
            carrera,
            id,
            imagen,
            web, github, twitter, instagram, facebook,
            botonEditar: true
        })
    }

    return res.render('perfil-usuario', {
        NombrePagina: `${usuario.nombre} | EmprendeSM`,
        cssPerfil: true,
        nombre,
        correo,
        direccion,
        telefonofijo,
        telefonomovil,
        carrera,
        imagen,
        web, github, twitter, instagram, facebook,
        id
    })
    
}

module.exports = {
    renderPerfil
}