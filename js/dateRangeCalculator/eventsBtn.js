import {
	arrayDates,
	calculateDateRangeForFilteredDates,
	filterDayOfWeek,
} from './dates.js';
import { resultsListHistory, updateLastResult } from './dom.js';
import { updateLocalStorage } from './storage.js';
import { checkCorrectDateValue } from './validation.js';
// робота з кнопками
export function handleResultButtons(
	startDateInput,
	endDateInput,
	resultList,
	lastResultSpan
) {
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
}
// кнопки додавання до початкової дати: +7 днів (тиждень) / +30 днів (місяць)
export function handlePresetButtons(startDateInput, endDateInput) {
	document.getElementById('preset-7days').addEventListener('click', () => {
		let endDate = new Date(endDateInput.value || startDateInput.value); // якщо вибрана кінцева дата, то додасть дні, якщо ні, то встановить стартову дату і+7 днів
		endDate.setDate(endDate.getDate() + 7);
		endDateInput.value = endDate.toISOString().split('T')[0];
		console.log('+тиждень (7 днів), Кінцева дата: ', endDateInput.value);
		if (endDateInput) {
			endDateInput.style.border = '';
		}
	});

	document.getElementById('preset-30days').addEventListener('click', () => {
		let endDate = new Date(endDateInput.value || startDateInput.value);
		endDate.setDate(endDate.getDate() + 30);
		endDateInput.value = endDate.toISOString().split('T')[0];
		console.log('+місяць (30 днів), Кінцева дата: ', endDateInput.value);
		if (endDateInput) {
			endDateInput.style.border = '';
		}
	});
}

// кнопка очищення результату, історії результатів та localStorage
export function handleClearButton(resultList, lastResultSpan) {
	document.getElementById('clear-button').addEventListener('click', () => {
		clearResults(resultList, lastResultSpan);
		clearLocalStorage();
	});
}
