import { Component } from 'solid-js';
import Page from './Page';

const Admin: Component = () => {
	return (
		<Page title="Admin">
			<h1>Accounts</h1>
			List of accounts...
			<h1>Settings</h1>
			Admin settings...
		</Page>
	);
};

export default Admin;
