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

// сортування
const sortHolidays = (holidays, sortType) => {
	return holidays.sort((a, b) => {
		const dateA = new Date(a.date.iso);
		const dateB = new Date(b.date.iso);

		if (sortType === 'asc') {
			return dateA - dateB;
		} else {
			return dateB - dateA;
		}
	});
};

// відображення свят
const displayHolidays = (holidays, tableBody, sortType = 'asc') => {
	console.log(`свята сортовані по: ${sortType}`, holidays);
	tableBody.innerHTML = '';

	const sortedHolidays = sortHolidays(holidays, sortType);

	sortedHolidays.forEach(holiday => {
		const row = document.createElement('tr');

		const date = new Date(holiday.date.iso);
		const formattedDate = date.toISOString().split('T')[0]; // тільки рік-місяць-день, без часу

		const dateCell = document.createElement('td');
		dateCell.textContent = formattedDate;

		const nameCell = document.createElement('td');
		nameCell.textContent = holiday.name;

		row.appendChild(dateCell);
		row.appendChild(nameCell);
		tableBody.appendChild(row);

		console.log(`${dateCell.textContent} - ${nameCell.textContent}`);
	});
};

export default displayHolidays;
