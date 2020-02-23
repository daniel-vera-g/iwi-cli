const axios = require('axios');
const os = require('os');

const Table = require('cli-table');

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

	await getData().then((Meals) => {
		console.info(Meals);
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

/**
 * Get the necessary data to populate the current meal table
 * @returns {Promise<Object>} The Object with the mensa Data
 */
const getData = () => {
	// TODO error handling if no result or no internet
	return new Promise((response, reject) => {
		const url = `https://www.iwi.hs-karlsruhe.de/iwii/REST/canteen/v2/2/${formatDate()}`;

		const Gerichte = {};

		// Get meal price & name
		axios.get(url, { headers: { accept: 'application/json' } }).then((res) => {
			const { mealGroups } = res.data;

			// Get meal information
			const getMealName = (mealGroupIndex, mealIndex) => { return mealGroups[mealGroupIndex].meals[mealIndex].name; };
			const getMealPrice = (mealGroupIndex, mealIndex) => { return mealGroups[mealGroupIndex].meals[mealIndex].priceStudent; };

			// TODO Refactor through map, filter & reduce?
			Gerichte.wahl1 = [getMealName(0, 0), getMealPrice(0, 0)];
			Gerichte.wahl2 = [getMealName(1, 0), getMealPrice(1, 0)];
			const aktThekeMeal = getMealName(2, 0);
			Gerichte.aktTheke = [aktThekeMeal === 'Tagesangebot' ? 'Heute gibts hier nichts.' : aktThekeMeal, getMealPrice(2, 0)];
			Gerichte.gutGuenstig1 = [getMealName(3, 0), getMealPrice(3, 0)];
			Gerichte.gutGuenstig2 = [getMealName(3, 1), getMealPrice(3, 1)];
			Gerichte.gutGuenstigBeilage = [getMealName(3, 2), getMealPrice(3, 2)];

			response(Gerichte);
		}).catch((err) => { return reject(err); });
	});
};

function formatDate() {
	const d = new Date();
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return [year, month, day].join('-');
}

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
	getData,
};
