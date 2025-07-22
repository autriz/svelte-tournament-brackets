import type { BracketConfig } from "$lib/brackets/types.js";

/**
 * Forces value to be only the type of `T` instead of `T | undefined`
 */
export function required<T>(data: T | undefined) {
	return data as T;
}

/**
 * Helper function that returns 0 if round headers are
 * disabled or height with bottom margin otherwise.
 * @param config {@link BracketConfig|Bracket configuration object}.
 */
export function getHeaderHeight(config: BracketConfig) {
	return config.showRoundHeaders
		? config.roundHeaderStyle.height + config.roundHeaderStyle.bottomMargin
		: 0;
}

/**
 * Adjusts horizontal round header position if header width is less than match's.
 * @param x Current horizontal position.
 * @param config {@link BracketConfig|Bracket configuration object}.
 * @returns Adjusted horizontal position.
 */
export function shiftHeaderXPos(x: number, config: BracketConfig) {
	if (config.matchStyle.width > config.roundHeaderStyle.width) {
		const diff = config.matchStyle.width - config.roundHeaderStyle.width;

		switch (config.roundHeaderStyle.align) {
			case "start":
				return x;
			case "center":
				return x + diff / 2;
			case "end":
				return x + diff;
		}
	}

	return x;
}

/**
 * Adjusts horizontal match position if match width is less than header's.
 * @param x Current horizontal position.
 * @param config {@link BracketConfig|Bracket configuration object}.
 * @returns Adjusted horizontal position.
 */
export function shiftMatchXPos(x: number, config: BracketConfig) {
	if (config.matchStyle.width < config.roundHeaderStyle.width) {
		const diff = config.roundHeaderStyle.width - config.matchStyle.width;

		switch (config.matchStyle.align) {
			case "start":
				return x;
			case "center":
				return x + diff / 2;
			case "end":
				return x + diff;
		}
	}

	return x;
}
