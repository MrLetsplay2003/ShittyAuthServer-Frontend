import { Component, For } from 'solid-js';

import styles from './Dialog.module.css';

export interface DialogButton {
	name: string,
	action?: () => void,
	type?: 'default' | 'danger' | 'success'
}

export interface DialogProps {
	title: string,
	text: string,
	buttons?: (string | DialogButton)[],
	onDismiss?: () => void,
}

function createButton(button: (string | DialogButton), dismiss?: () => void) {
	if (typeof button == 'string') {
		return <button onclick={dismiss} class={styles.defaultButton}>{button}</button>;
	} else {
		return <button onclick={() => { button.action?.(); dismiss?.(); }} class={styles[button.type + 'Button']}>{button.name}</button>;
	}
}

const Dialog: Component<DialogProps> = props => {
	const buttons: () => (string | DialogButton)[] = () => props.buttons == null ? [{ name: 'Okay', action: props.onDismiss }] : props.buttons;

	return (
		<div class={styles.dialogContainer}>
			<div class={styles.dialog}>
				<div class={styles.dialogTitle}>{props.title}</div>
				<div class={styles.dialogText}>{props.text}</div>
				<div class={styles.dialogButtons}>
					<For each={buttons()}>{b => createButton(b, props.onDismiss)}</For>
				</div>
			</div>
		</div>
	);
};

export default Dialog;
