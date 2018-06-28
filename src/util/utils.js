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