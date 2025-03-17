import { getArgs, getIcon } from './helpers/args';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess, printWheather } from './services/log.service.js';
import { IArgs, IWeatherData } from './services/services.interfaces.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';


const saveToken = async (token: string) => {
	if (!token.length) {
		printError('Не передан токен')
		return;
	}
	try {	
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError(e instanceof Error ? e.message : 'Неизвестная ошибка');
	}
}

const saveCity = async (city: string) => {
	if (!city.length) {
		printError('Не передан город');
		return;
	} 
	try {	
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранён');
	} catch (e) {
		printError(e instanceof Error ? e.message : 'Неизвестная ошибка');
	}
}

const getForcast = async () => {
	try {
		const city: string | undefined = process.env.city ?? await getKeyValue(TOKEN_DICTIONARY.city);
		const weather: IWeatherData = await getWeather(city);
		printWheather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		if (typeof e === 'object' && e !== null) {
            const err = e as { response?: { status?: number }; message?: string };
            
            if (err.response?.status === 404) {
                printError('Неверно указан город');
            } else if (err.response?.status === 401) {
                printError('Неверно указан токен');
            } else {
                printError(err.message || 'Неизвестная ошибка');
            }
        } else {
            printError('Неизвестная ошибка');
        }
	}
	
}

const initCLI = () => {
	const args: IArgs = getArgs(process.argv);
	if(args.h) {
		return printHelp();
	}
	if(args.s) {
		return saveCity(args.s);
	}
	if(args.t) {
		return saveToken(args.t);
	}
	return getForcast();
};

initCLI();