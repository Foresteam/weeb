import { Accessor, IAccessor } from '@foresteam/proactive';
import { Component, useStyle, type VNode, type ComponentProps, useOnMounted, useRefs } from '@foresteam/proactive';

export interface Props extends ComponentProps {
	mobile: boolean;
}

export const NavMenu = ({ mobile, ...props }: Props): VNode => {
	const menu = Accessor(false);

	const self = {
		...Component(/*html*/
			`
			<div class="nav-menu">
				${mobile ? '<div class="nav-wrapper" ref="navW">' : ''}
				<nav ref="nav">
					${mobile ? /*html*/`
						<div class="cross-btn" ref="crossBtn">
							<img src="/icons/cross.svg">
						</div>
					` : ''}
					<div class="nav-items">
						<div>How It Works</div>
						<div>Plan Your Tip</div>
						<div>Destinations</div>
						<div>Travel Stories</div>
						${mobile ? /*html*/`
							<div>Account</div>
							<div>Social Media</div>
						` : ''}
					</div>
				</nav>
				${mobile ? '</div>' : ''}
				${!mobile ? /*html*/`
					<input type="button" class="login" value="Login" ref="login">`
	// eslint-disable-next-line indent
				: /*html*/`
					<img src="/icons/menu.svg" class="menu-btn" ref="menuBtn">
				`}
			</div>
			`,
			NavMenu.name,
			props
		)
	};
	const refs = {
		navW: Accessor<HTMLElement | undefined>(undefined),
		nav: Accessor<HTMLElement | undefined>(undefined),
		menuBtn: Accessor<HTMLElement | undefined>(undefined),
		crossBtn: Accessor<HTMLElement | undefined>(undefined),
		login: Accessor<HTMLElement | undefined>(undefined),
	};
	useRefs(self, refs);

	if (mobile)
		useOnMounted(self, () => {
			const navW = refs.navW as IAccessor<HTMLElement>;
			const nav = refs.nav as IAccessor<HTMLElement>;
			const menuBtn = refs.menuBtn as IAccessor<HTMLElement>;
			const crossBtn = refs.crossBtn as IAccessor<HTMLElement>;
			const initialDisplay = navW.value.style.display;

			menu.onChange(v => {
				navW.value.style.opacity = v ? '1' : '0';
				navW.value.style.display = v ? initialDisplay : 'none';
			});
			menu.value = !mobile;
			menuBtn.value.addEventListener('click', () => menu.value = !menu.value);
			crossBtn.value.addEventListener('click', () => menu.value = false);
			navW.value.addEventListener('click', () => menu.value = false);
			nav.value.addEventListener('click', e => e.stopPropagation());
		});
	else
		useOnMounted(self, () => {
			const login = refs.login as IAccessor<HTMLElement>;
			login.value.addEventListener('click', () => alert('Not implemented'));
		});

	return self;
};

//styles
import style from './NavMenu.sass?inline';
useStyle(style, NavMenu.name);