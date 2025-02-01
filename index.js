// Toggle tab visibility
document.querySelectorAll('.tabs__toggle').forEach(toggle => {
	toggle.addEventListener('click', function () {
		document
			.querySelectorAll('.tabs__toggle')
			.forEach(t => t.classList.remove('is-active'));
		document
			.querySelectorAll('.tabs__content')
			.forEach(c => c.classList.remove('is-active'));

		this.classList.add('is-active');
		const tabId = this.getAttribute('data-tab');
		document.getElementById(tabId).classList.add('is-active');
	});
});

// Date Range Calculator
import {
	initStartDateInput,
	resultsListHistory,
} from './js/dateRangeCalculator/dom.js';
import {
	handleClearButton,
	handlePresetButtons,
	handleResultButtons,
} from './js/dateRangeCalculator/eventsBtn.js';
import { getResultsFromLocalStorage } from './js/dateRangeCalculator/storage.js';
// Holidays
import { HolidaysApp } from './js/holidays/holidaysApp.js';

// загальний initDOM
const initDOM = () => {
	// Date Range Calculator
	const startDateInput = document.getElementById('start-date');
	const endDateInput = document.getElementById('end-date');
	const lastResultSpan = document.getElementById('last-result');
	const resultList = document.querySelector('.result-list');

	// Holidays
	const countrySelect = document.getElementById('country-selector');
	const yearSelector = document.getElementById('year-selector');
	const showHolidaysButton = document.getElementById('show-holidays-button');
	const tableBody = document.querySelector('#table-result tbody');
	const sortButton = document.getElementById('sort-button');
	const sortIcon = document.getElementById('sort-icon');

	// перевірка, чи є елементи
	if (
		!startDateInput ||
		!endDateInput ||
		!lastResultSpan ||
		!resultList ||
		!countrySelect ||
		!yearSelector ||
		!showHolidaysButton ||
		!tableBody ||
		!sortButton ||
		!sortIcon
	) {
		console.error('❌ *DOM* елементи не знайдено');
		return null;
	}

	return {
		startDateInput,
		endDateInput,
		lastResultSpan,
		resultList,
		countrySelect,
		yearSelector,
		showHolidaysButton,
		tableBody,
		sortButton,
		sortIcon,
	};
};

// ініціалізація
document.addEventListener('DOMContentLoaded', () => {
	console.log('✅  *завантажено* Date Range Calculator');
	console.log('✅  *завантажено* Holidays');

	const domElements = initDOM();
	if (!domElements) return;

	const { startDateInput, endDateInput, lastResultSpan, resultList } =
		domElements; // деструктуризація

	initStartDateInput(startDateInput);
	console.log('*початкова дата* startDateInput: ', startDateInput.value);

	// відображення результатів з localStorage
	const results = getResultsFromLocalStorage();
	results.forEach(({ result, timeUnit, startDate, endDate }) =>
		resultsListHistory(result, resultList, timeUnit, startDate, endDate)
	);

	// обробка подій
	handleResultButtons(startDateInput, endDateInput, resultList, lastResultSpan);
	handlePresetButtons(startDateInput, endDateInput);
	handleClearButton(resultList, lastResultSpan);

	//
	// ініціалізація Holidays
	//
	const app = new HolidaysApp(domElements);
	app.fetchCountries();
});
