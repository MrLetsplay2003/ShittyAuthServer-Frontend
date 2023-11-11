import { Component } from 'solid-js';
import { globalError } from './state';

import styles from './Error.module.css';

const Error: Component = () => {
	return (
		<div class={styles.error}>
			<span class={styles.errorTitle}>Error</span>
			<span class={styles.errorMessage}>{globalError()}</span>
			<button onclick={async () => {
				window.location.reload();
			}}>Reload</button>
		</div>
	);
};

export default Error;
