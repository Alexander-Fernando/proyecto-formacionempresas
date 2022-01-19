//MOSTRAR LOS MENSAJES DE ERROR EN EL FRONTEND
const helpers = {
    mostrarAlertas: (errores = {}, alertasHTML="") => {
        const categoria = Object.keys(errores)
        let html = '';

        if(categoria.length){
            errores[categoria].forEach(e => {
                html += `
                    <div class="${categoria} alerta">
                        ${e}
                    </div>
                `
            })
        }
        
        alertasHTML.fn().html = html
        return html
    }
}

module.exports = helpers;