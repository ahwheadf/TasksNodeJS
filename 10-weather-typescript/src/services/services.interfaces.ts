interface IWeatherData {
	weather: Array<{
		description: string,
		icon: string
	}>,
	main: {
		temp: number,
		feels_like: number,
		humidity: number,
		pressure: number
	},
	wind: {
		speed: number
	},
	name: string
};

interface ITokenDictionary {
	token: string,
	city: string
};

interface IArgs {
	h?: boolean,
	s?: string,
	t?: string
}

export { IWeatherData, ITokenDictionary, IArgs };

