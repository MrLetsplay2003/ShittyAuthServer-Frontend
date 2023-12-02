import { Component, createSignal } from 'solid-js';
import { AccountInfo, api } from '../api';

import styles from './AccountItem.module.css';
import { BiSolidRightArrow } from 'solid-icons/bi';
import { account } from '../state';
import { Link } from '@solidjs/router';

export interface AccountItemProps {
	account: AccountInfo,
	changeUsername: (newUsername: string) => void,
	changePassword: (newPassword: string) => void,
	delete: () => void
}

const AccountItem: Component<AccountItemProps> = props => {
	const [username, setUsername] = createSignal('');
	const [password, setPassword] = createSignal('');

	return (
		<details class={styles.accountItem}>
			<summary>
				<div class={styles.arrowIcon}>
					<BiSolidRightArrow />
				</div>
				<div class={styles.userIcon}><img src={api().apiURL + '/avatar/' + props.account.id} /></div>
				<div class={styles.username}>{props.account.username + (props.account.id == account()?.id ? ' (You)' : '')}</div>
				<div class={styles.userProps}>
					<div>User ID</div><div>{props.account.id}</div>
					<div>Is Admin</div><div>{props.account.isAdmin ? 'Yes' : 'No'}</div>
				</div>
			</summary>
			<div class={styles.accountDetails}>
				{props.account.id == account()?.id ?
					<div>You can't edit your own account here, head over to your <Link href='/account'>account page</Link></div> :
					<>
						<div class={styles.accountOptions}>
							<input type="text" placeholder="Username" value={username()} oninput={e => setUsername(e.currentTarget.value)} />
							<button disabled={username().trim().length == 0} onclick={() => props.changeUsername(username().trim())}>Set username</button>
							<input type="password" placeholder="Password" value={password()} oninput={e => setPassword(e.currentTarget.value)} />
							<button disabled={password().trim().length == 0} onclick={() => { props.changePassword(password().trim()); setPassword(''); }}>Set password</button>
						</div>
						<button onclick={props.delete}>Delete account</button>
					</>
				}
			</div>
		</details>
	);
};

export default AccountItem;
