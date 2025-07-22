import type {
	BaseEntrant,
	BaseMatch,
	BaseRound,
	BracketConfig,
	SingleEliminationProps,
} from "$lib";
import { generateDataAndDims, getHeaderHeight } from "./index.js";

export function processSingleEliminationData<
	Config extends BracketConfig,
	Round extends BaseRound,
	Match extends BaseMatch,
	Entrant extends BaseEntrant,
>(data: SingleEliminationProps<Round, Match, Entrant>, config: Config) {
	const { bracketData, dimensions } = generateDataAndDims(
		data,
		config,
		(data, round) =>
			data.matches.filter((match) => match.roundId === round.id),
		{
			...config.padding,
			top: getHeaderHeight(config) + config.padding.top,
		},
	);

	return {
		bracketData,
		width: dimensions.width,
		height: dimensions.height,
	};
}
