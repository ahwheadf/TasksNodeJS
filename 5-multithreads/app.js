function getResult() {
	performance.mark('start');
	const result = [];
	const array = Array.from({ length: 300000 }, (el) => Math.round(Math.random(el) * 10));
	for (item of array) {
		if (item % 3 === 0) {
			result.push(item);
		}
	}
	performance.mark('end');
	performance.measure('calculation', 'start', 'end');
	console.log(`Время: ${performance.getEntriesByName('calculation').pop().duration.toFixed(1)}`);
	return result.length;
}

console.log(getResult());