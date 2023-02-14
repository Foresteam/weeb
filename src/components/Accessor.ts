export interface _IAccessorValue<T> {
	value: T;
}
export interface IAccessorArgs<T> {
	get: (this: _IAccessorValue<T>) => T;
	set: (this: _IAccessorValue<T>, newValue: T) => unknown;
}
export interface INAccessorArgs {
	get: undefined;
	set: undefined;
}
export class Accessor<T> {
	get: () => T;
	set: (newValue: T) => unknown;
	onChange: (callback: (value: T) => unknown) => void;
	// removeListener: (callback: (value: T) => unknown) => void;

	constructor(value: T, actions?: IAccessorArgs<T> | INAccessorArgs) {
		const o: _IAccessorValue<T> = { value };
		const listeners: Parameters<Accessor<T>['onChange']>[0][] = [];
		
		let { get: _get, set: _set } = actions ?? {};
		_get ??= function () { return o.value; };
		_set ??= (newValue) => o.value = newValue;

		const get: IAccessorArgs<T>['get'] = () => (_get as IAccessorArgs<T>['get']).call(o);
		const set: IAccessorArgs<T>['set'] = (newValue) => {
			(_set as IAccessorArgs<T>['set']).call(o, newValue);
			listeners.forEach(l => l(newValue));
		};

		this.get = get;
		this.set = set;
		this.onChange = callback => listeners.push(callback);
		// this.removeListener = callback => (listeners.indexOf(callback) >= 0 ? listeners.splice(listeners.indexOf(callback), 1) : undefined);
	}
}