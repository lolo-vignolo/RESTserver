const Server = require('./models/server');

require('dotenv').config();

const newServer = new Server();

newServer.listen();
