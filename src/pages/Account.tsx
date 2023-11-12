import { Component, createSignal, useContext } from 'solid-js';
import Page from './Page';

import styles from './Account.module.css';
import { APIContext } from '../api';
import { errorToString } from '../util';
import { setAccount, token } from '../state';

const Account: Component = () => {
	const api = useContext(APIContext);

	const [username, setUsername] = createSignal('');
	const [oldPassword, setOldPassword] = createSignal('');
	const [newPassword, setNewPassword] = createSignal('');
	const [newPasswordConfirm, setNewPasswordConfirm] = createSignal('');

	const changeUsername = async () => {
		try {
			await api.changeUsername(token()!, username());
			setUsername('');
			setAccount(await api.me(token()!));
			alert('Username changed'); // TODO: better alerts
		} catch (e) {
			alert(errorToString(e)); // TODO: better alerts
		}
	};

	const changePassword = async () => {
		if (newPassword() != newPasswordConfirm()) {
			alert('Passwords don\'t match'); // TODO: better alerts
			return;
		}

		try {
			await api.changePassword(token()!, oldPassword(), newPassword());
			setOldPassword('');
			setNewPassword('');
			setNewPasswordConfirm('');
			alert('Password changed'); // TODO: better alerts
		} catch (e) {
			alert(errorToString(e)); // TODO: better alerts
		}
	};

	return (
		<Page title="Account">
			<h1>Username</h1>
			<div class={styles.usernameSettings}>
				<input type="text" placeholder="New Username" value={username()} oninput={e => setUsername(e.currentTarget.value.trim())} />
				<button onclick={changeUsername} disabled={username().trim().length == 0}>Change Username</button>
			</div>
			<h1>Password</h1>
			<div class={styles.passwordSettings}>
				<input type="password" placeholder="Old password" value={oldPassword()} oninput={e => setOldPassword(e.currentTarget.value.trim())} />
				<input type="password" placeholder="New password" value={newPassword()} oninput={e => setNewPassword(e.currentTarget.value.trim())} />
				<input type="password" placeholder="Confirm new password" value={newPasswordConfirm()} oninput={e => setNewPasswordConfirm(e.currentTarget.value.trim())} />
				<button onclick={changePassword} disabled={oldPassword().length == 0 || newPassword().length == 0 || newPasswordConfirm().length == 0}>Change Password</button>
			</div>
		</Page>
	);
};

export default Account;
