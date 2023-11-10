import { createContext } from 'solid-js';

export interface APIMeta {
	version: number
}

export interface AccountInfo {
	id: string,
	username: string,
	isAdmin: boolean,
}

export interface SkinInfo {
	skinURL: string,
	skinType: 'steve' | 'alex'
	capeURL: string,
	capeEnabled: boolean,
}

export const TESTING_API_URL = 'http://localhost:8880/api/shittyauth';

export class API {

	private apiURL: string;

	constructor(apiURL: string) {
		this.apiURL = apiURL;
	}

	async meta(): Promise<APIMeta> {
		const response = await fetch(this.apiURL + '/meta');

		if (!response.ok) throw 'Request failed: ' + response.statusText;

		return await response.json();
	}

	async login(username: string, password: string): Promise<string> {
		const response = await fetch(this.apiURL + '/login', {
			method: 'POST',
			body: JSON.stringify({ username, password })
		});

		if (!response.ok) throw 'Request failed: ' + response.statusText;

		const json = await response.json();
		if (!json.token) throw 'Request failed: No token in response';

		return json.token as string;
	}

	async logout(token: string): Promise<void> {
		const response = await fetch(this.apiURL + '/logout', {
			method: 'POST',
			headers: { 'Authorization': token }
		});

		if (!response.ok) throw 'Request failed: ' + response.statusText;
	}

	async me(token: string): Promise<AccountInfo> {
		const response = await fetch(this.apiURL + '/me', {
			headers: { 'Authorization': token }
		});

		if (!response.ok) throw 'Request failed: ' + response.statusText;

		return await response.json();
	}

	async skin(token: string): Promise<SkinInfo> {
		const response = await fetch(this.apiURL + '/skin', {
			headers: { 'Authorization': token }
		});

		if (!response.ok) throw 'Request failed: ' + response.statusText;

		return await response.json();
	}

}

export const APIContext = createContext<API>(new API(TESTING_API_URL));
