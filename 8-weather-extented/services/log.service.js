import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printLanguageSelection = () => {
	console.log(
		dedent`${chalk.bgBlueBright(' LANGUAGE ')} Please select language | Пожалуйста, выберите язык (en/ru)
		-l [LANG]`);
};

const printHelp = (info) => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		${info}
		`
	);
}

const printWheather = (res, icon, info) => {
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} ${info.title} ${res.name}
		${icon} ${res.weather[0].description}
		${info.temp} ${res.main.temp}°C (${info.feelsLike} ${res.main.feels_like}°C)
		${info.humidity} ${res.main.humidity}%
		${info.wind} ${res.wind.speed}м/с
		
		`
	);
};

export { printError, printSuccess, printHelp, printWheather, printLanguageSelection }