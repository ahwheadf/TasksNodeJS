import axios, { AxiosResponse } from 'axios';
import { IWeatherData } from './services.interfaces.js';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';

const getWeather = async (city: string | undefined): Promise<IWeatherData> => {
	const token: string | undefined = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	if (!token) {
		throw new Error('Не задан ключ API, задайте его с помощью -t [API_KEY]');
	}

	const { data }: AxiosResponse<IWeatherData> = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
		params: {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric'
		}
	});

	return data;
}

export { getWeather };