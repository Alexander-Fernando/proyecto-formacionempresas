const { validationResult } = require('express-validator')
const validarCampos = (req,res,next) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        
        // req.flash('error', errores.errors.map(err => err.msg));
        
        // res.render('registro',{
        //     NombrePagina: 'Crear cuenta | EmprendeSM.',
        //     mensajes: req.flash(),
        //     css: true
        // })
        return;
    }
    next()
}


const validarCampos2 = (req, res, next) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        
        const idUser = req.user._id;
        req.flash('error', errores.errors.map(err => err.msg));

        res.redirect(`/editar-perfil/${idUser}`);
        return;
    }
    next()
}

const validarFormularioContacto = (req, res, next) => {
    const errores = validationResult(req);
    
    if(!errores.isEmpty()){
        req.flash('error', errores.errors.map(err => err.msg));
        return res.redirect('back');
    }
    next();
}

module.exports = {validarCampos, validarCampos2, validarFormularioContacto}