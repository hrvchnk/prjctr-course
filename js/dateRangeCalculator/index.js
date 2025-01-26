import {
	arrayDates,
	calculateDateRangeForFilteredDates,
	filterDayOfWeek,
} from './dates.js';
import {
	clearResults,
	initStartDateInput,
	resultsListHistory,
	updateLastResult,
} from './dom.js';
import {
	clearLocalStorage,
	getResultsFromLocalStorage,
	updateLocalStorage,
} from './storage.js';
import { checkCorrectDateValue } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
	console.log('Date Range Calculator *завантажено*');

	const startDateInput = document.getElementById('start-date');
	const endDateInput = document.getElementById('end-date');

	const lastResultSpan = document.getElementById('last-result');
	const resultList = document.querySelector('.result-list');

	// початкові данні:  встановлення сьогодні - StartDate в input (dom.js)
	initStartDateInput(startDateInput);

	// відображення результатів з localStorage (storage.js)
	const results = getResultsFromLocalStorage();
	results.forEach(result => resultsListHistory(result, resultList));

	// робота з кнопками
	document.querySelectorAll('.result-button').forEach(button => {
		button.addEventListener('click', () => {
			const timeUnit = button.dataset.range || button.textContent.toLowerCase();
			const startDate = new Date(startDateInput.value);
			const endDate = new Date(endDateInput.value);

			if (!checkCorrectDateValue(startDate, endDate)) return;
			const allDates = arrayDates(startDate, endDate);
			console.log('allDates', allDates);

			const filterType = document.getElementById(
				'options-selector-filter-day-of-week'
			).value;
			console.log('filterType', filterType);

			const filteredDates = filterDayOfWeek(allDates, filterType);
			console.log('filteredDates', filteredDates);

			// основна функція рохрахунку (dates.js)
			const result = calculateDateRangeForFilteredDates(
				filteredDates,
				timeUnit
			);
			console.log('result', result);

			resultsListHistory(result, resultList);
			updateLocalStorage(result);
			updateLastResult(result, lastResultSpan);
		});
	});

	// кнопка очищення результату, історії результатів та localStorage
	document.getElementById('clear-button').addEventListener('click', () => {
		clearResults(resultList, lastResultSpan);
		clearLocalStorage();
	});
});
