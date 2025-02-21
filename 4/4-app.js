const millisecondsInHour = 1000 * 60 * 60;
const millisecondsInMinute = 1000 * 60;
const millisecondsInSecond = 1000;

let endTime = null;

function parseTimeArgs(args) {
  
  const [hours, minutes, seconds] = args.map(Number);

  return (
    hours * millisecondsInHour + 
    minutes * millisecondsInMinute + 
    seconds * millisecondsInSecond
  );
}

function startTimer() {
    const args = process.argv.slice(2);
    const duration = parseTimeArgs(args);
    endTime = Date.now() + duration;
}

function formatTime(ms) {
  if (ms <= 0) return '0 часов, 0 минут, 0 секунд';
  
  const hours = Math.floor(ms / millisecondsInHour);
  const minutes = Math.floor((ms % millisecondsInHour) / millisecondsInMinute);
  const seconds = Math.floor((ms % millisecondsInMinute) / millisecondsInSecond);

  return `${hours} часов, ${minutes} минут, ${seconds} секунд`;
}

function updateTimer() {
  if (!endTime) return;
  
  const remaining = endTime - Date.now();
  console.log(formatTime(remaining));

  if (remaining <= 0) {
    clearInterval(timerId);
    console.log('Время вышло!');
  }
}

// Запуск
startTimer();
const timerId = setInterval(updateTimer, 1000);