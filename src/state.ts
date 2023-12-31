import { createEffect, createSignal } from 'solid-js';
import { SetStoreFunction, Store, createStore } from 'solid-js/store';
import { AccountInfo } from './api';
import { DialogProps } from './Dialog';

export interface LocalState {
	token: string | null,
	theme: Theme,
}

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
}

// Source: https://www.solidjs.com/examples/todos
function createLocalStore<T extends object>(
	name: string,
	init: T
): [Store<T>, SetStoreFunction<T>] {
	const localState = localStorage.getItem(name);
	const [state, setState] = createStore<T>(
		localState ? JSON.parse(localState) : init
	);
	createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
	return [state, setState];
}

const [localState, setLocalState] = createLocalStore('localState', { token: null, theme: Theme.DARK } as LocalState);
export { localState, setLocalState };

export const [account, setAccount] = createSignal(null as AccountInfo | null);

export const token = () => localState.token;
export const setToken = (token: string | null) => setLocalState({ token });

export const theme = () => Object.values(Theme).includes(localState.theme) ? localState.theme : Theme.DARK;
export const setTheme = (theme: Theme) => setLocalState({ theme });

export const [dialogs, setDialogs] = createSignal([] as DialogProps[]);

export const showDialog = (dialog: DialogProps) => {
	const newDialog: DialogProps = {
		...dialog,
		onDismiss: () => {
			setDialogs(ds => {
				const newDs = [...ds];
				newDs.splice(ds.indexOf(newDialog), 1);
				return newDs;
			});
			dialog.onDismiss?.();
		}
	};

	setDialogs([...dialogs(), newDialog]);
};

export const showMessageDialog = (title: string, text: string) => showDialog({
	title,
	text
});
