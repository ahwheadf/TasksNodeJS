const EventEmitter = require('events');

const myEmitter = new EventEmitter();

const multiply = require('./multiply.js');
const difference = require('./difference.js');
const sum = require('./sum.js');

multiply(myEmitter);
difference(myEmitter);
sum(myEmitter);

const args = process.argv.slice(2);
const [firstNumber, secondNumber, operation] = args.map((el, i) => i < 2 ? Number(el) : el);

myEmitter.on('result', (result) => {
	console.log(result);
});
myEmitter.emit(`${operation}`, firstNumber, secondNumber);