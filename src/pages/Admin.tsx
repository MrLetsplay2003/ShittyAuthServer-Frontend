import { Component, For, createEffect, createSignal } from 'solid-js';
import Page from './Page';
import { AccountInfo, api } from '../api';
import { showMessageDialog, token } from '../state';
import { errorToString } from '../util';
import AccountItem from '../components/AccountItem';

import styles from './Admin.module.css';

const Admin: Component = () => {
	const [accounts, setAccounts] = createSignal([] as AccountInfo[]);

	createEffect(async () => {
		try {
			setAccounts(await api().adminAccounts(token()!));
		} catch (e) {
			showMessageDialog('Failed to load accounts', errorToString(e));
		}
	});

	return (
		<Page title="Admin">
			<h1>Accounts</h1>
			<ul class={styles.accountList}>
				<For each={accounts()}>{a => <li><AccountItem account={a} /></li>}</For>
			</ul>
			<h1>Settings</h1>
			Admin settings...
		</Page>
	);
};

export default Admin;
