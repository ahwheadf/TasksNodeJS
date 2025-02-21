module.exports = (emitter) => {
	emitter.on('difference', (firstNumber, secondNumber) => {
		emitter.emit('result', firstNumber - secondNumber);
	})
}