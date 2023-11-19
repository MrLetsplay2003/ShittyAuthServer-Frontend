import { Component, createSignal } from 'solid-js';
import Page from './Page';

import styles from './Account.module.css';
import pageStyles from './Page.module.css';
import { api } from '../api';
import { errorToString } from '../util';
import { account, setAccount, showMessageDialog, token } from '../state';

const Account: Component = () => {
	const [username, setUsername] = createSignal('');
	const [oldPassword, setOldPassword] = createSignal('');
	const [newPassword, setNewPassword] = createSignal('');
	const [newPasswordConfirm, setNewPasswordConfirm] = createSignal('');

	const changeUsername = async () => {
		try {
			await api().changeUsername(token()!, username());
			setAccount(await api().me(token()!));
			setUsername('');
			showMessageDialog('Username changed', 'Your username was changed to ' + account()?.username);
		} catch (e) {
			showMessageDialog('Failed to change username', errorToString(e));
		}
	};

	const changePassword = async () => {
		if (newPassword() != newPasswordConfirm()) {
			showMessageDialog('Cannot change password', 'Passwords don\'t match');
			return;
		}

		try {
			await api().changePassword(token()!, oldPassword(), newPassword());
			setOldPassword('');
			setNewPassword('');
			setNewPasswordConfirm('');
			showMessageDialog('Password changed', 'Successfully changed your password');
		} catch (e) {
			showMessageDialog('Cannot change password', errorToString(e));
		}
	};

	return (
		<Page title="Account">
			<div class={pageStyles.optionsPage}>
				<div class={pageStyles.optionsSection}>
					<h1>Username</h1>
					<span>Your username is currently "{account()?.username}"</span>
					<div class={styles.usernameSettings}>
						<input type="text" placeholder="New Username" value={username()} oninput={e => setUsername(e.currentTarget.value.trim())} />
						<button onclick={changeUsername} disabled={username().trim().length == 0}>Change Username</button>
					</div>
				</div>

				<div class={pageStyles.optionsSection}>
					<h1>Password</h1>
					<div class={styles.passwordSettings}>
						<input type="password" placeholder="Old password" value={oldPassword()} oninput={e => setOldPassword(e.currentTarget.value.trim())} />
						<input type="password" placeholder="New password" value={newPassword()} oninput={e => setNewPassword(e.currentTarget.value.trim())} />
						<input type="password" placeholder="Confirm new password" value={newPasswordConfirm()} oninput={e => setNewPasswordConfirm(e.currentTarget.value.trim())} />
						<button onclick={changePassword} disabled={oldPassword().length == 0 || newPassword().length == 0 || newPasswordConfirm().length == 0}>Change Password</button>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Account;
