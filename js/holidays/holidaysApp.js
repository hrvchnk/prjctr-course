import { API_KEY, urlCountryList, urlHolidaysList } from './constants.js';
import {
	displayHolidays,
	initDOM,
	updateCountryList,
	updateYearList,
} from './dom.js';
import { handleError } from './error.js';

export class HolidaysApp {
	constructor() {
		this.API_KEY = API_KEY;
		const { countrySelect, yearSelector, showHolidaysButton } = initDOM();
		this.countrySelect = countrySelect;
		this.yearSelector = yearSelector;
		this.showHolidaysButton = showHolidaysButton;
		this.selectedCountry = '';
		this.selectedYear = new Date().getFullYear();
		this.addEventListeners();
	}

	// запити на апі:
	// отримання країн
	fetchCountries = () => {
		fetch(`${urlCountryList}?api_key=${this.API_KEY}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Помилка: ${response.status}`);
				}
				console.log('*API* список країн отриман');
				return response.json();
			})
			.then(data => {
				updateCountryList(data.response.countries, this.countrySelect);
				updateYearList(this.yearSelector);
			})
			.catch(error => {
				handleError(error, 'ERROR країн');
			});
	};
	// отримання свят для вибраної країни та року
	fetchHolidays = () => {
		const url = `${urlHolidaysList}?api_key=${this.API_KEY}&country=${this.selectedCountry}&year=${this.selectedYear}`;
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Помилка: ${response.status}`);
				}
				console.log('*API* список свят отриман');
				return response.json();
			})
			.then(data => {
				displayHolidays(data, document.querySelector('#table_result tbody'));
			})
			.catch(error => {
				handleError(error, 'ERROR Свята');
			});
	};

	// взаємодія:
	// вибір року
	handleYearChange = event => {
		// this.yearSelector.value = this.selectedYear;
		this.selectedYear = event.target.value;
		console.log(`Вибраний рік: ${this.selectedYear}`);
	};

	// вибір країни
	handleCountryChange = event => {
		this.selectedCountry = event.target.value; // ISO-код вибраної країни
		console.log(`Вибрана країна: ${this.selectedCountry}`);

		// поки не вибрана країна disable: Вибір року і кнопка Show Holidays
		if (this.selectedCountry !== 'all') {
			this.yearSelector.disabled = false;
			this.showHolidaysButton.disabled = false;
		} else {
			this.yearSelector.disabled = true;
			this.showHolidaysButton.disabled = true;
		}
	};

	// кнопка "Показати свята"
	handleShowHolidaysClick = () => {
		if (this.selectedCountry !== 'all' && this.selectedYear) {
			this.fetchHolidays(); // якщо країна і рік вибрані, робимо запит на свята
		}
	};

	addEventListeners = () => {
		this.countrySelect.addEventListener('change', this.handleCountryChange);
		this.yearSelector.addEventListener('change', this.handleYearChange);
		this.showHolidaysButton.addEventListener(
			'click',
			this.handleShowHolidaysClick
		);
	};
}
