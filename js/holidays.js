const urlYearsList = 'https://calendarific.com/api/v2/languages';
const urlCountryList = 'https://calendarific.com/api/v2/countries';
const urlHolidaysList = 'https://calendarific.com/api/v2/holidays';
const apiKey = 'sHNzLEVxyzjrBqvZ9r3zXduRflFrVuv9';

function loadCountries() {
	fetch(`${urlCountryList}?api_key=${apiKey}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			const countries = data.response.countries;
			const selectElement = document.getElementById('options-selector');
		})
		.catch(error => {
			console.error('Щось пішло не так:', error);
		});
}

document.addEventListener('DOMContentLoaded', loadCountries);
