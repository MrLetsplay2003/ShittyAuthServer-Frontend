import { Component, createEffect, createSignal, useContext } from 'solid-js';
import Page from './Page';
import { account, token } from '../state';
import { APIContext, SkinInfo } from '../api';

import styles from './Skin.module.css';

const Skin: Component = () => {
	const [loading, setLoading] = createSignal(true);
	const [skin, setSkin] = createSignal(null as SkinInfo | null);

	const api = useContext(APIContext);

	createEffect(async () => {
		const skin = await api.skin(token()!); // TODO: handle errors
		setSkin(skin);
		setLoading(false);
	});

	return (
		<Page title="Account">
			{loading() && <h1>LOADING</h1>}
			<h1>{account()?.username}</h1>
			<h2>Skin Type</h2>
			<select value={skin()?.skinType}>
				<option value="steve">Classic (Steve)</option>
				<option value="alex">Slim (Alex)</option>
			</select>
			<hr />
			<h2>Skin</h2>
			<img src={skin()?.skinURL} width={200} class={styles.skinImage} />
			<h3>Upload new skin</h3>
			<input type="file" />
			<button>Upload</button>
			<hr />
			<h2>Cape</h2>
			<img src={skin()?.capeURL} width={200} class={styles.skinImage} />
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
