// отримання результатів з localStorage
export function getResultsFromLocalStorage() {
	return JSON.parse(localStorage.getItem('results')) || [];
}

// оновлення результатів в localStorage
export function updateLocalStorage(result) {
	const results = getResultsFromLocalStorage();
	results.push(result);
	localStorage.setItem('results', JSON.stringify(results));
}

// очищення localStorage
export function clearLocalStorage() {
	localStorage.removeItem('results');
}
