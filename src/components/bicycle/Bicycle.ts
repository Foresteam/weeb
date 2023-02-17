import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from 'lib/Component';

export interface Props extends ComponentProps {
	img: string | IAccessor<string>;
	text: string | IAccessor<string>;
}

export const Bicycle = ({ img: _img, text: _text, ...props }: Props): VNode => {
	const img = Accessorify(_img);
	const text = Accessorify(_text);

	const self = {
		exports: {
			css: {}
		} as unknown as VNode['exports'],
		...Component(/*html*/
			`
				<div class="bicycle">
					<img src="${img.value}">
					<div>${text.value}</div>
				</div>
			`,
			Bicycle.name,
			props
		)
	};
	useCssVars(self);

	return self;
};

//styles
import style from './Bicycle.sass?inline';
useStyle(style, Bicycle.name);