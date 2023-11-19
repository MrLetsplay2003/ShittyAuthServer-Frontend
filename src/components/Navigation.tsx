import { A } from '@solidjs/router';
import { Component } from 'solid-js';
import { BiSolidCog, BiSolidHome, BiSolidLogOut, BiSolidPalette, BiSolidShield, BiSolidUserAccount } from 'solid-icons/bi';

import styles from './Navigation.module.css';
import { IconTypes } from 'solid-icons';
import { account } from '../state';

export interface NavigationItemProps {
	icon: IconTypes,
	name: string,
	href: string,
}

const NavigationItem: Component<NavigationItemProps> = (props) => {
	return <li><A class={styles.navItem} href={props.href}>{props.icon({ size: 24 })}{props.name}</A></li>;
};

const Navigation: Component = () => {
	return (
		<ul class={styles.navList}>
			<NavigationItem icon={BiSolidHome} name="Home" href="/" />
			<NavigationItem icon={BiSolidUserAccount} name="Account" href="/account" />
			<NavigationItem icon={BiSolidPalette} name="Skin & Cape" href="/skin" />
			{account()?.isAdmin &&
				<>
					<NavigationItem icon={BiSolidShield} name="User Administration" href="/users" />
					<NavigationItem icon={BiSolidCog} name="Server Settings" href="/settings" />
				</>
			}
			<NavigationItem icon={BiSolidLogOut} name="Log Out" href="/logout" />
		</ul>
	);
};

export default Navigation;
