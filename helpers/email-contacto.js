const nodemailer = require('nodemailer');
const configuracionNodeMailer = require('../config/nodeMailer');

const createTrans = () => {
    return nodemailer.createTransport(configuracionNodeMailer)
}


const sendMail = async(email="", asunto="", mensaje="") => {
    const transporter = createTrans();
    await transporter.sendMail({
        from: email, //Quién envía el correo
        to: 'EmprendeSM<noreply@EmprendeSM.com>',
        subject: asunto,
        html: mensaje
    })
}

const sendMailVentas = async(email="", asunto="", mensaje="") => {
    const transporter = createTrans();
    await transporter.sendMail({
        from: 'EmprendeSM<noreply@EmprendeSM.com>', //Quién envía el correo
        to: email,
        subject: asunto,
        html: mensaje
    })
}


module.exports = {
    sendMail,
    sendMailVentas
}


