const Band = require("./band");

class BandList {
	constructor() {
		this.bands = [
			new Band("Metalica"),
			new Band("Rata Blanca"),
			new Band("Disturbe"),
			new Band("incubus"),
		];
	}

	addBand(name) {
		const newBand = new Band(name);
		this.bands.push(newBand);
		return this.bands;
	}

	removeBands(id) {
		this.bands = this.bands.filter((band) => band.id !== id);
	}

	getBand() {
		return this.bands;
	}

	increaseVotes(id) {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.votes += 1;
			}

			return band;
		});
	}

	changeName(id, newName) {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.name = newName;
			}

			return band;
		});
	}
}

module.exports = BandList;
