import { API_KEY, urlCountryList, urlHolidaysList } from './constants.js';
import displayHolidays, { updateCountryList, updateYearList } from './dom.js';
import { handleError } from './error.js';
export class HolidaysApp {
	constructor({
		countrySelect,
		yearSelector,
		showHolidaysButton,
		tableBody,
		sortButton,
		sortIcon,
	}) {
		this.API_KEY = API_KEY;

		this.countrySelect = countrySelect;
		this.yearSelector = yearSelector;

		this.selectedCountry = '';
		this.selectedYear = new Date().getFullYear();

		this.showHolidaysButton = showHolidaysButton;
		this.tableBody = tableBody;

		this.sortButton = sortButton;
		this.sortIcon = sortIcon;
		this.sortType = 'asc';

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
				console.log('✅ *API* список країн отриман');
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
				console.log('✅ *API* список свят отриман');
				return response.json();
			})
			.then(data => {
				this.holidays = data.response.holidays;
				displayHolidays(data.response.holidays, this.tableBody);
			})
			.catch(error => {
				handleError(error, 'ERROR Свята');
			});
	};

	// взаємодія:
	// вибір року
	handleYearChange = event => {
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

	// кнопка Сортування
	toggleSort = () => {
		if (this.sortType === 'asc') {
			this.sortType = 'desc';
		} else {
			this.sortType = 'asc';
		}

		this.sortIcon.textContent = this.sortType === 'asc' ? '⬆️' : '⬇️';

		console.log(
			`Сортування змінено на: ${
				this.sortType === 'asc' ? 'за зростанням ⬆️' : 'за спаданням ⬇️'
			}`
		);

		displayHolidays(this.holidays, this.tableBody, this.sortType);
	};

	addEventListeners = () => {
		this.countrySelect.addEventListener('change', this.handleCountryChange); // вибір країни
		this.yearSelector.addEventListener('change', this.handleYearChange); // вибір року
		this.showHolidaysButton.addEventListener(
			'click',
			this.handleShowHolidaysClick
		); // кнопка Show Holidays
		this.sortButton.addEventListener('click', this.toggleSort); // кнопка сортування
	};
}
