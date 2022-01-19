const express = require('express');
const exphbs = require('express-handlebars')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash');
const passport = require('../config/passport');
const { conexionDB } = require('../database/conexion');
const fileUpload = require('express-fileupload');
const favicon = require('serve-favicon');
const path = require('path');

class Server {
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || 8080;

        //PATHS
        this.paths = {
            layout                  : '/',
            registro                : '/registrarse',
            login                   : '/inicio-sesion',
            cierreSesion            : '/cerrar-sesion',
            reestablecerPassword    : '/reestablecer-password',
            editarPerfil            : '/editar-perfil',
            perfilUsuario           : '/perfil-usuario',
            contacto                : '/contactanos',
            nosotros                : '/nosotros',
            administracion          : '/admin',
            carritoCompras          : '/lista-compras',
            payment                 : '/create-payment-intent',
            compra                  : '/compra'
        }

        //CONECTANDO A LA BD
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS
        this.routes();
    }

    async conectarDB(){
        await conexionDB()
    }
    
    
    middlewares(){
        //habilitamos CORS
        this.app.use(cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}))
        this.app.use(cookieParser())
        this.app.use(session({
            secret: process.env.SECRETSESSION,
            key: process.env.SECRETORPRIVATEKEY,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_ATLAS
            })
        }))

        //Inicializando passport para la autenticación
        this.app.use(passport.initialize())
        this.app.use(passport.session())

        //Alertas y mensajes
        this.app.use(flash())
        
        //DIRECTORIO PÚBLICO
        this.app.use(express.static('public'));
        
        //AGREGANDO FAVICON
        this.app.use(favicon(path.join(__dirname,'../public/img/','logomenor.ico')));

        //Habilitamos HBS como template engine
        this.app.engine('handlebars',
        exphbs({
            defaultLayout: 'layout',
            helpers: require('../helpers/handlebars')
        })
        )
        
        //ESTABLECEMOS HBS COMO NUESTRO MOTOR DE PLANTILLA
        this.app.set('view engine', 'handlebars')

        //Custom Middleware
        this.app.use((req,res,next) => {
            res.locals.mensajes = req.flash();
            next();
        })
        
        //Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    
    routes(){
        this.app.use(this.paths.layout, require('../routes/layout'));
        this.app.use(this.paths.registro, require('../routes/login'));
        this.app.use(this.paths.login, require('../routes/inicioSesion'));
        this.app.use(this.paths.cierreSesion, require('../routes/cerrarSesion'))
        this.app.use(this.paths.reestablecerPassword, require('../routes/reestablecerPassword'))
        this.app.use(this.paths.editarPerfil, require('../routes/editarPerfil'))
        this.app.use(this.paths.perfilUsuario, require('../routes/perfil'))
        this.app.use(this.paths.contacto, require('../routes/contacto'))
        this.app.use(this.paths.nosotros, require('../routes/nosotros'))
        this.app.use(this.paths.administracion, require('../routes/admin'))
        this.app.use(this.paths.carritoCompras, require('../routes/carrito'))
        this.app.use(this.paths.payment, require('../routes/paymentsIntent'));
        this.app.use(this.paths.compra, require('../routes/compras'));


        this.app.use(function(req,res,next){
            res.status(404).render('404', {
                NombrePagina: 'Error 404 | EmprendeSM',
                cssError: true
            })
        })
    }

    listen(){
        this.app.listen(this.PORT, () => {
            console.log(`Aplicación corriendo en el PUERTO ${this.PORT}`);
        })
    }
}

module.exports = Server
