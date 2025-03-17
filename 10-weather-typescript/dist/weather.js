"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const args_1 = require("./helpers/args");
const api_service_js_1 = require("./services/api.service.js");
const log_service_js_1 = require("./services/log.service.js");
const storage_service_js_1 = require("./services/storage.service.js");
const saveToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token.length) {
        (0, log_service_js_1.printError)('Не передан токен');
        return;
    }
    try {
        yield (0, storage_service_js_1.saveKeyValue)(storage_service_js_1.TOKEN_DICTIONARY.token, token);
        (0, log_service_js_1.printSuccess)('Токен сохранён');
    }
    catch (e) {
        (0, log_service_js_1.printError)(e instanceof Error ? e.message : 'Неизвестная ошибка');
    }
});
const saveCity = (city) => __awaiter(void 0, void 0, void 0, function* () {
    if (!city.length) {
        (0, log_service_js_1.printError)('Не передан город');
        return;
    }
    try {
        yield (0, storage_service_js_1.saveKeyValue)(storage_service_js_1.TOKEN_DICTIONARY.city, city);
        (0, log_service_js_1.printSuccess)('Город сохранён');
    }
    catch (e) {
        (0, log_service_js_1.printError)(e instanceof Error ? e.message : 'Неизвестная ошибка');
    }
});
const getForcast = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const city = (_a = process.env.city) !== null && _a !== void 0 ? _a : yield (0, storage_service_js_1.getKeyValue)(storage_service_js_1.TOKEN_DICTIONARY.city);
        const weather = yield (0, api_service_js_1.getWeather)(city);
        (0, log_service_js_1.printWheather)(weather, (0, args_1.getIcon)(weather.weather[0].icon));
    }
    catch (e) {
        if (typeof e === 'object' && e !== null) {
            const err = e;
            if (((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
                (0, log_service_js_1.printError)('Неверно указан город');
            }
            else if (((_c = err.response) === null || _c === void 0 ? void 0 : _c.status) === 401) {
                (0, log_service_js_1.printError)('Неверно указан токен');
            }
            else {
                (0, log_service_js_1.printError)(err.message || 'Неизвестная ошибка');
            }
        }
        else {
            (0, log_service_js_1.printError)('Неизвестная ошибка');
        }
    }
});
const initCLI = () => {
    const args = (0, args_1.getArgs)(process.argv);
    if (args.h) {
        return (0, log_service_js_1.printHelp)();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForcast();
};
initCLI();
