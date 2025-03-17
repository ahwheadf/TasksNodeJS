const getArgs = (args: string[]): object => {
	const res: { [key: string]: string | boolean } = {};
	const [executer, file, ...rest]: [...string[]] = args;
	rest.forEach((value: string, index: number, array: string[]) => {
        if (value.startsWith('-')) {
            const key: string = value.slice(1);
            
            if (index === array.length - 1 || array[index + 1].startsWith('-')) {
                res[key] = true;
            } else {
                res[key] = array[index + 1];
            }
        }
    });
    
    return res;
};

const getIcon = (icon: string): string => {
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
		default:
			return ' ';
	}
};

export { getArgs, getIcon };