import { Accessor, type IAccessor, Accessorify } from '@foresteam/proactive';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars } from '@foresteam/proactive';

export interface ImageProps extends ComponentProps {
	src: string | IAccessor<string>;
}

export const Image = ({ src: _src, ...props }: ImageProps): VNode => {
	const src = Accessorify(_src);
	const borderRadius = Accessor('0%');

	const self = {
		...Component(
		/*html*/`
			<img src="${src.value}">
		`,
			Image.name,
			props
		)
	};
	useCssVars(self, {
		borderRadius
	});

	setTimeout(() => borderRadius.value = '50%', 1000);

	return self;
};

//styles
import style from './Image.sass?inline';
useStyle(style, Image.name);