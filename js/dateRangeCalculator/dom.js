//початкові данні:  встановлення сьогодні - StartDate в input
export function initStartDateInput(startDateInput) {
	const today = new Date();
	startDateInput.value = today.toISOString().split('T')[0];
}

// відображення і оновлення результату
export function updateLastResult(result, lastResultSpan) {
	lastResultSpan.textContent = result || '0';
}
// додавання і відображення 10 останніх результатів в списку історії
export function resultsListHistory(
	result,
	resultList,
	timeUnit,
	startDate,
	endDate
) {
	const li = document.createElement('li');
	li.textContent = ` ${startDate} - ${endDate}: ${result}`;
	resultList.prepend(li);

	// обмеження історії результатів до 10 останніх резлуьтатів
	if (resultList.children.length > 10) {
		resultList.removeChild(resultList.lastChild);
	}
}

// очищення результату і історії
export function clearResults(resultList, lastResultSpan) {
	resultList.innerHTML = '';
	updateLastResult(null, lastResultSpan);
}
