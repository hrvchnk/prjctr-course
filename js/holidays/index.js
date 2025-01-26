import { HolidaysApp } from './holidaysApp.js';

document.addEventListener('DOMContentLoaded', () => {
	console.log('Holidays *завантажено*');

	const app = new HolidaysApp();
	app.fetchCountries();
});
