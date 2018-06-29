/* Converts from fahrenheit to celsius
 */
export function convertTemp(temp) {
	return ((temp - 32) * .5556).toFixed(2);
}

/* Returns title case string
 * ex: clear skies -> Clear Skies
 */
export function toTitleCase(str) {
	return str.replace(/\b\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/* Converts unix timestamp to 12hour hh:mm (TZ) format
 */
export function unixToTime(unix) {
	let date = new Date(unix * 1000);
	let hours = date.getHours();
	const timeZone = date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
	const tzAcronym = timeZone.match(/\b(\w)/g).join('');
	const mod = (hours > 12) ? 'PM' : 'AM';
	const minutes = '0' + date.getMinutes();
	hours = (hours % 12) ? (hours % 12) : 12;

	return `${hours}:${minutes.substr(-2)}${mod} ${tzAcronym}`;
}

/* 
 *********
 * This function iterates through the data once, and records
 * values for each data, and then divides by the number
 * of data points recorded to get the average
 *********
 * Set to calculate daily H / L temp, Wind Speed, and Humidity
 * Also fetches the description & id for the first occurence of a day
 *
 * @ {data} object - response from openweather api forecast api
 * @ return {array} - array of objects with daily values
 */
export function calcDailyValues(data) {
	let dailyValues = [];
	let currentDate = '';
	let currentMaxTemp;
	let currentMinTemp;
	let currentWindSpeed;
	let currentHumidity;
	let description;
	let icon;
	let count;

	data.forEach((ele, i) => {
		const eleDate = ele.dt_txt.split(' ')[0];
		// element is a different day // or is the last element
		if((eleDate !== currentDate) || (i+1 === data.length)) {
			// add current values to object in array
			if(currentDate) {
				// object to be added
				const newDate = {
					date: currentDate,
					description,
					icon,
					temp_max: Math.ceil((currentMaxTemp / count)),
					temp_min: Math.floor((currentMinTemp / count)),
					wind_speed: ~~(currentWindSpeed),
					humidity: ~~(currentHumidity)
				};
				dailyValues.push(newDate);
			}
			// start values for a new object
			currentDate = eleDate;
			currentMaxTemp = ele.main.temp_max;
			currentMinTemp = ele.main.temp_min;
			currentWindSpeed = ele.wind.speed;
			currentHumidity = ele.main.humidity;
			description = toTitleCase(ele.weather[0].description);
			icon = ele.weather[0].icon.substr(0,2);
			count = 1;
		} else {
			// same day - so record the values
			currentMaxTemp += ele.main.temp_max;
			currentMinTemp += ele.main.temp_min;
			currentWindSpeed = ele.wind.speed;
			currentHumidity = ele.main.humidity;
			count++;
		}
	})
	return dailyValues;
}

/* Takes a string date like '2018-06-29'
 * and converts it into June 29
 * @ param {date} - string
 */
export function dateToString(dateString) {
	const months = ['January', 'February', 'March', 'April',
					'May', 'June', 'July', 'August', 'September',
					'October', 'November', 'December'];
	const month = parseInt(dateString.split('-')[1], 10);
	const date = parseInt(dateString.split('-')[2], 10);

	return `${months[month-1]} ${date}`
}

/* Returns weekday from a date string
 */
export function getWeekDay(dateString) {
	const days = ['Sunday', 'Monday', 'Tuesday', 
				  'Wednesday', 'Thursday', 'Friday', 
				  'Saturday'];
	const dateObject = new Date(dateString);
	const weekday = days[dateObject.getDay()];

	return weekday;
}