export const handleError = error => {
	if (error.response) {
		console.log(`ERROR: ${error.response.status}`);
		alert(`ERROR: ${error.response.status}`);
	} else if (error.message) {
		console.log(`ERROR: ${error.message}`);
		alert();
	} else {
		alert('ERROR UNKNOWN');
	}
};
