import { v4 as uuidv4 } from 'uuid';
import md5 from 'blueimp-md5';
import { Accessor } from './Accessor';

// export interface StyleProps {
// 	override?: boolean;
// 	[k: string]: any;
// }
/** Applies the scope to last stylesheet loaded */
export const applyScope = (styles: string, scope: string): void => {
	let style: HTMLStyleElement | undefined;
	for (const candidate of Array.from(document.getElementsByTagName('style')))
		if (candidate.innerHTML == styles) {
			style = candidate;
			break;
		}
	if (!style)
		return;
	const sts = styles.split('\n');
	for (const l in sts) {
		const s = sts[l];
		if (s.indexOf('{') < 0) {
			// replace css var-funcs
			for (let [match] of [...s.matchAll(/vcss\(.*?\)/g)]) {
				match = match.replaceAll('\'', '');
				sts[l] = sts[l].replace(match, `var(--${CSS_VAR_PREFIX}${match.substring(5, match.length - 1)})`);
			}
			continue;
		}
		sts[l] = s.replaceAll('__vscope', scope);
	}
	const css = sts.join('\n');
	for (const existing of Array.from(document.getElementsByTagName('style')))
		if (existing.innerHTML == css) {
			style.remove();
			return;
		}
	style.innerHTML = css;
};
export const useStyle = async (path: string, uname?: string, scope?: false | string) => {
	const styles = (await import(path) as { default: string }).default;
	if (scope !== false && (scope || uname))
		applyScope(styles, scope ?? genScope(uname as string));
};

export const getHash = (s: string) => {
	let hash = 0,
		i, chr;
	if (s.length === 0) return hash;
	for (i = 0; i < s.length; i++) {
		chr = s.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
};

export const genUUID = () => '_u_' + uuidv4();
export const genScope = (uname: string) => '_s_' + md5(uname);

export interface VNode {
	/** The unique identifier of the root node of the component */
	uuid: string;
	/** The rendered node itself */
	render: () => string;
	/** VNode */
	vnode: HTMLElement;
	/** Component real node getter */
	node: () => (HTMLElement | undefined);
	exports?: { [key: string]: Accessor<unknown> };
}
export interface ComponentParams {
	/** The unique identifier for the root node of the component */
	uuid?: string;
	/** Style scope. Unset to use UUID, set to false to disable */
	scope?: false | string;
}
export interface ComponentProps {
	class?: string | Record<string, boolean> | string[];
	style?: string | Record<string, unknown> | string[];
}
export type TComponent = (props: ComponentProps) => VNode;
/** 
 * @param html The rendered node itself
 * @param uname Component typename
*/
export const Component = (html: string, uname: string, props: ComponentProps = {}, { uuid, scope }: ComponentParams = {}): VNode => {
	if (!uuid)
		uuid = genUUID();
	const vnode = new DOMParser().parseFromString(html, 'text/html').body.firstChild as (HTMLElement | undefined);
	if (!vnode)
		throw new Error('Failed to parse vnode: empty');
	if (scope !== false) {
		scope ??= genScope(uname);
		vnode.classList.add(scope);
	}
	
	vnode.classList.add(uuid);
	if (props.class)
		if (typeof (props.class) == 'string')
			for (const clss of (props.class as string).split(' '))
				vnode.classList.add(clss);
		else if ((props.class as string[])[0])
			for (const clss of props.class as string[])
				vnode.classList.add(clss);
		else
			for (const [clss, enable] of Object.entries(props.class))
				vnode.classList.toggle(clss, enable);
	if (props.style)
		if (typeof (props.style) == 'string')
			vnode.setAttribute('style', props.style as string);
		else if ((props.style as string[])[0])
			vnode.setAttribute('style', (props.style as string[]).join('; '));
		else
			for (const [style, value] of Object.entries(props.style as Record<string, unknown>))
				if (Object.keys(vnode.style).includes(style))
					(vnode.style as unknown as { [key: string]: unknown })[style] = value;

	return Object.assign(vnode, {
		vnode,
		render: () => vnode.outerHTML,
		uuid,
		node: () => document.getElementsByClassName(uuid as string).item(0) as HTMLElement
	});
};

export const CSS_VAR_PREFIX = '__vcss_';
export const useCssVars = (vnode: VNode): void => {
	if (!vnode.exports)
		return;
	for (const [varname, accessor] of Object.entries(vnode.exports)) {
		const apply = (value: string) => {
			for (const node of [vnode.vnode, vnode.node()])
				node?.style.setProperty(`--${CSS_VAR_PREFIX}${varname}`, value);
		};
		accessor.onChange(value => apply(value as string));
		apply(accessor.get() as string);
	}
};