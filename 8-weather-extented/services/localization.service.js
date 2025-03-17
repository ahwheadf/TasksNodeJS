import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { deleteKeyValue } from './storage.service.js';


export const setLanguage = async (lang = 'en') => {
	if (lang !== 'en' && lang !== 'ru') {
		await deleteKeyValue('language');
		throw new Error(`Localization is not supported `);
	}

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);
	const correctPath = join(__dirname, `../language/${lang}.json`);

	// if (!existsSync(correctPath)) {
	// 	throw new Error(`Localization file not found: ${correctPath}`);
	// }
	const langPath = join(__dirname, './language');
	const currentLanguage = JSON.parse(readFileSync(correctPath));
	return currentLanguage;
};

