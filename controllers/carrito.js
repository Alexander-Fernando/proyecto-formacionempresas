const renderCarrito = (req, res) => {
    res.render('compras/carrito',{
        NombrePagina: 'Carro de compras | EmprendeSM',
        carritoCSS: true,
        carritoJS: true
    })
}

module.exports = {
    renderCarrito
}