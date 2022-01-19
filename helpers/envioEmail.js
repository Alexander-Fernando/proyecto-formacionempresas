const config = require('../config/nodeMailer');
const nodeMailer = require('nodemailer');
const hbsNM = require('nodemailer-express-handlebars');
const util = require('util');


let transporte = nodeMailer.createTransport(config);



//Template del email con hbs
transporte.use('compile', hbsNM({
    defaultLayout: false,
    viewEngine  : {
        extName         : '.handlebars',
        defaultLayout   : false
        
    },
    viewPath    : __dirname + '/../views/emailtemplates',
}))



exports.enviar = async (opciones) => {
 
    const opcionesEnvioEmail = {
        from: 'EmprendeSM<noreply@EmprendeSM.com>',
        to  : opciones.usuario.correo,
        subject: opciones.subject,
        template: opciones.archivo,
            //lo del context se puede utilizar en el template del email que se envía.
        context: {
            resetUrl : opciones.resetUrl
        }
    }
    const envioEmail = util.promisify(transporte.sendMail, transporte)
    return envioEmail.call(transporte, opcionesEnvioEmail );
}

