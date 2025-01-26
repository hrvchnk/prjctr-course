import { API_KEY, countrySelect, urlCountryList } from './constants.js';

export class HolidaysApp {
	constructor() {
		this.API_KEY = API_KEY;
	}

	// отримання країн по API
	fetchCountries = () => {
		fetch(`${urlCountryList}?api_key=${this.API_KEY}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Помилка: ${response.status}`);
				}

				console.log(response);

				return response.json();
			})
			.then(data => {
				this.updateDOM(data);
				console.log(data.response.countries);
			})
			.catch(error => {
				this.handleError(error);
			});
	};

	// dom
	updateDOM = data => {
		const countries = data.response.countries;

		countrySelect.innerHTML = '';

		const defaultOption = document.createElement('option');
		defaultOption.value = 'all';
		defaultOption.textContent = 'Select country';
		countrySelect.appendChild(defaultOption);

		countries.forEach(country => {
			const option = document.createElement('option');
			option.value = country.iso_3166;
			option.textContent = country.country_name;
			countrySelect.appendChild(option);
		});
	};
	updateYearList = () => {
		for (let i = 2001; i <= 2049; i++) {
			const option = document.createElement('option');
			option.value = i;
			option.textContent = i;
			yearSelector.appendChild(option);
		}

		yearSelector.value = new Date().getFullYear();
	};

	/**
	помилки
	 */
	handleError = error => {
		console.error('Помилка завантаження даних:', error);
		alert('Не вдалося завантажити список країн');
	};
}
