const BandList = require("./band-list");

class Sockets {
	constructor(io) {
		this.io = io;
		this.bandList = new BandList();
		this.socketsEvents();
	}
	socketsEvents() {
		//? On Connection
		this.io.on("connection", (socket) => {
			console.log("cliente conectado");

			//? Emitir al cliente conectado, todas las bandas actuales
			socket.emit("current-bands", this.bandList.getBand());

			//? Votar por la banda
			socket.on("vote-band", (id) => {
				this.bandList.increaseVotes(id);
				this.io.emit("current-bands", this.bandList.getBand());
			});

			//? Delete Band
			socket.on("delete-band", (id) => {
				this.bandList.removeBands(id);
				this.io.emit("current-bands", this.bandList.getBand());
			});

			//? Change name
			socket.on("name-change-band", ({ id, name }) => {
				this.bandList.changeName(id, name);
				this.io.emit("current-bands", this.bandList.getBand());
			});

			//? Change name
			socket.on("new-band", (name) => {
				this.bandList.addBand(name);
				this.io.emit("current-bands", this.bandList.getBand());
			});
		});
	}
}

module.exports = Sockets;
