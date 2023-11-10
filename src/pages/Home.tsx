import { Component } from 'solid-js';
import Page from './Page';
import { account } from '../state';

const Home: Component = () => {
	return (
		<Page title="Home">
			<h1>Welcome, {account()?.username}</h1>
			You can manage your account settings here
		</Page>
	);
};

export default Home;
