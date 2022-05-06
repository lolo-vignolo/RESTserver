const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config.db');

class Server {
  constructor() {
    this.app = express();
    this.usuariosRutesPath = '/api/usuarios';
    this.authPath = '/api/auth';

    // conectar DB
    this.conectarDB();

    //middlewares
    this.middlewares();

    //routes
    this.routes();

    this.port = process.env.PORT || 3000;
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json()); //para que el servidor entienda que voy a recibir info formato json

    //directorio public
    this.app.use(express.static('public'));
  }

  async conectarDB() {
    await dbConection();
    console.log('DB is connected');
  }

  // uso el middleware para "importar" las rutas
  routes = () => {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usuariosRutesPath, require('../routes/usuarios.routes'));
  };

  listen = () => {
    this.app.listen(this.port, () => {
      console.log('Server started');
    });
  };
}

module.exports = Server;
