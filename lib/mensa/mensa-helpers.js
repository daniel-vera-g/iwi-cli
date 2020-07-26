const axios = require('axios');

function formatDate() {
	const d = new Date();
	let month = `${d.getMonth() + 1}`;
	let day = `${d.getDate()}`;
	const year = d.getFullYear();

	if (month.length < 2) month = `0${month}`;
	if (day.length < 2) day = `0${day}`;

	return [year, month, day].join('-');
}

/**
 * Get the necessary data to populate the current meal table
 * @returns {Promise<Object>} The Object with the mensa Data
 */
exports.getData = () => {
	// TODO error handling if no result or no internet, no meal plan avalaible, ....
	return new Promise((response, reject) => {
		// const url = `https://www.iwi.hs-karlsruhe.de/iwii/REST/canteen/v2/2/${formatDate()}`;
		const url = `https://www.iwi.hs-karlsruhe.de/iwii/REST/canteen/v2/2/2020-03-02`;

		const Gerichte = {};

		// Get meal price & name
		axios
			.get(url, { headers: { accept: 'application/json' } })
			.then(res => {
				const { mealGroups } = res.data;

				// Get meal information
				const getMealName = (mealGroupIndex, mealIndex) => {
					return mealGroups[mealGroupIndex].meals[mealIndex].name;
				};
				const getMealPrice = (mealGroupIndex, mealIndex) => {
					return mealGroups[mealGroupIndex].meals[mealIndex].priceStudent;
				};

				// TODO Refactor through map, filter & reduce?
				Gerichte.wahl1 = [getMealName(0, 0), getMealPrice(0, 0)];
				Gerichte.wahl2 = [getMealName(1, 0), getMealPrice(1, 0)];
				const aktThekeMeal = getMealName(2, 0);
				Gerichte.aktTheke = [
					aktThekeMeal === 'Tagesangebot' ? 'Heute gibts hier nichts.' : aktThekeMeal,
					getMealPrice(2, 0),
				];
				Gerichte.gutGuenstig1 = [getMealName(3, 0), getMealPrice(3, 0)];
				Gerichte.gutGuenstig2 = [getMealName(3, 1), getMealPrice(3, 1)];
				Gerichte.gutGuenstigBeilage = [getMealName(3, 2), getMealPrice(3, 2)];

				response(Gerichte);
			})
			.catch(err => {
				return reject(err);
			});
	});
};
