import { Accessor, type IAccessor, Proxify } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from 'lib/Component';

export interface ImageProps extends ComponentProps {
	src: string | IAccessor<string>;
}

export const Image = ({ src: _src, ...props }: ImageProps): VNode => {
	const src = Proxify(_src);
	const borderRadius = Accessor('0%');

	const self = {
		exports: {
			css: {
				borderRadius
			}
		} as unknown as VNode['exports'],
		...Component(
		/*html*/`
			<img src="${src.value}">
		`,
			Image.name,
			props
		)
	};
	useCssVars(self);

	setTimeout(() => borderRadius.value = '50%', 1000);

	return self;
};

//styles
import style from './Image.sass?inline';
useStyle(style, Image.name);