import { Component } from 'solid-js';
import Page from './Page';

const Account: Component = () => {
	return (
		<Page title="Account">
			<h1>Username</h1>
			<input type="text" />
			<button>Change Username</button>
			<h1>Password</h1>
			<input type="text" placeholder="Old password" /><br />
			<input type="text" placeholder="New password" /><br />
			<input type="text" placeholder="Confirm new password" /><br />
			<button>Change Password</button>
		</Page>
	);
};

export default Account;
