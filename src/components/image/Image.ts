import { Accessor } from '../Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from '../Component';

export interface ImageProps extends ComponentProps {
	src: string | Accessor<string>;
}

export const Image = ({ src: _src, ...props }: ImageProps): VNode => {
	const src = _src instanceof Accessor ? _src : new Accessor(_src);
	const borderRadius = new Accessor('0%');
	console.log(src, src.get());

	const self = {
		exports: {
			borderRadius
		} as VNode['exports'],
		...Component(
		/*html*/`
			<img src="${src.get()}">
		`,
			Image.name,
			props
		)
	};
	useCssVars(self);

	setTimeout(() => borderRadius.set('50%'), 1000);

	return self;
};

useStyle('./image/Image.sass', Image.name);