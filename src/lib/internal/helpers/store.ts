import type { Writable, Updater } from "svelte/store";

export type ChangeFn<T> = (args: { curr: T; next: T }) => T;
export type MaybeWritable<T> = Writable<T> | T;

export function isWritable<T>(value: MaybeWritable<T>): value is Writable<T> {
	return value instanceof Object && "subscribe" in value;
}

export const overridable = <T>(store: Writable<T>, onChange?: ChangeFn<T>) => {
	const update = (
		updater: Updater<T>,
		sideEffect?: (newValue: T) => void,
	) => {
		store.update((curr) => {
			const next = updater(curr);
			let res: T = next;
			if (onChange) {
				res = onChange({ curr, next });
			}

			sideEffect?.(res);
			return res;
		});
	};

	const set: typeof store.set = (curr) => {
		update(() => curr);
	};

	return {
		...store,
		update,
		set,
	};
};
