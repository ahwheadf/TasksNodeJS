const { parentPort, workerData } = require('worker_threads');

function calculation({ arrayChunk }) {
	const resultData = [];
	for (const item of arrayChunk) {
		if (item % 3 === 0) {
			resultData.push(item);
		}
	}
	return resultData.length;
}

parentPort.postMessage(calculation(workerData));
