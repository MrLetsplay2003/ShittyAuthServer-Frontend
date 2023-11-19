import { Component, For, createEffect, createSignal } from 'solid-js';
import Page from './Page';
import { AccountInfo, api } from '../api';
import { showMessageDialog, token } from '../state';
import { errorToString } from '../util';
import AccountItem from '../components/AccountItem';

import styles from './Users.module.css';

const Users: Component = () => {
	const [accounts, setAccounts] = createSignal([] as AccountInfo[]);
	const [filter, setFilter] = createSignal('');

	createEffect(async () => {
		try {
			setAccounts(await api().adminAccounts(token()!));
		} catch (e) {
			showMessageDialog('Failed to load accounts', errorToString(e));
		}
	});

	return (
		<Page title="User Administration">
			<input type="text" placeholder='Search for accounts' value={filter()} oninput={e => setFilter(e.currentTarget.value)} />
			<ul class={styles.accountList}>
				<For each={accounts().filter(a => a.id.toLocaleLowerCase().includes(filter().toLocaleLowerCase()) || a.username.toLocaleLowerCase().includes(filter().toLocaleLowerCase()))}>
					{a => <li><AccountItem account={a} /></li>}
				</For>
			</ul>
		</Page>
	);
};

export default Users;
