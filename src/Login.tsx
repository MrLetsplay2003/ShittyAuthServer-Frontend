import { Component, createSignal, useContext } from 'solid-js';
import { account, setAccount, setToken } from './state';

import styles from './Login.module.css';
import { APIContext } from './api';

const Login: Component = () => {
	const [loading, setLoading] = createSignal(false);
	const api = useContext(APIContext);

	let loginUser: HTMLInputElement | undefined;
	let loginPassword: HTMLInputElement | undefined;

	return (
		<div class={styles.login}>
			<span class={styles.loginTitle}>Log In</span>
			<label for="loginUser">Username</label>
			<input id="loginUser" type="text" ref={loginUser} />
			<label for="loginPassword">Password</label>
			<input id="loginPassword" type="password" ref={loginPassword} />
			<button disabled={loading()} onclick={async () => {
				setLoading(true);

				const token = await api.login(loginUser!.value, loginPassword!.value); // TODO: handle error
				console.log(token);
				setToken(token);

				const accountInfo = await api.me(token); // TODO: handle error
				setAccount(accountInfo);
				console.log(account());
			}}>Log In</button>
		</div>
	);
};

export default Login;
