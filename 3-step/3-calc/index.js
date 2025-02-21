import { difference } from './difference.js';
import { multiply } from './multiply.js';
import { sum } from './sum.js';

function calculate() {
	const args = process.argv.slice(2);
	const [firstNumber, secondNumber, operation] = args.map((el, i) => i < 2 ? Number(el) : el);

	switch(operation) {
		case 'sum':
			return sum(firstNumber, secondNumber);
		case 'mul':
			return multiply(firstNumber, secondNumber);
		case 'dif':
			return difference(firstNumber, secondNumber);
		default:
			return new Error('Не правильный ввод');
	}
}

console.log(calculate());
