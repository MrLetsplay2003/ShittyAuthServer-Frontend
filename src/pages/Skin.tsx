import { Component } from 'solid-js';
import Page from './Page';
import { account } from '../state';

const Skin: Component = () => {
	return (
		<Page title="Account">
			<h1>{account()?.name}</h1>
			<h2>Skin Type</h2>
			<select>
				<option>Classic (Steve)</option>
				<option>Slim (Alex)</option>
			</select>
			<hr />
			<h2>Skin</h2>
			<img src={'/icon.svg'} />
			<h3>Upload new skin</h3>
			<input type="file" />
			<button>Upload</button>
			<hr />
			<h2>Cape</h2>
			<img src={'/icon.svg'} />
			<br />
			<label for="enableCape">Enable cape</label>
			<input id="enableCape" type="checkbox" />
			<h3>Upload new cape</h3>
			<input type="file" />
		</Page >
	);
};

export default Skin;
