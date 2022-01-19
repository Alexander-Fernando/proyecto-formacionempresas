const path = require('path');
const {v4: uuidv4} = require('uuid');

const subirImagen = (image, extensionesPermitidas = ['jpeg', 'jpg', 'png'] , carpeta="") => {

    return new Promise((resolve, reject) => {
        const {imagen} = image;
        const nombreSeparado = imagen.name.split('.');
        const extensionImagen = nombreSeparado[nombreSeparado.length - 1];

        if(!extensionesPermitidas.includes(extensionImagen)){
            return reject('La extensión de la imagen no está permitida.');
        }

        //Generando un nombre único para las imagenes
        const nombreTemporal = uuidv4() + '.' + extensionImagen; //Nombre de la imagen(único)

        const PathSubida = path.join(__dirname, '../uploads/', carpeta, nombreTemporal)

        imagen.mv(PathSubida, (err) => {
            if (err) {
                reject('No se pudo subir la imagen. Intente nuevamente');
            }
            resolve( nombreTemporal ); //NOMBRE DE LA IMAGEN
        });
    })
}


module.exports = {
    subirImagen
}