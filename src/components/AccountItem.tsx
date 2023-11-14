import { Component } from 'solid-js';
import { AccountInfo, api } from '../api';

import styles from './AccountItem.module.css';

export interface AccountItemProps {
	account: AccountInfo,
}

const AccountItem: Component<AccountItemProps> = props => {
	return (
		<div class={styles.accountItem}>
			<div class={styles.userIcon}><img src={api().apiURL + '/avatar/' + props.account.id} /></div>
			<div class={styles.username}>{props.account.username}</div>
			<div class={styles.userProps}>
				<div>User ID</div><div>{props.account.id}</div>
				<div>Is Admin</div><div>{props.account.isAdmin ? 'Yes' : 'No'}</div>
			</div>
		</div >
	);
};

export default AccountItem;
