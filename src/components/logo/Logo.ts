import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from 'lib/Component';

export interface LogoProps extends ComponentProps {
	desktop: boolean | IAccessor<boolean>;
}

export const Logo = ({ desktop: _desktop, ...props }: LogoProps): VNode => {
	const desktop = Accessorify(_desktop);

	const self = {
		...Component(/*html*/
			`
				<div>
					<img src="/logo.svg" class="logo">
					${desktop ? 'Travel Portal' : ''}
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