import { Component, For, createEffect, createSignal } from 'solid-js';
import Page from './Page';
import { AccountInfo, api } from '../api';
import { showDialog, showMessageDialog, token } from '../state';
import { errorToString } from '../util';
import AccountItem from '../components/AccountItem';

import styles from './Users.module.css';

const Users: Component = () => {
	const [accounts, setAccounts] = createSignal([] as AccountInfo[]);
	const [filter, setFilter] = createSignal('');

	createEffect(async () => {
		try {
			setAccounts((await api().adminAccounts(token()!)).sort((a, b) => a.username.localeCompare(b.username)));
		} catch (e) {
			showMessageDialog('Failed to load accounts', errorToString(e));
		}
	});

	const deleteAccount = async (userID: string) => {
		showDialog({
			title: 'Delete account',
			text: 'Are you sure you want to delete the account ' + userID + '?\nThis cannot be undone!',
			buttons: [
				{
					name: 'Delete', action: async () => {
						try {
							await api().adminDeleteAccount(token()!, userID);
							setAccounts(acs => acs.filter(a => a.id != userID));
						} catch (e) {
							showMessageDialog('Failed to delete account', errorToString(e));
						}
					}
				},
				'Cancel'
			]
		});

	};

	const changeUsername = async (userID: string, newUsername: string) => {
		try {
			await api().adminChangeUsername(token()!, userID, newUsername);
			setAccounts(acs => acs.map(a => a.id == userID ? { ...a, username: newUsername } : a));
			showMessageDialog('Username changed', 'The user\'s username has been changed');
		} catch (e) {
			showMessageDialog('Failed to change username', errorToString(e));
		}
	};

	const changePassword = async (userID: string, newPassword: string) => {
		try {
			await api().adminChangePassword(token()!, userID, newPassword);
			showMessageDialog('Password changed', 'The user\'s password has been changed');
		} catch (e) {
			showMessageDialog('Failed to change password', errorToString(e));
		}
	};

	return (
		<Page title="User Administration">
			<input type="text" placeholder='Search for accounts' value={filter()} oninput={e => setFilter(e.currentTarget.value)} />
			<ul class={styles.accountList}>
				<For each={accounts().filter(a => a.id.toLocaleLowerCase().includes(filter().toLocaleLowerCase()) || a.username.toLocaleLowerCase().includes(filter().toLocaleLowerCase()))}>
					{a => <li><AccountItem account={a} changeUsername={newUsername => changeUsername(a.id, newUsername)} changePassword={newPassword => changePassword(a.id, newPassword)} delete={() => deleteAccount(a.id)} /></li>}
				</For>
			</ul>
		</Page>
	);
};

export default Users;
