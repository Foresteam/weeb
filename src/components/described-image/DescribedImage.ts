import { Component, useStyle, type VNode, type ComponentProps } from 'lib/Component';

export interface Props extends ComponentProps {
	picture: string;
	title: string;
	description: string;
	furtherRead: { text?: string, link: string };
}

export const DescribedImage = ({ picture, title, description, furtherRead, ...props }: Props): VNode => {
	const self = {
		exports: {
			css: {}
		} as unknown as VNode['exports'],
		...Component(/*html*/
			`
				<div>
					<img src="${picture}">
					<div>
						<h2>${title}</h2>
						<p>${description}</p>
						<a href="${furtherRead.link}">${furtherRead.text ?? 'Read more'}</a>
					</div>
				</div>
			`,
			DescribedImage.name,
			props
		)
	};

	return self;
};

//styles
import style from './DescribedImage.sass?inline';
useStyle(style, DescribedImage.name);