const Usuario = require("../models/Usuarios");
const Redes   = require("../models/redes")
const cloudinary = require('cloudinary').v2;
cloudinary.config = (process.env.CLOUDINARY_URL);

const vistaEditarPerfil = async (req, res) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);

    const {web, github, twitter, instagram, facebook} = await Redes.findOne({usuario: id});
    
    const{nombre, correo, carrera,telefonofijo,telefonomovil,direccion,imagen} = usuario;

    res.render('editar-perfil', {
        NombrePagina: 'Editar Perfil | EmprendeSM',
        css2: true,
        nombre,
        correo,
        carrera,
        telefonofijo,
        telefonomovil,
        direccion,
        menu: false,
        id,
        imagen,
        web, github, twitter, instagram, facebook
    });
}

const actualizarPerfil = async (req, res) => {
    const {nombre, carrera, telefonomovil, telefonofijo, direccion, ...otroRedes} = req.body;
    const {id} = req.params;
    const usuarioDB = await Usuario.findById(id);

    const dataRedes = {
        web: otroRedes.web,
        github: otroRedes.github,
        twitter: otroRedes.twitter,
        instagram: otroRedes.instagram,
        facebook: otroRedes.facebook,
        usuario: req.user._id
    }
    
    const data = {
        nombre,
        carrera,
        telefonomovil,
        telefonofijo,
        direccion,
    } 

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        console.log("No hay imagen en la petición");
    }
    
    if(req.files){
        if(usuarioDB.imagen){
            const nombreArr = usuarioDB.imagen.split('/');
            const idImagenCloudinary = nombreArr[nombreArr.length-1];
            const [public_id] = idImagenCloudinary.split('.');
            cloudinary.uploader.destroy(public_id);
        }
        const {tempFilePath} = req.files.imagen;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        data.imagen = secure_url;
    }
    
    try {
        await Usuario.findByIdAndUpdate(req.user._id, data);
        await Redes.updateOne({usuario: id}, dataRedes);
        req.flash('correcto', 'Perfil actualizado correctamente');
        return res.redirect(`/perfil-usuario/${req.user._id}`)
    } catch (error){
        req.flash('error', 'Los nombres y apellidos ya se encuentran registrados.');
        res.redirect(`/editar-perfil/${req.user._id}`);
    }
}

module.exports = {
    vistaEditarPerfil,
    actualizarPerfil
}