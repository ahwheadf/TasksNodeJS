import chalk from 'chalk';
import dedent from 'dedent';
import { IWeatherData } from './services.interfaces.js';

const printError = (error: string): void => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message: string): void => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи 
		-t [API_KEY] для сохранения токена 
		`
	);
}

const printWheather = (res: IWeatherData, icon: string) => {
	console.log(
		dedent`${chalk.bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon} ${res.weather[0].description}
		Температура ${res.main.temp} (Ощущается как ${res.main.feels_like})
		Влажность: ${res.main.humidity}%
		Скорость ветра: ${res.wind.speed}м/с
		`
	);
};

export { printError, printSuccess, printHelp, printWheather }