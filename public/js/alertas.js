document.addEventListener('DOMContentLoaded', () => {
    let alertas = document.querySelector('.alertas')

    if(alertas){
        limpiarAlertas();
    }
} )

const limpiarAlertas = () => {
    const alertas = document.querySelector('.alertas');
    const interval = setInterval(() => {
        if(alertas.children.length > 0){
            alertas.removeChild(alertas.children[0]);
        }else if(alertas.children.length === 0){
            alertas.parentElement.removeChild(alertas)
            clearInterval(interval)
        }
    }, 1500)
}

