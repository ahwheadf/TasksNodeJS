"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIcon = exports.getArgs = void 0;
const getArgs = (args) => {
    const res = {};
    const [executer, file, ...rest] = args;
    rest.forEach((value, index, array) => {
        if (value.startsWith('-')) {
            const key = value.slice(1);
            if (index === array.length - 1 || array[index + 1].startsWith('-')) {
                res[key] = true;
            }
            else {
                res[key] = array[index + 1];
            }
        }
    });
    return res;
};
exports.getArgs = getArgs;
const getIcon = (icon) => {
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
exports.getIcon = getIcon;
