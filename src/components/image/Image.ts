import { Component, useStyle, type VNode, type ComponentProps } from '../Component';

export interface ImageProps extends ComponentProps {
	src: string;
}

export const Image = ({ src, ...props }: ImageProps): VNode => {
	const img = Component(
		/*html*/`
			<img src="${src}">
		`,
		Image.name,
		props);

	return img;
};

useStyle('./image/Image.sass', Image.name);