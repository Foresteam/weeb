import { type TComponent, type ComponentProps } from './Component';

export const App = (vhtml: string, components: { [key: string]: TComponent}): string => {
	const vdom = new DOMParser().parseFromString(vhtml, 'text/html');
	vhtml = vdom.documentElement.outerHTML;
	for (const [name, component] of Object.entries(components))
		for (const el of Array.from(vdom.getElementsByTagName(name)) as HTMLElement[]) {
			const content = el.innerHTML;
			const instance = component(Object.assign({}, ...Array.from(el.attributes).map(a => ({ [a.name]: a.value }))) as ComponentProps);
			instance.vnode.innerHTML += content;
			console.log(el.outerHTML);
			vhtml = vhtml.replace(el.outerHTML, instance.render());
		}
	return vhtml;
};