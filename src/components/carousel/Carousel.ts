// import { type IAccessor, Accessorify } from 'lib/Accessor';
import { Accessor, type IAccessor } from 'lib/Accessor';
import { Component, useStyle, type VNode, type ComponentProps, useCssVars, useOnMounted, useRefs } from 'lib/Component';
import { PaginationDot } from './pagination-dot/PaginationDot';

export interface Props extends ComponentProps {
	mobile: boolean;
}

export const Carousel = ({ mobile, ...props }: Props): VNode => {
	const page = Accessor(0);
	console.log(mobile ? 'mobile' : 'desktop');
	const GAP = mobile ? 30 : 60;
	const WIMAGE = mobile ? 360 : 800;
	const HIMAGE = mobile ? 210 : 800;
	const self = {
		...Component(/*html*/
			`
			<div>
				<div class="items" ref="items">
					<slot></slot>
				</div>
				<fieldset class="pagination-wrapper">
					<div class="pagination" ref="pagination"></div>
				</fieldset>
				${mobile ? /*html*/`
					<div class="arrows">
						<img src="/icons/arrow-back.svg" ref="back">
						<img src="/icons/arrow-forward.svg" ref="forward">
					</div>
				` : ''}
			</div>
			`,
			Carousel.name,
			props
		)
	};
	useCssVars(self, {
		GAP: Accessor(`${GAP}px`),
		WIMAGE: Accessor(`${WIMAGE}px`),
		HIMAGE: Accessor(`${HIMAGE}px`),
	});
	const refs = {
		items: Accessor<HTMLElement | undefined>(undefined),
		pagination: Accessor<HTMLElement | undefined>(undefined),
		back: Accessor<HTMLElement | undefined>(undefined),
		forward: Accessor<HTMLElement | undefined>(undefined),
	};
	useRefs(self, refs);

	useOnMounted(self, () => {
		const items = refs.items as IAccessor<HTMLElement>;
		const pagination = refs.pagination as IAccessor<HTMLElement>;
		const back = refs.back;
		const forward = refs.forward;
		const nPages = () => items.value.childElementCount;
		const defaultPage = Math.floor(nPages() / 2);

		page.onChange(p => {
			items.value.style.transform = `translateX(-${p * (GAP + WIMAGE)}px)`;
			back?.value?.classList.toggle('inactive', p <= 0);
			forward?.value?.classList.toggle('inactive', p >= nPages() - 1);

		});
		page.value = defaultPage;
		for (let i = 0; i < nPages(); i++) {
			const dot = PaginationDot({ page, n: i, name: 'countries-carousel', selected: i == defaultPage });
			pagination.value.innerHTML += dot.render();
			page.onChange(p => {
				(dot.node.value as HTMLInputElement).checked = p == i;
			});
			items.value.children.item(i)?.addEventListener('click', () => page.value = i);
		}
		back?.value?.addEventListener('click', () => page.value > 0 && page.value--);
		forward?.value?.addEventListener('click', () => page.value < nPages() - 1 && page.value++);
	});

	return self;
};

//styles
import style from './Carousel.sass?inline';
useStyle(style, Carousel.name);