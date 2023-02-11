import { v4 as uuidv4 } from 'uuid';

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
		sts[l] = scope + ' ' + s;
	}
	theStyle.innerHTML = sts.join('\n');
};

export const genUUID = uuidv4;

export interface IRNode {
	html: string;
	uuid: string;
}
export const RNode = (html: string, { uuid, scope }: { uuid?: string, scope?: false | string}): IRNode => {
	if (!uuid)
		uuid = uuidv4();
	const vnode = new DOMParser().parseFromString(html, 'text/html').body.firstChild as (HTMLElement | null);
	if (scope !== false)
		applyScope(scope ?? uuid);
	if (!vnode)
		throw new Error('Failed to parse vnode: empty');
	vnode.classList.add(uuid);

	return { html: vnode.outerHTML, uuid };
};