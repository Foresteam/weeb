import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from 'lib/Component';

export interface TitledSectionProps extends ComponentProps {
	name: boolean | IAccessor<boolean>;
}

export const TitledSection = ({ name: _name, ...props }: TitledSectionProps): VNode => {
	const name = Accessorify(_name);

	const self = {
		exports: {
			css: {}
		} as unknown as VNode['exports'],
		...Component(/*html*/
			`
				<section class="titled">
					<h1>${name.value}</h1>
				</section>
			`,
			TitledSection.name,
			props
		)
	};
	useCssVars(self);

	return self;
};

//styles
import style from './TitledSection.sass?inline';
useStyle(style, TitledSection.name);