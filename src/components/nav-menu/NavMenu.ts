import { Accessor, IAccessor } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars, useOnMounted, useRefs } from 'lib/Component';

export interface Props extends ComponentProps {
	mobile: boolean;
}

export const NavMenu = ({ mobile, ...props }: Props): VNode => {
	const menu = Accessor(false);

	const self = {
		exports: {
			refs: {
				nav: Accessor<HTMLElement | undefined>(undefined),
				menuBtn: Accessor<HTMLElement | undefined>(undefined),
				crossBtn: Accessor<HTMLElement | undefined>(undefined),
			}
		} as unknown as VNode['exports'],
		...Component(/*html*/
			`
			<div class="nav-menu">
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
				${!mobile ? /*html*/`
					<input type="button" class="login" value="Login">`
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
	useCssVars(self);
	useRefs(self);

	useOnMounted(self, () => {
		const nav = self.exports?.refs?.nav as IAccessor<HTMLElement>;
		const menuBtn = self.exports?.refs?.menuBtn as IAccessor<HTMLElement>;
		const crossBtn = self.exports?.refs?.crossBtn as IAccessor<HTMLElement>;
		const initialDisplay = nav.value.style.display;

		menu.onChange(v => {
			nav.value.style.opacity = v ? '1' : '0';
			nav.value.style.display = v ? initialDisplay : 'none';
		});
		menu.value = !mobile;
		menuBtn.value.addEventListener('click', () => menu.value = !menu.value);
		crossBtn.value.addEventListener('click', () => menu.value = false);
	});

	return self;
};

//styles
import style from './NavMenu.sass?inline';
useStyle(style, NavMenu.name);