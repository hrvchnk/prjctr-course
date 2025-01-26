const urlYearsList = 'https://calendarific.com/api/v2/languages';
const urlCountryList = 'https://calendarific.com/api/v2/countries';
const urlHolidaysList = 'https://calendarific.com/api/v2/holidays';
const API_KEY = 'sHNzLEVxyzjrBqvZ9r3zXduRflFrVuv9';

export let countrySelect;
export let yearSelector;

document.addEventListener('DOMContentLoaded', () => {
	countrySelect = document.getElementById('country-selector');
	yearSelector = document.getElementById('year-selector');
});

export { API_KEY, urlCountryList, urlHolidaysList, urlYearsList };
