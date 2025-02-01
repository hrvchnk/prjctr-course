// отримання результатів з localStorage
export function getResultsFromLocalStorage() {
	return JSON.parse(localStorage.getItem('results')) || [];
}
// оновлення результатів в localStorage + початкова, кінцева дата і формат розрахунку
export function updateLocalStorage(result, timeUnit, startDate, endDate) {
	const results = getResultsFromLocalStorage();
	results.push({ result, timeUnit, startDate, endDate });
	localStorage.setItem('results', JSON.stringify(results));
}

// очищення localStorage
export function clearLocalStorage() {
	localStorage.removeItem('results');
}
