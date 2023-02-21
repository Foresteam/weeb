import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps } from 'lib/Component';

export interface Props extends ComponentProps {
	img: string | IAccessor<string>;
	text: string | IAccessor<string>;
}

export const Bicycle = ({ img: _img, text: _text, ...props }: Props): VNode => {
	const img = Accessorify(_img);
	const text = Accessorify(_text);

	const self = {
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

	return self;
};

//styles
import style from './Bicycle.sass?inline';
useStyle(style, Bicycle.name);