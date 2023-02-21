import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from 'lib/Component';

export interface Props extends ComponentProps {
	title: boolean | IAccessor<boolean>;
	src: string | IAccessor<string>;
}

export const CarouselImage = ({ title: _title, src: _src, ...props }: Props): VNode => {
	const title = Accessorify(_title);
	const src = Accessorify(_src);
	src.value = `url('${src.value}')`;

	const self = {
		...Component(/*html*/
			`
				<div>
					<p class="title">${title.value}</p>
				</div>
			`,
			CarouselImage.name,
			props
		)
	};
	useCssVars(self, {
		src
	});

	return self;
};

//styles
import style from './CarouselImage.sass?inline';
useStyle(style, CarouselImage.name);