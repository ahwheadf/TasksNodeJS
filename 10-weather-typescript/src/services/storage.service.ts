import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { ITokenDictionary } from './services.interfaces.js';

const filePath: string = join(homedir(), 'wheather-data.json');

const TOKEN_DICTIONARY: ITokenDictionary = {
	token: 'token',
	city: 'city'
}

const saveKeyValue = async (key: string, value: string) => {
	let data: { [key: string]: string } = {};
	if (await isExist(filePath)) {
		const file: string = await promises.readFile(filePath, 'utf-8');
		data = JSON.parse(file);
	}
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string): Promise<string | undefined> => {
	if (await isExist(filePath)) {
		const file: string = await promises.readFile(filePath, 'utf-8');
		const data: { [key: string]: string } = JSON.parse(file);
		return data[key];
	}
	return undefined;
};

const isExist = async (path: string): Promise<boolean> => {
	try {
		await promises.stat(path);
		return true;
	} catch (e) {
		return false;
	}
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };