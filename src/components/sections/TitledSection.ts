import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps } from 'lib/Component';

export interface Props extends ComponentProps {
	name: boolean | IAccessor<boolean>;
}

export const TitledSection = ({ name: _name, ...props }: Props): VNode => {
	const name = Accessorify(_name);

	const self = {
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

	return self;
};

//styles
import style from './TitledSection.sass?inline';
useStyle(style, TitledSection.name);