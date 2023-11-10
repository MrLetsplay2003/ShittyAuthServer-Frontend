import { createEffect, type Component, createSignal } from 'solid-js';

import styles from './App.module.css';
import Login from './Login';
import { account, setLocalState, theme, token } from './state';
import Home from './pages/Home';
import { A, Route, Routes, useNavigate } from '@solidjs/router';
import Admin from './pages/Admin';
import Skin from './pages/Skin';
import Account from './pages/Account';
import { API, TESTING_API_URL } from './api';

const App: Component = () => {
	const navigate = useNavigate();
	const api = new API(TESTING_API_URL);

	const [loading, setLoading] = createSignal(true);
	const [error, setError] = createSignal(null as string | null);

	createEffect(async () => {
		try {
			const meta = await api.meta();
			if (meta.version < 1) throw 'Incompatible API version: ' + meta.version;
			setLoading(false);
		} catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
			if (typeof e == 'string') {
				setError(e);
			} else if (e.toString) {
				setError(e.toString() as string);
			} else {
				setError('Unknown error');
			}

			setLoading(false);
		}
	});

	return (
		<div class={styles.app}>
			<link rel="stylesheet" href={'themes/' + theme() + '.css'} />
			{loading() && <div>Loading...</div>}
			{error() != null && <div>An error occurred: {error()}</div>}

			{!loading() && error() == null && (account() == null || token() == null ? <Login /> :
				<Routes>
					<Route path="/" component={Home} />
					<Route path="/account" component={Account} />
					<Route path="/skin" component={Skin} />
					{account()?.isAdmin && <Route path="/admin" component={Admin} />}
					<Route path="/logout" component={() => {
						setLocalState({ accountInfo: null });
						navigate('/');
						return <></>;
					}} />
					<Route path="*" component={() => {
						return <>
							<span>Page not found.</span><br />
							<A href="/" >Go back home</A>
						</>;
					}} />
				</Routes>
			)}
		</div>
	);
};

export default App;
