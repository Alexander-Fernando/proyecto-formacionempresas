require('dotenv').config();
const Server = require('./models/servidor');
const servidor = new Server();
servidor.listen();
