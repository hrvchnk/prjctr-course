// отримання значень при старті та
document.addEventListener('DOMContentLoaded', () => {
	const startDateInput = document.getElementById('start-date');
	const endDateInput = document.getElementById('end-date');
	const resultList = document.querySelector('.result-list');
	const lastResultSpan = document.getElementById('last-result');

	// початкова дата - сьогодні
	const today = new Date();
	const todayFormatted = today.toISOString().split('T')[0];
	startDateInput.value = todayFormatted;

	// чекбокси додавання до початкової дати: +7 днів (тиждень) / +30 днів (місяць)
	document.getElementById('preset-7days').addEventListener('click', () => {
		let endDate = new Date(endDateInput.value || startDateInput.value); // якщо вибрана кінцева дата, то додасть дні, якщо ні, то встановить стартову дату+7 днів
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

	// Завантаження історії з локального сховища
	const results = getResultsFromLocalStorage();
	results.forEach(resultsListHistory);
});

// кнопки
// кнопки розрахунку інтвервалу між датами
document.querySelectorAll('.result-button').forEach(button => {
	button.addEventListener('click', function () {
		const rangeType = this.dataset.range || this.textContent.toLowerCase();
		const startDateInput = document.getElementById('start-date');
		const endDateInput = document.getElementById('end-date');

		const startDate = new Date(startDateInput.value);
		const endDate = new Date(endDateInput.value);

		// Перевірка правильності дат
		if (!checkCorrectDateValue(startDate, endDate)) {
			return;
		}
		dateRangeCalculation(startDate, endDate, rangeType);
	});
});
// очищення історії результатів
document.getElementById('clear-button').addEventListener('click', clearResults);

// фільтрація по робочим дням, вихідним, або усі дні
function filterDayOfWeek(dates, mode) {
	return dates.filter(date => {
		const dayOfWeek = date.getDay();
		switch (mode) {
			case 'all':
				return true;
			case 'workdays':
				return dayOfWeek >= 1 && dayOfWeek <= 5;
			case 'weekends':
				return dayOfWeek === 0 || dayOfWeek === 6;
			default:
				return false;
		}
	});
}

// обчислення інтервалубез фільтрацій
function calculateDateRange(startDate, endDate, rangeType) {
	const diffInMs = Math.abs(endDate - startDate);
	switch (rangeType) {
		case 'seconds':
			return `${Math.floor(diffInMs / 1000)} seconds`;
		case 'minutes':
			return `${Math.floor(diffInMs / (1000 * 60))} minutes`;
		case 'hours':
			return `${Math.floor(diffInMs / (1000 * 60 * 60))} hours`;
		case 'days':
			return `${Math.floor(diffInMs / (1000 * 60 * 60 * 24))} days`;
		default:
			return 'Error';
	}
}

// загальне обчислення обчислення дат
function dateRangeCalculation(startDate, endDate, rangeType) {
	const result = calculateDateRange(startDate, endDate, rangeType);

	if (result === 'Error') {
		console.error('Error: dateRangeCalculation()');
		return;
	}

	resultsListHistory(result);
	updateLocalStorage(result);
	updateLastResult(result);
}

// масив для зберігвання дат перед їх підрахунком, для фільтрації
function arrayDates(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);
	while (currentDate <= endDate) {
		dates.push(new Date(currentDate));

		currentDate.setDate(currentDate.getDate() + 1);
	}
	return dates;
}
// допоміжні функції відображення результатів:
// Додавання результату в список
const resultList = document.querySelector('.result-list');

function resultsListHistory(result) {
	const li = document.createElement('li');
	li.textContent = result;

	resultList.prepend(li); // на початок списку, метод prepend

	// ліміт історії
	if (resultList.children.length > 10) {
		resultList.removeChild(resultList.lastChild);
	}

	console.log(
		'resultsListHistory(result):',
		Array.from(resultList.children).map(item => item.textContent)
	);
}

// Оновлення останнього результату
function updateLastResult(result) {
	const lastResultSpan = document.getElementById('last-result');
	lastResultSpan.textContent = result ? result : '0';

	console.log('updateLastResult():', result);
}

// Очищення історії результатів
function clearResults() {
	resultList.innerHTML = ''; // очищуємо список
	localStorage.removeItem('results'); // очищуємо localStorage
	updateLastResult(null); // обнулити останній результат
}

// localStorage:
function getResultsFromLocalStorage() {
	return JSON.parse(localStorage.getItem('results')) || [];
}
function updateLocalStorage(result) {
	const results = getResultsFromLocalStorage();
	results.push(result);
	localStorage.setItem('results', JSON.stringify(results));
}

// ERROR:
// Перевірка правильності значень дат
function checkCorrectDateValue(startDate, endDate) {
	if (isNaN(startDate) || isNaN(endDate)) {
		alert('Виберіть кінцеву дату');
		return false;
	}
	if (startDate > endDate) {
		alert('Початкова дата менша за кінцеву');
		return false;
	}
	return true;
}
