import { Component } from 'solid-js';
import Page from './Page';

import styles from './Settings.module.css';
import pageStyles from './Page.module.css';

const Settings: Component = () => {
	return (
		<Page title="Server Settings">
			<div class={pageStyles.optionsPage}>
				<div class={pageStyles.optionsSection}>
					<h1>Settings</h1>
				</div>
			</div>
		</Page>
	);
};

export default Settings;
