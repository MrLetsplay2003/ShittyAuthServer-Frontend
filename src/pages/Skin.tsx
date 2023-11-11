import { Component, createEffect, createSignal, useContext } from 'solid-js';
import Page from './Page';
import { account, setGlobalError, token } from '../state';
import { APIContext, SkinInfo } from '../api';

import styles from './Skin.module.css';
import { errorToString } from '../util';

const Skin: Component = () => {
	const [loading, setLoading] = createSignal(true);
	const [skin, setSkin] = createSignal(null as SkinInfo | null);

	const api = useContext(APIContext);

	createEffect(async () => {
		try {
			const skin = await api.skin(token()!);
			setSkin(skin);
			setLoading(false);
		} catch (e) {
			setGlobalError(errorToString(e));
		}
	});

	return (
		<Page title="Account">
			{loading() && <h1>Loading...</h1>}
			<h1>{account()?.username}</h1>
			<h2>Skin Type</h2>
			<select value={skin()?.skinType}>
				<option value="steve">Classic (Steve)</option>
				<option value="alex">Slim (Alex)</option>
			</select>
			<hr />
			<h2>Skin</h2>
			<img src={skin()?.skinURL} alt={'Skin failed to load'} width={200} class={styles.skinImage} />
			<h3>Upload new skin</h3>
			<input type="file" />
			<button>Upload</button>
			<hr />
			<h2>Cape</h2>
			<img src={skin()?.capeURL} alt={'Cape failed to load'} width={200} class={styles.skinImage} />
			<br />
			<label for="enableCape">Enable cape</label>
			<input id="enableCape" type="checkbox" checked={skin()?.capeEnabled} />
			<h3>Upload new cape</h3>
			<input type="file" />
			<button>Upload</button>
		</Page >
	);
};

export default Skin;
