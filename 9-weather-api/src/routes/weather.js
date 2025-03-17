import express from 'express';
import { deleteWeather, getWeather, transferWeather } from '../controller/weather.controller.js';

export const weatherRouter = express.Router();

weatherRouter.use(express.json());

weatherRouter.post('/weather', transferWeather);
weatherRouter.get('/weather', getWeather);
weatherRouter.delete('/weather', deleteWeather);
