const os = require('os');
const Table = require('cli-table');
const mensaHelpers = require('./mensa-helpers');

const { username } = os.userInfo();

// Basic meal
const table = new Table({
	head: ['', 'Name', 'Price'],
});

// Handle mensa command
const mensa = async (argv) => {
	// Type checking for too many args
	if (Object.keys(argv).length > 3) {
		console.log(' ---------------------------------------------------------------------------------------------------');
		console.log('-------- Hey, the flag you entered does not exist. Please see the manual for possible flags. --------');
		console.log(' ---------------------------------------------------------------------------------------------------');
	}

	// TODO vegetarian option
	if (argv.veg) {
		console.log(
			"The vegetarian flag is currently WIP, I'm sorry.\nHere are all meals for today, maybe you can find something ;)",
		);
	}

	await mensaHelpers.getData().then((Meals) => {
		// console.info(Meals);
		// Render Mensa meals
		table.push(
			{ 'Wahlessen 1': [Meals.wahl1[0], `${Meals.wahl1[1]} €`] },
			{ 'Wahlessen 2': [Meals.wahl2[0], `${Meals.wahl2[1]} €`] },
			{ Aktionstheke: [Meals.aktTheke[0], `${Meals.aktTheke[1]} €`] },
			{ 'Gut & Guenstig 1': [Meals.gutGuenstig1[0], `${Meals.gutGuenstig1[1]} €`] },
			{ 'Gut & Guenstig 2': [Meals.gutGuenstig2[0], `${Meals.gutGuenstig2[1]} €`] },
			{ 'Gut & Guenstig Beilage': [Meals.gutGuenstigBeilage[0], `${Meals.gutGuenstigBeilage[1]} €`] },
		);
		console.log(`\n Hello ${username}, here is your menu for today. Enjoy!\n${table.toString()}`);
	}).catch((err) => { return console.error(`There was an error querying the Mensa menu. Error: ${err}`); });
};

module.exports = {
	command: 'mensa [--veg]',
	describe: 'Get the Mensa Menu of the day.',
	builder: (yargs) => {
		yargs.positional('veg', {
			describe: 'Show only vegetarian option',
			type: 'boolean',
			default: false,
		});
	},
	handler: mensa,
};
