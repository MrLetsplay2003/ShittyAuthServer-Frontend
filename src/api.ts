import { createSignal } from 'solid-js';

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

export interface TextureInfo {
	id: string,
	name: string,
	url: string,
}

export interface DefaultSkins {
	skins: TextureInfo[],
	slimSkins: TextureInfo[],
}

export class API {

	public apiURL: string;

	constructor(apiURL: string) {
		this.apiURL = apiURL;
	}

	private arrayBufferToBase64(buffer: ArrayBuffer) {
		let binary = '';
		const bytes = new Uint8Array(buffer);
		const len = bytes.byteLength;
		for (let i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
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
	}

	async updateSkinSettings(token: string, skinSettings: SkinSettings): Promise<void> {
		const response = await fetch(this.apiURL + '/updateSkinSettings', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify(skinSettings)
		});

		await this.checkResponse(response);
	}

	async defaultSkins(): Promise<DefaultSkins> {
		const response = await fetch(this.apiURL + '/defaultSkins', {
			method: 'GET',
		});

		await this.checkResponse(response);

		return await response.json();
	}

	async defaultCapes(): Promise<TextureInfo[]> {
		const response = await fetch(this.apiURL + '/defaultCapes', {
			method: 'GET',
		});

		await this.checkResponse(response);

		return await response.json();
	}

	async updateSkin(token: string, skinBytes: ArrayBuffer): Promise<void> {
		const response = await fetch(this.apiURL + '/skin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ skin: this.arrayBufferToBase64(skinBytes) })
		});

		await this.checkResponse(response);
	}

	async resetSkin(token: string, skin: string): Promise<void> {
		const response = await fetch(this.apiURL + '/resetSkin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ skin: skin })
		});

		await this.checkResponse(response);
	}

	async updateCape(token: string, skinBytes: ArrayBuffer): Promise<void> {
		const response = await fetch(this.apiURL + '/cape', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ cape: this.arrayBufferToBase64(skinBytes) })
		});

		await this.checkResponse(response);
	}

	async resetCape(token: string, cape: string): Promise<void> {
		const response = await fetch(this.apiURL + '/resetCape', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ cape: cape })
		});

		await this.checkResponse(response);
	}

	async adminAccounts(token: string): Promise<AccountInfo[]> {
		const response = await fetch(this.apiURL + '/admin/accounts', {
			method: 'GET',
			headers: { 'Authorization': token }
		});

		await this.checkResponse(response);

		return await response.json();
	}

	async adminChangeUsername(token: string, userID: string, newUsername: string): Promise<void> {
		const response = await fetch(this.apiURL + '/admin/changeUsername', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ userID, newUsername })
		});

		await this.checkResponse(response);
	}

	async adminChangePassword(token: string, userID: string, newPassword: string): Promise<void> {
		const response = await fetch(this.apiURL + '/admin/changePassword', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ userID, newPassword })
		});

		await this.checkResponse(response);
	}

	async adminDeleteAccount(token: string, userID: string): Promise<void> {
		const response = await fetch(this.apiURL + '/admin/deleteAccount', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': token },
			body: JSON.stringify({ userID })
		});

		await this.checkResponse(response);
	}

}

export const [api, setAPI] = createSignal(new API(''));
