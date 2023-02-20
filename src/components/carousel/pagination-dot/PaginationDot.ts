import { type IAccessor } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars, useOnMounted } from 'lib/Component';

export interface Props extends ComponentProps {
	page: IAccessor<number>;
	n: number;
	selected?: boolean;
	name: string;
}

export const PaginationDot = ({ page, n, selected, name, ...props }: Props): VNode => {
	const self = {
		...Component(/*html*/
			`
				<input type="radio" name="${name}" value="${n}" ${selected ? 'checked=""' : ''}>
			`,
			PaginationDot.name,
			props
		)
	};
	useCssVars(self);

	useOnMounted(self, root => root.addEventListener('click', () => page.value = n));

	return self;
};

//styles
import style from './PaginationDot.sass?inline';
useStyle(style, PaginationDot.name);