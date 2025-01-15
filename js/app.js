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
