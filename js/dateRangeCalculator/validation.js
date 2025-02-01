export function checkCorrectDateValue(startDate, endDate) {
	const endDateInput = document.getElementById('end-date');

	if (isNaN(endDate)) {
		console.log('*ERROR* Немає End Date');

		if (endDateInput) {
			// input червоний
			endDateInput.style.border = '2px solid red';
			alert('Виберіть кінцеву дату');

			endDateInput.addEventListener('input', () => {
				// якщо значення є, то прибираємо border
				if (endDateInput.value) {
					endDateInput.style.border = '';
				}
			});
		}

		return false;
	}

	if (startDate > endDate) {
		console.log('*ERRROR* Початкова дата не може бути пізніше кінцевої');
		endDateInput.style.border = '2px solid red';
		alert('Початкова дата не може бути пізніше кінцевої');

		return false;
	}

	if (endDateInput && endDateInput.style.border) {
		endDateInput.style.border = '';
	}

	return true;
}
