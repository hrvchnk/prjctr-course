// Змінив стилі для комопнентів;
// прибрав form за твоїми вказівками;
// додав збереження в локальне сховище, отримання данних з нього при перезавантаженні сторінки;
// після натискання на кнопки розрахунок виводиться не в консоль, а в label результату і записується в історію;
// додав кнопку очищення історіі;
// додав чекбокси +тижден і +місяць до початкової дати (ще не виконав їх функціонал, тільки вивід в консоль натискання їх)
// Функція для обчислення
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

// Список для результатів
const resultList = document.querySelector('.result-list');

// Збереження результатів в локальне сховище
function saveResultsToLocalStorage(results) {
	localStorage.setItem('results', JSON.stringify(results));
}

function getResultsFromLocalStorage() {
	return JSON.parse(localStorage.getItem('results')) || [];
}

// Завантаження результатів при старті
document.addEventListener('DOMContentLoaded', () => {
	const startDateInput = document.getElementById('start-date');

	// Сьогоднішня дата для input
	const today = new Date();
	const todayFormatted = today.toISOString().split('T')[0];
	startDateInput.value = todayFormatted;

	// Завантаження історії з локального сховища
	const results = getResultsFromLocalStorage();
	results.forEach(createResultElement);
});

// Додавання результату в список
function createResultElement(result) {
	const li = document.createElement('li');
	li.className = 'result-item';

	const resultText = document.createElement('span');
	resultText.textContent = result;

	li.appendChild(resultText);
	resultList.appendChild(li);
}

// Очищення історії результатів
function clearResults() {
	resultList.innerHTML = ''; // очищуємо список
	localStorage.removeItem('results'); // очищуємо localStorage
	updateLastResult(null); // обнулити останній результат
}
document.getElementById('clear-button').addEventListener('click', clearResults);

// Оновлення останнього результату
function updateLastResult(result) {
	const lastResultSpan = document.getElementById('last-result');
	lastResultSpan.textContent = result ? result : '0';
}

// Обробка кнопок
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

		const result = calculateDateRange(startDate, endDate, rangeType);
		if (result !== 'Error') {
			createResultElement(result);
			storeResultInLocalStorage(result);
			updateLastResult(result);
		} else {
			console.error('Error calculateDateRange');
		}
	});
});

// Перевірка правильності значень дат
function checkCorrectDateValue(startDate, endDate) {
	if (isNaN(startDate) || isNaN(endDate)) {
		alert('Виберіть дату');
		return false;
	}
	if (startDate > endDate) {
		alert('Початкова дата менша за кінцеву');
		return false;
	}
	return true;
}

// Збереження результатів в локальне сховище
function storeResultInLocalStorage(result) {
	const results = getResultsFromLocalStorage();
	results.push(result);
	saveResultsToLocalStorage(results);
}

// чекбокси +тиждень, +місяць
document.querySelectorAll('.custom-checkbox').forEach(item => {
	item.addEventListener('click', function () {
		const isChecked = item.checked;
		const startDateInput = document.getElementById('start-date');
		const endDateInput = document.getElementById('end-date');

		// Отримуємо поточну початкову дату
		const startDate = new Date(startDateInput.value);

		if (item.checked) {
			console.log(`Checkbox ${item.id} is selected.`);
		} else {
			console.log(`Checkbox ${item.id} is deselected.`);
		}
	});
});
