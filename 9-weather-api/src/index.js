import express from 'express';
import session from 'express-session';
import { apiError } from './err/apiError.js';
import { weatherRouter } from './routes/weather.js';

const port = 8000;
const app = express();

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    maxAge: 86400000 
  }
}));

app.use('/api', weatherRouter);

app.use(apiError);

app.listen(port, () => {
	console.log(`Сервер запущен на http://localhost:${port}`);
});