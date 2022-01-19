
const renderNosotros = (req, res) => {
    res.render('nosotros', {
        NombrePagina: 'Nosotros | EmprendeSM',
        cssContacto: true,
        jsContacto: true
    })

}

module.exports = {
    renderNosotros
}