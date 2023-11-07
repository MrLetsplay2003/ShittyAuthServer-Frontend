import { Component, ParentComponent, children } from 'solid-js';

import styles from './Page.module.css';
import Navigation from './Navigation';
import { BiSolidMoon, BiSolidSun } from 'solid-icons/bi';
import { Theme, setTheme, theme } from '../state';
import { IconTypes } from 'solid-icons';

interface ThemeSwitcherProps {
	icon: IconTypes
}

const ThemeSwitcher: Component<ThemeSwitcherProps> = (props) => {
	const icon = () => props.icon({
		class: styles.themeSwitcher,
		size: 24,
		onclick: () => setTheme(theme() == Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
	});

	return <>{icon()}</>;
};

interface PageProps {
	title: string;
}

const Page: ParentComponent<PageProps> = (props) => {
	const ch = children(() => props.children);

	return (
		<div class={styles.page}>
			<header class={styles.pageHeader}>
				<img src="icon.svg" />
				<span>ShittyAuthServer</span>
			</header>
			<span class={styles.pageHeaderTitle}>
				{props.title}
				<ThemeSwitcher icon={theme() == Theme.LIGHT ? BiSolidSun : BiSolidMoon} />
			</span>
			<nav class={styles.pageSidebar}>
				<Navigation />
			</nav>
			<div class={styles.pageContent}>
				{ch()}
			</div>
		</div >
	);
};

export default Page;
