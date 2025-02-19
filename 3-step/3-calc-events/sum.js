module.exports = (emitter) => {
	emitter.on('sum', (firstNumber, secondNumber) => {
		emitter.emit('result', firstNumber + secondNumber);
	})
}