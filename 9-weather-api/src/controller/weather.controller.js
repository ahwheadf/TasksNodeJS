import { getIcon, getWeatherData } from '../services/api.service.js'
import { printWheather } from '../services/logger.service.js';

const variableValidation = (city, apiKey, next) => {
    if (!city || !apiKey) {
        const err = new Error('Город или токен не переданы!');
        err.status = 400;
        return next(err);
    }
    return true;
};

export const getWeather = async (req, res, next) => {
	const { city, apiKey } = req.session;
	const isValid = variableValidation(city, apiKey, next);
	if (!isValid) return;
	const data = await getWeatherData(city, apiKey, next);
	const icon = getIcon(data.weather[0].icon);
	const weather = printWheather(data, icon);
	res.send(weather);
};

export const transferWeather = (req, res, next) => {
	const { city, apiKey } = req.body;
	const isValid = variableValidation(city, apiKey, next);
	if (!isValid) return;
	req.session.city = city;
	req.session.apiKey = apiKey;

	res.send('Город и токен переданы!');
};

export const deleteWeather = (req, res, next) => {
	const { city, apiKey } = req.session;
	if (city && apiKey) {
		req.session.city = undefined;
		req.session.apiKey = undefined;
		res.send('Город и токен успешно удалены!');
	} else {
		const isValid = variableValidation(city, apiKey, next);
		if (!isValid) return;
	}
}