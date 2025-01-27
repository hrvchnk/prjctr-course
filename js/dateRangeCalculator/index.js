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
	// results.forEach(result => resultsListHistory(result, resultList));
	// підзавантаження і відображення з locaStorage результатів + відображення початкової дати, кінцевої і одиниці розрахунку
	results.forEach(({ result, timeUnit, startDate, endDate }) =>
		resultsListHistory(result, resultList, timeUnit, startDate, endDate)
	);
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

			// до історії результатів
			resultsListHistory(
				result,
				resultList,
				timeUnit,
				startDate.toISOString().split('T')[0],
				endDate.toISOString().split('T')[0]
			);

			updateLocalStorage(
				result,
				timeUnit,
				startDate.toISOString().split('T')[0],
				endDate.toISOString().split('T')[0]
			);

			updateLastResult(result, lastResultSpan);

			// без додатковох інформації в історії
			// resultsListHistory(result, resultList, timeUnit);
			// updateLocalStorage(result, timeUnit);
			// updateLastResult(result, lastResultSpan, timeUnit);
		});
	});

	// чекбокси додавання до початкової дати: +7 днів (тиждень) / +30 днів (місяць)
	document.getElementById('preset-7days').addEventListener('click', () => {
		let endDate = new Date(endDateInput.value || startDateInput.value); // якщо вибрана кінцева дата, то додасть дні, якщо ні, то встановить стартову дату і+7 днів
		endDate.setDate(endDate.getDate() + 7);
		endDateInput.value = endDate.toISOString().split('T')[0];
		console.log('+тиждень (7 днів), Кінцева дата: ', endDateInput.value);
	});

	document.getElementById('preset-30days').addEventListener('click', () => {
		let endDate = new Date(endDateInput.value || startDateInput.value);
		endDate.setDate(endDate.getDate() + 30);
		endDateInput.value = endDate.toISOString().split('T')[0];
		console.log('+місяць (30 днів), Кінцева дата: ', endDateInput.value);
	});

	// кнопка очищення результату, історії результатів та localStorage
	document.getElementById('clear-button').addEventListener('click', () => {
		clearResults(resultList, lastResultSpan);
		clearLocalStorage();
	});
});
