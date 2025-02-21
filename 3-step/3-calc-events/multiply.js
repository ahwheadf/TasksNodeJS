module.exports = (emitter) => {
	emitter.on('multiply', (firstNumber, secondNumber) => {
		emitter.emit('result', firstNumber * secondNumber);
	})
}

