#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from './services/api.service.js';
import { setLanguage } from './services/localization.service.js';
import { printError, printHelp, printSuccess, printWheather, printLanguageSelection } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

let language = null;

const saveToken = async (token) => {
	if (!token.length) {
		printError(language.token.failed);
		return;
	}
	try {	
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess(language.token.saved);
	} catch (e) {
		printError(e.message);
	}
}

const saveCity = async (city) => {
	if (!city.length) {
		printError(language.city.handed);
		return;
	} 
	try {	
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess(language.city.saved);
	} catch (e) {
		printError(e.message);
	}
}

const getForcast = async () => {
	try {
		const isSelectLanguage = await selectLanguage();

		if (!isSelectLanguage) {
			return;
		}

		const cities = process.env.city ?? await getKeyValue(TOKEN_DICTIONARY.city);
		if (typeof cities === 'undefined') {
			printError(language.city.handed);
			return;
		}
		const weathers = await getWeather(cities, language.locale, language.token.notSpecified);
		for (let weather of weathers) {
			printWheather(weather, getIcon(weather.weather[0].icon), language.weather);
		}
		
	} catch (e) {
		if (e?.response?.status == 404) {
			printError(language.city.incorrect);
		} else if (e?.response?.status == 401) {
			printError(language.token.incorrect);
		} else {
			printError(e.message);
		}
	}
	
}

const selectLanguage = async () => {
	try {
		const language = await getKeyValue(TOKEN_DICTIONARY.language);
		if (typeof language === 'undefined') {
			printLanguageSelection();
			return false;
		} else {
			return true;
		}

	} catch (e) {
		printError(e.message);
	}
}

const saveLanguage = async (lang) => {
	try {
		await saveKeyValue(TOKEN_DICTIONARY.language, lang);
		language = await setLanguage(lang);
		printSuccess(language.lang);
	} catch (e) {
		printError(e.message);
	}
};

const initCLI = async () => {
	try {
		language = await setLanguage(await getKeyValue(process.env.city ?? TOKEN_DICTIONARY.language));
		const args = getArgs(process.argv, language.city);
		

		if(args.h) {
			return printHelp(language.help);
		}
		if(args.s) {
			return saveCity(args.s);
		}
		if(args.t) {
			return saveToken(args.t);
		}
		if(args.l) {
			return saveLanguage(args.l);
		}
		return getForcast();
	} catch (e) {
		printError(e.message);
	}
	
};

await initCLI();