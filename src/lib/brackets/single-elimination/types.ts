export type MatchPositionData = {
	index: {
		round: number;
		match: number;
	};
	position: {
		x: number;
		y: number;
	};
};

export type BracketConfig = {
	matchStyle: {
		height: number;
		width: number;
		gap: number;
	};
	roundHeaderStyle: {
		height: number;
		width: number;
		bottomMargin: number;
	};
	roundStyle: {
		gap: number;
	};
};
