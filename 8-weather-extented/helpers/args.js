const getArgs = (args, cityInfo) => {
	const res = {};
	const townArray = [];
	const [executer, file, ...rest] = args;
	rest.forEach((value, index, array) => {
		if (value.charAt(0) == '-') {
			if (index === array.length - 1) {
				res[value.substring(1)] = true;
			} else if (array[index + 1].charAt(0) !== '-' && value.substring(1) === 's') {
				for (let i = index; i < array.length - 1; i++) {
					townArray.push(array[i + 1]);
				};
				if (townArray.length > 3) {
					throw new Error(cityInfo.handedOver3);
				}
				res[value.substring(1)] = townArray;

			} else if (array[index + 1].charAt(0) !== '-') {
				res[value.substring(1)] = array[index + 1];
			} else {
				res[value.substring(1)] = true;
			}
		}
	});
	return res;
};

export { getArgs };