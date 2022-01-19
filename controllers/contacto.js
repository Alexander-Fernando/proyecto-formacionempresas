const { sendMail } = require("../helpers/email-contacto");


const renderContacto = (req, res) => {
    return res.render('contacto', {
        NombrePagina: 'Contactanos | EmprendeSM',
        cssContacto: true,
        jsContacto: true
    })

}


const enviarCorreoContacto = async (req, res) => {
    
    const {asuntoCorreo, correoContacto, mensajeCorreo} = req.body;

    await sendMail(correoContacto, asuntoCorreo,  mensajeCorreo);

    req.flash('correcto', 'Gracias por contactarnos!');
    res.redirect('/');
}

module.exports = {
    renderContacto,
    enviarCorreoContacto
}