import { createEffect } from 'solid-js';
import { SetStoreFunction, Store, createStore } from 'solid-js/store';

export interface LocalState {
	accountInfo: AccountInfo | null,
	theme: Theme,
}

export interface AccountInfo {
	id: string,
	name: string,
	isAdmin: boolean,
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

const [localState, setLocalState] = createLocalStore('localState', { accountInfo: null, theme: Theme.DARK } as LocalState);
export { localState, setLocalState };

export const account = () => localState.accountInfo;
export const setAccount = (account: AccountInfo) => setLocalState({ accountInfo: account });

export const theme = () => Object.values(Theme).includes(localState.theme) ? localState.theme : Theme.DARK;
export const setTheme = (theme: Theme) => setLocalState({ theme: theme });
