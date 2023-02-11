import { v4 as uuidv4 } from 'uuid';
import md5 from 'blueimp-md5';

// export interface StyleProps {
// 	override?: boolean;
// 	[k: string]: any;
// }
/** Applies the scope to last stylesheet loaded */
export const applyScope = (scope: string): void => {
	const theStyle = Array.from(document.getElementsByTagName('style')).pop();
	if (!theStyle)
		return;
	const sts = theStyle.innerHTML.split('\n');
	for (const l in sts) {
		const s = sts[l];
		if (s.indexOf('{') < 0)
			continue;
		sts[l] = s.replaceAll('__vscope', scope);
		// if (s == '.__root') {
		// 	sts[l] = scope + ' {';
		// 	continue;
		// }
		// sts[l] = s.split(', ').map(s => scope + ' ' + s).join(', ');
	}
	theStyle.innerHTML = sts.join('\n');
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

export interface VNode extends HTMLElement {
	/** The unique identifier of the root node of the component */
	uuid: string;
	/** The rendered node itself */
	render: () => string;
	/** Component real node getter */
	node: () => (HTMLElement | null);
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
	const vnode = new DOMParser().parseFromString(html, 'text/html').body.firstChild as (HTMLElement | null);
	if (!vnode)
		throw new Error('Failed to parse vnode: empty');
	if (scope !== false) {
		scope ??= '_s_' + md5(uname);
		applyScope(scope);
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

	return {
		...vnode,
		render: () => vnode.outerHTML,
		uuid,
		node: () => document.getElementsByClassName(uuid as string).item(0) as HTMLElement
	};
};