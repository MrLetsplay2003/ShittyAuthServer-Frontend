import { Component } from 'solid-js';
import Page from './Page';

import styles from './Account.module.css';

const Account: Component = () => {
	return (
		<Page title="Account">
			<h1>Username</h1>
			<div class={styles.usernameSettings}>
				<input type="text" />
				<button>Change Username</button>
			</div>
			<h1>Password</h1>
			<div class={styles.passwordSettings}>
				<input type="text" placeholder="Old password" />
				<input type="text" placeholder="New password" />
				<input type="text" placeholder="Confirm new password" />
				<button>Change Password</button>
			</div>
		</Page>
	);
};

export default Account;
