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

// Task 1: Calculate the range between two dates
function calculateDateRange(startDate, endDate, rangeType) {
	// const startDate = new Date(document.getElementById('start-date').value);
	// const endDate = new Date(document.getElementById('end-date').value);
	// const rangeType = document.getElementById('range-selector').value;

	if (startDate > endDate) {
		alert('Error startDate > endDate');
		return;
	}

	const diffInMs = Math.abs(endDate - startDate);

	let result;

	switch (rangeType) {
		case 'seconds':
			return `${diffInMs / 1000} seconds`;
		case 'minutes':
			return `${diffInMs / (1000 * 60)} minutes`;
		case 'hours':
			return `${diffInMs / (1000 * 60 * 60)} hours`;
		case 'days':
			return `${diffInMs / (1000 * 60 * 60 * 24)} days`;
		default:
			return 'Error';
	}
}

// btn
document.getElementById('day-button').addEventListener('click', function () {
	const form = document.getElementById('form');

	const formData = new FormData(form);

	const data = Object.fromEntries(formData.entries());

	console.log('Form data:', data);
});

//
