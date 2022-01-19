const {Router} = require('express');
const { renderNosotros } = require('../controllers/nosotros');
const routerNosotros = Router();

routerNosotros.get('/', renderNosotros);


module.exports = routerNosotros;