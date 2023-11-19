import { Component, For, createEffect, createSignal } from 'solid-js';
import Page from './Page';
import { showMessageDialog, token } from '../state';
import { DefaultSkins, SkinInfo, TextureInfo, api } from '../api';

import styles from './Skin.module.css';
import pageStyles from './Page.module.css';
import { errorToString } from '../util';

const Skin: Component = () => {
	const [skin, setSkin] = createSignal(null as SkinInfo | null);
	const [defaultSkins, setDefaultSkins] = createSignal({ skins: [], slimSkins: [] } as DefaultSkins);
	const [defaultCapes, setDefaultCapes] = createSignal([] as TextureInfo[]);

	let skinFileInput: HTMLInputElement | undefined;
	let capeFileInput: HTMLInputElement | undefined;
	let skinChoice: HTMLSelectElement | undefined;
	let capeChoice: HTMLSelectElement | undefined;

	const uploadSkin = async () => {
		const data = await skinFileInput!.files?.[0]?.arrayBuffer();
		if (!data) {
			showMessageDialog('No file', 'Please select a skin file to upload');
			return;
		}

		try {
			await api().updateSkin(token()!, data!);
			setSkin(await api().skin(token()!));
			skinFileInput!.value = '';
			showMessageDialog('Skin changed', 'Your skin has been changed');
		} catch (e) {
			showMessageDialog('Failed to upload skin', errorToString(e));
		}
	};

	const resetSkin = async () => {
		try {
			await api().resetSkin(token()!, skinChoice!.value);
			setSkin(await api().skin(token()!));
			showMessageDialog('Skin changed', 'Your skin has been changed');
		} catch (e) {
			showMessageDialog('Failed to update skin', errorToString(e));
		}
	};

	const uploadCape = async () => {
		const data = await capeFileInput!.files?.[0]?.arrayBuffer();
		if (!data) {
			showMessageDialog('No file', 'Please select a cape file to upload');
			return;
		}

		try {
			await api().updateCape(token()!, data!);
			setSkin(await api().skin(token()!));
			skinFileInput!.value = '';
			showMessageDialog('Cape changed', 'Your cape has been changed');
		} catch (e) {
			showMessageDialog('Failed to upload cape', errorToString(e));
		}
	};

	const resetCape = async () => {
		try {
			await api().resetCape(token()!, capeChoice!.value);
			setSkin(await api().skin(token()!));
			showMessageDialog('Cape changed', 'Your cape has been changed');
		} catch (e) {
			showMessageDialog('Failed to update cape', errorToString(e));
		}
	};

	createEffect(async () => {
		try {
			setSkin(await api().skin(token()!));
			setDefaultSkins(await api().defaultSkins());
			setDefaultCapes(await api().defaultCapes());
		} catch (e) {
			showMessageDialog('Failed to load skin', errorToString(e));
		}
	});

	return (
		<Page title="Skin & Cape">
			<div class={pageStyles.optionsPage}>
				<div class={pageStyles.optionsSection}>
					<h1>Skin Type</h1>
					<select value={skin()?.skinType} onchange={e => api().updateSkinSettings(token()!, { skinType: e.currentTarget.value as 'steve' | 'alex' })}>
						<option value="steve">Classic (Steve)</option>
						<option value="alex">Slim (Alex)</option>
					</select>
				</div>

				<div class={pageStyles.optionsSection}>
					<h1>Skin</h1>
					<h2>Current skin</h2>
					<img src={skin()?.skinURL} alt={'Skin failed to load'} class={styles.skinImage} />
					<h2>Upload new skin</h2>
					<input type="file" ref={skinFileInput} />
					<button onclick={uploadSkin}>Upload</button>

					<h2>Use a default skin</h2>
					<select ref={skinChoice}>
						<For each={defaultSkins().skins}>{c => <option value={c.id}>{c.name}</option>}</For>
						<For each={defaultSkins().slimSkins}>{c => <option value={c.id}>{c.name} (Slim)</option>}</For>
					</select>
					<button onclick={resetSkin}>Use skin</button>
				</div>

				<div class={pageStyles.optionsSection}>
					<h1>Cape</h1>
					<h2>Current cape</h2>
					<img src={skin()?.capeURL} alt={'Cape failed to load'} class={styles.skinImage} />
					<br />
					<div class={pageStyles.checkboxOption}>
						<label for="enableCape">Enable cape</label>
						<input id="enableCape" type="checkbox" checked={skin()?.capeEnabled} onchange={e => api().updateSkinSettings(token()!, { capeEnabled: e.currentTarget.checked })} />
					</div>
					<h2>Upload new cape</h2>
					<input type="file" ref={capeFileInput} />
					<button onclick={uploadCape}>Upload</button>

					<h2>Use a default cape</h2>
					<select ref={capeChoice}>
						<For each={defaultCapes()}>{c => <option value={c.id}>{c.name}</option>}</For>
					</select>
					<button onclick={resetCape}>Use cape</button>
				</div>
			</div>
		</Page >
	);
};

export default Skin;
