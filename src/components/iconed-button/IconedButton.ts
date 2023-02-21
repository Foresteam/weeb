import { Component, type VNode, type ComponentProps, useOnMounted, useStyle } from 'lib/Component';

export interface Props extends ComponentProps {
	icon: string;
	text?: string;
	action?: () => unknown;
}

export const IconedButton = ({ icon, text, action, ...props }: Props): VNode => {
	const self = {
		...Component(/*html*/
			`
				<button>
					<img src="${icon}">
					${text ?? ''}
					<slot></slot>
				</button>
			`,
			IconedButton.name,
			props
		)
	};
	useOnMounted(self, root => action && root.addEventListener('click', action));

	return self;
};

//styles
import style from './IconedButton.sass?inline';
useStyle(style, IconedButton.name);