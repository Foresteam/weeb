import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from 'lib/Component';

export interface LogoProps extends ComponentProps {
	mobile: boolean;
}

export const Logo = ({ mobile, ...props }: LogoProps): VNode => {
	const self = {
		...Component(/*html*/
			`
				<div>
					<img src="/logo.svg" class="logo">
					${!mobile ? 'Travel Portal' : ''}
				</div>
			`,
			Logo.name,
			props
		)
	};
	useCssVars(self);

	return self;
};

//styles
import style from './Logo.scss?inline';
useStyle(style, Logo.name);