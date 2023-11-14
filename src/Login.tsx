import { Component, createSignal } from 'solid-js';
import { setAccount, setToken } from './state';

import styles from './Login.module.css';
import { errorToString } from './util';
import { api } from './api';

const Login: Component = () => {
	const [loading, setLoading] = createSignal(false);
	const [error, setError] = createSignal(null as string | null);

	let loginUser: HTMLInputElement | undefined;
	let loginPassword: HTMLInputElement | undefined;

	return (
		<div class={styles.login}>
			<span class={styles.loginTitle}>Log In</span>
			<span class={styles.loginError}>{error()}</span>
			<label for="loginUser">Username</label>
			<input id="loginUser" type="text" ref={loginUser} />
			<label for="loginPassword">Password</label>
			<input id="loginPassword" type="password" ref={loginPassword} />
			<button disabled={loading()} onclick={async () => {
				setLoading(true);

				try {
					const token = await api().login(loginUser!.value, loginPassword!.value);
					setToken(token);

					const accountInfo = await api().me(token);
					setAccount(accountInfo);
				} catch (e) {
					setError(errorToString(e));
					setLoading(false);
				}
			}}>Log In</button>
		</div>
	);
};

export default Login;
