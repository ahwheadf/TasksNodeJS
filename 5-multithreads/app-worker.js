const { Worker } = require('worker_threads');
const os = require('os');

const THREADPOOL_SIZE = os.availableParallelism();
const ARRAY_SIZE = 300000;

function initialAndSplitData (arraySize, piecesCount) {
	const array = [];
	const result = [];
	for (let i = 0; i < arraySize; i++) {
		array.push(Math.round(Math.random() * 10));
	};
	const chunk = Math.ceil(array.length / piecesCount);
	for (let i = 0; i < array.length; i += chunk) {
		result.push(array.slice(i, i + chunk));
	};

	return result;
};

function getResult(arrayChunk) {
	return new Promise((resolve, reject) => {
		const worker = new Worker('./worker.js', {
			workerData: { arrayChunk }
		});

		worker.on('message', (msg) => {
			resolve(msg);
		})

		worker.on('error', (err) => {
			reject(err);
		})
	});
};

async function main() {
	try {
		performance.mark('start');
		const array = initialAndSplitData(ARRAY_SIZE, THREADPOOL_SIZE);
		const result = (await Promise.all(array.map(element => getResult(element))))
			.reduce((acc, current) => acc + current);
		performance.mark('end');
		performance.measure('worker', 'start', 'end');
		console.log(`Время: ${performance.getEntriesByName('worker').pop().duration.toFixed(1)}`);
		console.log(result);
		return result;
	} catch (e) {
		console.error(e.message);
	}

}

main();