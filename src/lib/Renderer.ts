import { type TComponent, type ComponentProps } from './Component';

export const Renderer = (vhtml: string, components: { [key: string]: TComponent}): string => {
	const vdom = new DOMParser().parseFromString(vhtml, 'text/html');
	vhtml = vdom.documentElement.outerHTML;
	for (const [name, component] of Object.entries(components))
		for (const el of Array.from(vdom.getElementsByTagName(name)) as HTMLElement[]) {
			const content = el.innerHTML;
			const instance = component(Object.assign({}, ...Array.from(el.attributes).map(a => ({ [a.name]: a.value }))) as ComponentProps);
			instance.node.value.innerHTML += content;
			vhtml = vhtml.replace(el.outerHTML, instance.render());
		}
	return vhtml;
};