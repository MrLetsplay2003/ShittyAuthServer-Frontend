import { createEffect, type Component, createSignal, For } from 'solid-js';

import styles from './App.module.css';
import Login from './Login';
import { account, dialogs, setAccount, setLocalState, setToken, showMessageDialog, theme, token } from './state';
import Home from './pages/Home';
import { A, Route, Routes, useNavigate } from '@solidjs/router';
import Skin from './pages/Skin';
import Account from './pages/Account';
import { API, api, setAPI } from './api';
import { errorToString } from './util';
import Dialog from './Dialog';
import Users from './pages/Users';
import Settings from './pages/Settings';

interface Config {
	apiBaseURL: string,
}

const App: Component = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = createSignal(true);
	const [error, setError] = createSignal(null as string | null);

	createEffect(async () => {
		try {
			const configResponse = await fetch('config.json');
			if (!configResponse.ok) throw 'Failed to load config';

			const config: Config = await configResponse.json();
			setAPI(new API(config.apiBaseURL));
		} catch (e) {
			setError(errorToString(e));
			setLoading(false);
			return;
		}

		try {
			const meta = await api().meta();
			if (meta.version < 1) throw 'Incompatible API version: ' + meta.version;
			setLoading(false);
		} catch (e) {
			setError(errorToString(e));
			setLoading(false);
			return;
		}

		if (token() != null) {
			try {
				setAccount(await api().me(token()!));
			} catch (e) {
				setToken(null);
				showMessageDialog('Failed to load account', errorToString(e));
			}
		}
	});

	return (
		<div class={styles.app}>
			<link rel="stylesheet" href={'themes/' + theme() + '.css'} />
			{loading() && <div>Loading...</div>}

			<For each={dialogs()}>{d => <Dialog {...d} />}</For>

			{error() != null && <Dialog title='Failed to load application' text={error()!} buttons={[{ name: 'Reload', action: () => window.location.reload() }]} />}
			{!loading() && error() == null && (token() == null ? <Login /> :
				<Routes>
					<Route path="/" component={Home} />
					<Route path="/account" component={Account} />
					<Route path="/skin" component={Skin} />
					{account()?.isAdmin &&
						<>
							<Route path="/users" component={Users} />
							<Route path="/settings" component={Settings} />
						</>
					}
					<Route path="/logout" component={() => {
						setLocalState({ token: null });
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
