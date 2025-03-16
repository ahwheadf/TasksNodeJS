export const printWheather = (data, icon) => {
	return `
		Погода в городе ${data.name}
		${icon} ${data.weather[0].description}
		Температура ${data.main.temp} (Ощущается как ${data.main.feels_like})
		Влажность: ${data.main.humidity}%
		Скорость ветра: ${data.wind.speed}м/с
		`
};