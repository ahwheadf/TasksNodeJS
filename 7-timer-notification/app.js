const notifier = require('node-notifier');
const milliseconds = require('./constant.js');

let endTime = null;

function parseTimeArgs(args) {
  
  const [hours, minutes, seconds] = args.map(Number);

  return (
    hours * milliseconds.inHour + 
    minutes * milliseconds.inMinute + 
    seconds * milliseconds.inSecond
  );
}

function startTimer() {
    const args = process.argv.slice(2);
    const duration = parseTimeArgs(args);
    endTime = Date.now() + duration;
	return duration;
}

function formatTime(ms) {
	if (ms <= 0) return '0 часов, 0 минут, 0 секунд';
	
	const hours = Math.floor(ms / milliseconds.inHour);
	const minutes = Math.floor((ms % milliseconds.inHour) / milliseconds.inMinute);
	const seconds = Math.floor((ms % milliseconds.inMinute) / milliseconds.inSecond);

	return `${hours} часов, ${minutes} минут, ${seconds} секунд`;
}

function updateTimer() {
	if (!endTime) return;
	
	const remaining = endTime - Date.now();
	console.log(formatTime(remaining));

	if (remaining <= 0) {
		clearInterval(timerId);
		console.log('Время вышло!');
		notifier.notify({
			title: `Таймер на ${formatTime(duration)}`,
			message: 'Время истекло!',
			sound: true,
			type: 'info'
		});
	}
}

// Запуск
const duration = startTimer();
const timerId = setInterval(updateTimer, 1000);

