import { Component, createEffect, createSignal } from 'solid-js';
import Page from './Page';

import styles from './Settings.module.css';
import pageStyles from './Page.module.css';
import { GlobalSettings, api } from '../api';
import { showMessageDialog, token } from '../state';
import { errorToString } from '../util';

const Settings: Component = () => {
	const [globalSettings, setGlobalSettings] = createSignal({} as GlobalSettings);

	const updateGlobalSettings = async (settings: GlobalSettings) => {
		try {
			await api().adminUpdateGlobalSettings(token()!, settings);
			setGlobalSettings(await api().adminGlobalSettings(token()!));
		} catch (e) {
			showMessageDialog('Failed to update skin settings', errorToString(e));
		}
	};

	createEffect(async () => {
		try {
			setGlobalSettings(await api().adminGlobalSettings(token()!));
		} catch (e) {
			showMessageDialog('Failed to load settings', errorToString(e));
		}
	});

	return (
		<Page title="Server Settings">
			<div class={pageStyles.optionsPage}>
				<div class={pageStyles.optionsSection}>
					<h1>Settings</h1>
					<div class={pageStyles.checkboxOption}>
						<label for="authlibCompat">Authlib-injector compat (Requires restart)</label>
						<input id="authlibCompat" type="checkbox" checked={globalSettings().authlibCompat} onchange={e => updateGlobalSettings({ authlibCompat: e.currentTarget.checked })} />
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Settings;
