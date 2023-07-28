/*  *Servidor de Express*  */
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//*http server
		this.server = http.createServer(this.app);

		//*configuracion socket
		this.io = socketio(this.server, {
			/**Configuraciones */
		});
	}

	middlewares() {
		// * desplegar directorio publico
		this.app.use(express.static(path.resolve(__dirname, "../public")));

		//*CORS
		this.app.use(cors());
	}

	settingSockets() {
		new Sockets(this.io);
	}

	execute() {
		//*inicializar middlewares
		this.middlewares();

		//?inicializar Sockets
		this.settingSockets();

		//*Inicializar Server
		this.server.listen(this.port, () => {
			console.log(`Servidor Corriendo en puerto: ${this.port}`);
			console.info(`http://localhost:${this.port}`);
		});
	}
}

module.exports = Server;
