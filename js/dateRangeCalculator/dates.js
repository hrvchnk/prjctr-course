// створення масиву дат між початковою та кінцевою датами
export function arrayDates(startDate, endDate) {
	const dates = [];
	let currentDate = new Date(startDate);
	while (currentDate <= endDate) {
		dates.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return dates;
}

// фільтрація дат за робочими днями, вихідними чи всіма
export function filterDayOfWeek(dates, filterMode) {
	return dates.filter(date => {
		const dayOfWeekIndex = date.getDay();
		switch (filterMode) {
			case 'all':
				return true;
			case 'workdays':
				return dayOfWeekIndex >= 1 && dayOfWeekIndex <= 5;
			case 'weekends':
				return dayOfWeekIndex === 0 || dayOfWeekIndex === 6;
			default:
				return false;
		}
	});
}

// конвертація мілісекунд у різні формати
export function convertMilliseconds(durationInMs, timeUnit) {
	const timeUnitMs = {
		seconds: 1000,
		minutes: 1000 * 60,
		hours: 1000 * 60 * 60,
		days: 1000 * 60 * 60 * 24,
	};

	if (timeUnitMs[timeUnit]) {
		return Math.floor(durationInMs / timeUnitMs[timeUnit]);
	} else {
		return null;
	}
}

// основна функція рохрахунку
export function calculateDateRangeForFilteredDates(filteredDates, timeUnit) {
	if (timeUnit === 'days') {
		return `${filteredDates.length} days`;
	}

	let totalMilliseconds = 0;

	for (let i = 0; i < filteredDates.length - 1; i++) {
		const diff = Math.abs(filteredDates[i + 1] - filteredDates[i]);
		totalMilliseconds += diff;
	}

	const convertedValue = convertMilliseconds(totalMilliseconds, timeUnit);

	if (convertedValue !== null) {
		return `${convertedValue} ${timeUnit}`;
	} else {
		return 'Error';
	}
}
