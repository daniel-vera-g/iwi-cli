const axios = require("axios");
const Table = require("cli-table");
const table = new Table({
	head: ["", "Name", "Preis"],
	// head: ["", "Name", "Price"],
});

const mensa = async argv => {
	if (argv.veg)
		console.log(
			"\x1b[31m",
			"The vegetarian flag is currently not available. I'm sorry.\nHere are all meals for today, maybe you can find something ;)"
		);

	const Gerichte = await getData();

	table.push(
		{ "Wahlessen 1": [Gerichte.wahl1] },
		{ "Wahlessen 2": [Gerichte.wahl2] },
		{ Aktionstheke: [Gerichte.aktTheke] },
		{ "Gut & Guenstig 1": [Gerichte.gutGuenstig1] },
		{ "Gut & Guenstig 2": [Gerichte.gutGuenstig2] },
		{ "Gut & Guenstig Beilage": [Gerichte.gutGuenstigBeilage, "/"] }
	);

	console.log(table.toString());
};

const getData = () => {
	return new Promise(resolve => {
		const url = "https://www.iwi.hs-karlsruhe.de/iwii/REST/canteen/v2/2/2020-02-17";
		let wahl1, wahl2, aktTheke, gutGuenstig1, gutGuenstig2, gutGuenstigBeilage;
		let Gerichte = {};

		axios.get(url, { headers: { accept: "application/json" } }).then(res => {
			const data = res.data.mealGroups;
			// Wahlessen 1
			Gerichte.wahl1 = data[0].meals[0].name;

			// Wahlessen 2
			Gerichte.wahl2 = data[1].meals[0].name;

			// Aktionstheke
			Gerichte.aktTheke = data[2].meals[0].name === "Tagesangebot" ? "Heute gibts hier nichts." : data[2].meals[0].name;

			// Gut & Günstig 1
			Gerichte.gutGuenstig1 = data[3].meals[0].name;

			// Gut & Günstig 2
			Gerichte.gutGuenstig2 = data[3].meals[1].name;

			// Gut & Günstig Beilage
			Gerichte.gutGuenstigBeilage = data[3].meals[2].name;

			resolve(Gerichte);
		});
	});
};

module.exports = {
	command: "mensa [--veg]",
	describe: "Get the Mensa Menu of the day.",
	builder: yargs => {
		yargs.positional("veg", {
			describe: "Show only vegetarian option",
			type: "boolean",
			default: false,
		});
	},
	handler: mensa,
};
