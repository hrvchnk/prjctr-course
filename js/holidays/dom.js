// ДОМ елементи
export const initDOM = () => {
	const countrySelect = document.getElementById('country-selector');
	const yearSelector = document.getElementById('year-selector');
	const showHolidaysButton = document.getElementById('show-holidays-button');

	return { countrySelect, yearSelector, showHolidaysButton };
};

// список країн (за замовчуванням і отримання списку країн з прапором)
export const updateCountryList = (countries, countrySelect) => {
	const defaultOption = document.createElement('option');
	defaultOption.value = 'all';
	defaultOption.textContent = 'Select country';
	countrySelect.appendChild(defaultOption);

	countries.forEach(country => {
		const option = document.createElement('option');
		option.value = country['iso-3166']; // код країни
		option.textContent = `${country.country_name} ${country.flag_unicode}`;
		countrySelect.appendChild(option);
	});
};

// відображення списку років
export const updateYearList = yearSelector => {
	for (let i = 2001; i <= 2049; i++) {
		const option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		yearSelector.appendChild(option);
	}
	yearSelector.value = new Date().getFullYear();
};

// відображення свят
export const displayHolidays = data => {
	console.log('усі свята разом', data);
};
