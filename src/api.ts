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
	skinType: 'steve' | 'alex',
	capeURL: string,
	capeEnabled: boolean,
}

export interface SkinSettings {
	skinType?: 'steve' | 'alex',
	capeEnabled?: boolean,
}

export const TESTING_API_URL = 'http://localhost:8880/api/shittyauth';

export class API {

	private apiURL: string;

	constructor(apiURL: string) {
		this.apiURL = apiURL;
	}

	private async checkResponse(response: Response) {
		if (!response.ok) {
			let json = null;
			try {
				json = await response.json();
			} catch (e) { /* ignored */ }

			throw json?.error || 'Request failed: ' + response.statusText;
		}
	}

	async meta(): Promise<APIMeta> {
		const response = await fetch(this.apiURL + '/meta');

		await this.checkResponse(response);

		return await response.json();
	}

	async login(username: string, password: string): Promise<string> {
		const response = await fetch(this.apiURL + '/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		await this.checkResponse(response);

		const json = await response.json();
		if (!json.token) throw 'Request failed: No token in response';

		return json.token as string;
	}

	async logout(token: string): Promise<void> {
		const response = await fetch(this.apiURL + '/logout', {
			method: 'POST',
			headers: { 'Authorization': token }
		});

		await this.checkResponse(response);
	}

	async me(token: string): Promise<AccountInfo> {
		const response = await fetch(this.apiURL + '/me', {
			headers: { 'Authorization': token }
		});

		await this.checkResponse(response);

		return await response.json();
	}

	async skin(token: string): Promise<SkinInfo> {
		const response = await fetch(this.apiURL + '/skin', {
			headers: { 'Authorization': token }
		});

		await this.checkResponse(response);

		return await response.json();
	}

	async changeUsername(token: string, newUsername: string): Promise<void> {
		const response = await fetch(this.apiURL + '/changeUsername', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ newUsername })
		});

		await this.checkResponse(response);

		return await response.json();
	}

	async changePassword(token: string, oldPassword: string, newPassword: string): Promise<void> {
		const response = await fetch(this.apiURL + '/changePassword', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ oldPassword, newPassword })
		});

		await this.checkResponse(response);

		return await response.json();
	}

	async updateSkinSettings(token: string, skinSettings: SkinSettings) {
		const response = await fetch(this.apiURL + '/updateSkinSettings', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify(skinSettings)
		});

		await this.checkResponse(response);

		return await response.json();
	}

}

export const APIContext = createContext<API>(new API(TESTING_API_URL));
