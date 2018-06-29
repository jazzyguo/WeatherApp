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