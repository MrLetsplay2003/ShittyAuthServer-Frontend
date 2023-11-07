import type { Component } from 'solid-js';

import styles from './App.module.css';
import Login from './Login';
import { account, setLocalState, theme } from './state';
import Home from './pages/Home';
import { A, Route, Routes, useNavigate } from '@solidjs/router';
import Admin from './pages/Admin';
import Skin from './pages/Skin';
import Account from './pages/Account';

const App: Component = () => {
	const navigate = useNavigate();

	return (
		<div class={styles.app}>
			<link rel="stylesheet" href={'themes/' + theme() + '.css'} />
			{account() == null && <Login />}
			{account() != null &&
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
			}
		</div>
	);
};

export default App;
