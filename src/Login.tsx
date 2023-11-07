import { Component } from 'solid-js';
import { AccountInfo, account, setAccount } from './state';

import styles from './Login.module.css';

const Login: Component = () => {
	return (
		<div class={styles.login}>
			<span class={styles.loginTitle}>Log In</span>
			<label for="loginUser">Username</label>
			<input id="loginUser" type="text" />
			<label for="loginPassword">Password</label>
			<input id="loginPassword" type="password" />
			<button onclick={() => {
				setAccount({ id: 'onetwothree', name: 'FancyUser123', isAdmin: true } as AccountInfo);
				console.log(account());
			}}>Log In</button>
		</div>
	);
};

export default Login;
