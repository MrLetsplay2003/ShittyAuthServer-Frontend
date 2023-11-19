import { Component } from 'solid-js';
import { AccountInfo, api } from '../api';

import styles from './AccountItem.module.css';
import { BiSolidRightArrow } from 'solid-icons/bi';
import { account } from '../state';
import { Link } from '@solidjs/router';

export interface AccountItemProps {
	account: AccountInfo,
}

const AccountItem: Component<AccountItemProps> = props => {
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
							<input type="text" placeholder="Username" />
							<button>Set username</button>
							<input type="text" placeholder="Password" />
							<button>Set password</button>
						</div>
						<button>Delete account</button>
					</>
				}
			</div>
		</details>
	);
};

export default AccountItem;
