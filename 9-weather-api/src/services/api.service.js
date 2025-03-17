import axios from 'axios';

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

export const getWeatherData = async (city, apiKey, next) => {
	try {
		const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
			params: {
				q: city,
				appid: apiKey,
				lang: 'ru',
				units: 'metric'
			}
		});
		console.log(data);
		return data;		
	} catch(e) {
		const { status, data } = e.response;
		const err = new Error();
		
		switch(status) {
			case 401: 
				err.message = 'Неверный API-ключ';
				err.status = 401;
				next(err);
				break;
			case 404: 
				err.message = `Город ${city} не найден`;
				err.status = 404;
				next(err);
				break;
			default: 
				next(new Error('Ошибка при получении погоды'));
		}
	}
};