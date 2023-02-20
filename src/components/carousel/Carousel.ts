// import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Accessor, type IAccessor } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars, useOnMounted, useRefs } from 'lib/Component';
import { PaginationDot } from './pagination-dot/PaginationDot';

export interface Props extends ComponentProps {
	mobile: boolean;
}

export const Carousel = ({ mobile, ...props }: Props): VNode => {
	const page = Accessor(0);
	const GAP = mobile ? 30 : 60;
	const WIMAGE = mobile ? 360 : 800;
	const HIMAGE = mobile ? 210 : 800;
	const self = {
		exports: {
			css: {
				GAP: Accessor(`${GAP}px`),
				WIMAGE: Accessor(`${WIMAGE}px`),
				HIMAGE: Accessor(`${HIMAGE}px`),
			},
			refs: {
				items: Accessor<HTMLElement | undefined>(undefined),
				pagination: Accessor<HTMLElement | undefined>(undefined),
			}
		} as unknown as VNode['exports'],
		...Component(/*html*/
			`
			<div>
				<div class="items" ref="items">
					<slot></slot>
				</div>
				<fieldset class="pagination-wrapper">
					<div class="pagination" ref="pagination"></div>
				</fieldset>
			</div>
			`,
			Carousel.name,
			props
		)
	};
	useCssVars(self);
	useRefs(self);

	useOnMounted(self, () => {
		const items = self.exports?.refs?.items as IAccessor<HTMLElement>;
		const pagination = self.exports?.refs?.pagination as IAccessor<HTMLElement>;
		const nPages = () => items.value.childElementCount;
		const defaultPage = Math.floor(nPages() / 2);

		page.onChange(p => items.value.style.transform = `translateX(-${p * (GAP + WIMAGE)}px)`);
		page.value = defaultPage;
		for (let i = 0; i < nPages(); i++) {
			pagination.value.innerHTML += PaginationDot({ page, n: i, name: 'countries-carousel', selected: i == defaultPage }).render();
			items.value.children.item(i)?.addEventListener('click', () => page.value = i);
		}
	});

	return self;
};

//styles
import style from './Carousel.sass?inline';
useStyle(style, Carousel.name);