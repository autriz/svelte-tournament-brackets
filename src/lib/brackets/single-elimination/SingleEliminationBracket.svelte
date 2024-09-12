<script lang="ts" context="module">
	export const calcVerticalStartingPoint = (roundIdx: number, height: number, matchGap: number) => 2 ** roundIdx * ((height + matchGap * 2) / 2) - (height + matchGap * 2) / 2;
	export const columnIncrement = (roundIdx: number, height: number, matchGap: number) => 2 ** roundIdx * (height + matchGap * 2);
	export const calcHeightIncrease = (roundIdx: number, matchIdx: number, height: number, matchGap: number) => columnIncrement(roundIdx, height, matchGap) * matchIdx;
	export const calcVerticalPos = (roundIdx: number, matchIdx: number, height: number, roundGap: number, matchGap: number) => calcHeightIncrease(roundIdx, matchIdx, height, matchGap) + calcVerticalStartingPoint(roundIdx, height, matchGap);

	export const calcXPos = (roundIdx: number, matchWidth: number, roundGap: number) => roundIdx * (matchWidth + roundGap * 2);
	export const calcYPos = (matchIdx: number, matchHeight: number, matchGap: number) => matchIdx * (matchHeight + matchGap * 2);

	export const calcMatchPos = (
		roundIdx: number, 
		matchIdx: number, 
		matchHeight: number,
		matchWidth: number,
		roundGap: number,
		matchGap: number,
		options: { 
			additionalX: number; 
			additionalY: number; 
		} = { 
			additionalX: 0, 
			additionalY: 0 
		}
	) => {
		const xPos = calcXPos(roundIdx, matchWidth, roundGap);
		const yPos = calcVerticalPos(roundIdx, matchIdx, matchHeight, roundGap, matchGap);
		// console.log(roundIdx, matchIdx, calcXPos(roundIdx, matchWidth, roundGap), calcYPos(matchIdx, matchHeight, matchGap), calcHeightIncrease(roundIdx, matchIdx, matchHeight, roundGap), calcVerticalPos(roundIdx, matchIdx, matchHeight, roundGap, matchGap)); 
		return { x: xPos + options.additionalX, y: yPos + options.additionalY };
	}

	export const getMatchPositionDataInner = (roundIdx: number, matchIdx: number, config: BracketConfig): MatchPositionData => {
		return {
			index: {
				round: roundIdx,
				match: matchIdx
			},
			position: calcMatchPos(roundIdx, matchIdx, config.matchStyle.height, config.matchStyle.width, config.roundStyle.gap, config.matchStyle.gap)
		}
	};
</script>

<script lang="ts">
	import { clsx } from "clsx";
	import type { SingleEliminationProps } from "../../internal/types.js";
	import { onDestroy, onMount } from "svelte";
	import type { BracketConfig, MatchPositionData } from "./types.js";
	import Connector from "./Connector.svelte";
	import { browser } from "$app/environment";
	import { setCtx } from "$lib/internal/ctx.js";
	import { MatchWrapper, Match } from "../components/index.js";
	import { overridable } from "$lib/internal/helpers/index.js";
	import { writable, type Writable } from "svelte/store";

	export let data: SingleEliminationProps;
	export const showAvatars: boolean = false;
	export const roundHeaderSize = { width: 0, height: 0 };
	export let config: BracketConfig = {
		matchStyle: {
			height: 52,
			width: 150,
			gap: 30
		},
		roundHeaderStyle: {
			height: 48,
			width: 150,
			bottomMargin: 50,
		},
		roundStyle: {
			gap: 30
		}
	};

	setCtx({
		tournamentData: data,
		onMatchClick: (match) => {
			console.log(match);
		}
	});

	let className: HTMLDivElement["className"] = "";

	let rounds = data.rounds.map((round) => {
		let roundMatches = data.matches.filter((match) => match.roundId === round.roundId);

		return {
			...round,
			matches: roundMatches
		};
	});

	let gameWidth = (rounds.length * config.matchStyle.width) + ((rounds.length - 1) *config.roundStyle.gap * 2);
	// let gameHeight = 
	//     (rounds[0].matches.length * config.matchStyle.height) + 
	//     ((rounds[0].matches.length - 1) * config.matchStyle.gap * 2) + 
	//     config.roundHeaderStyle.height + 
	//     config.roundHeaderStyle.bottomMargin;

	// console.log(rounds.map((round, idx) => getMatchPositionDataInner(idx, round.matches.length - 1, config).position.y + config.matchStyle.height));

	// gameHeight = Math.max(...rounds.map((round, idx) => getMatchPositionDataInner(idx, round.matches.length - 1, config).position.y + config.matchStyle.height));

	let gameHeight = Math.max(
		...rounds.map((round, idx) => 
			getMatchPositionDataInner(
				idx, 
				round.matches.length - 1, 
				config
			).position.y + config.matchStyle.height
		)
	) + config.roundHeaderStyle.height + config.roundHeaderStyle.bottomMargin;

	const getPreviousMatches = (roundIdx: number, matchIdx: number) => {
		return {
			previousTopMatch: roundIdx === 0 ? null : rounds[roundIdx - 1].matches[matchIdx * 2],
			previousBottomMatch: roundIdx === 0 ? null : rounds[roundIdx - 1].matches[matchIdx * 2 + 1]
		}
	}

	const getPreviousMatchesIndices = (roundIdx: number, matchIdx: number) => {
		return {
			previousTopMatch: roundIdx === 0 ? null : { round: roundIdx - 1, match: matchIdx * 2 },
			previousBottomMatch: roundIdx === 0 ? null : { round: roundIdx - 1, match: matchIdx * 2 + 1 }
		}
	}

	// const calcMatchVertPos = ( roundIdx: number, matchIdx: number, )

	// const calcMatchPos = ( roundIdx: number, matchIdx: number ) => { return { x: } }

	const getSelectStyles = () => {
		return data.entrants.map(({ entrantId }) => `[&:has(.id-${entrantId})_.id-${entrantId}]:border-slate-300`);
	}

	//TODO: get placement right
	//TODO: get size right

	
	const transformPos = (roundIdx: number, matchIdx: number) => {
		const { x, y } = calcMatchPos(
			roundIdx, 
			matchIdx, 
			config.matchStyle.height,
			config.matchStyle.width,
			config.roundStyle.gap,
			config.matchStyle.gap,
			{ 
				additionalY: config.roundHeaderStyle.bottomMargin + config.roundHeaderStyle.height, 
				additionalX: 0 
			}
		);

		return `translate(${x}, ${y})`; 
	};

	const getMatchPositionData = (roundIdx: number, matchIdx: number) => getMatchPositionDataInner(roundIdx, matchIdx, config);
		
	const transformHeaderPos = (roundIdx: number) => `translate(${calcXPos(roundIdx, config.matchStyle.width, config.roundStyle.gap)}, 0)`
	let selectors = data.entrants.map(({ entrantId }) => `*:has(.id-${entrantId}:hover) .id-${entrantId}`);

	// for tracking inserted selector rule
	let cssIndex: Writable<number | undefined> = writable(undefined);

	onMount(() => {
		if ($cssIndex === undefined) {
			$cssIndex = document.styleSheets[0].insertRule(`${selectors.join(", ")} { border-color: rgb(203 213 225); }`);
		}
		
		return (() => {
			if ($cssIndex !== undefined) {
				document.styleSheets[0].deleteRule($cssIndex);
				$cssIndex = undefined;
			}
		});
	});

	export { className as class };
</script>

<!-- <BracketViewer> -->
	<svg x="0" y="0" width={gameWidth} height={gameHeight} class={clsx(className)}>
		<rect x="0" y="0" width={gameWidth} height={gameHeight} />
		<g>
			{#each rounds as round, roundIdx}
				<g>
					<g>
						<foreignObject
							transform={transformHeaderPos(roundIdx)}
							width={config.roundHeaderStyle.width}
							height={config.roundHeaderStyle.height}
						>
							<slot name="round" {round}>
								<p class="h-full w-full text-center flex transition-colors items-center justify-center bg-purple-800 hover:bg-purple-500">{round.roundName}</p>
								<!-- <rect x={calcXPos(roundIdx)} y="0" height="48" width="150" />
								<text x={calcXPos(roundIdx) + (150 / 2)} y={48 / 2} fill="currentColor" rx="3" ry="3" dominant-baseline="middle" text-anchor="middle">{round.roundName}a</text> -->
							</slot>
						</foreignObject>
					</g>
					<g>
						{#each round.matches as match, matchIdx}
							{#if roundIdx !== 0}
								<!-- connector goes there -->
								<!-- {getPreviousMatches(roundIdx, matchIdx)} -->
								<slot 
									name="connector"
									indices={{ 
										currentMatch: { round: roundIdx, match: matchIdx },
										...getPreviousMatchesIndices(roundIdx, matchIdx)
									}}
									snippet={{
										currentMatch: match,
										...getPreviousMatches(roundIdx, matchIdx)
									}}
									{config}
								>
									<Connector
										indices={{ 
											currentMatch: { round: roundIdx, match: matchIdx },
											...getPreviousMatchesIndices(roundIdx, matchIdx)
										}}
										snippet={{
											currentMatch: match,
											...getPreviousMatches(roundIdx, matchIdx)
										}}
										{config}
									/>
								</slot>
							{/if}
							<foreignObject
								transform="{transformPos(roundIdx, matchIdx)}" 
								width={config.matchStyle.width} 
								height={config.matchStyle.height}
							>
								<slot name="match" {match}>
									<MatchWrapper
										match={match}
										entrant1={data.entrants.find((entrant) => entrant.entrantId === match.opponent1?.opponentId)}
										entrant2={data.entrants.find((entrant) => entrant.entrantId === match.opponent2?.opponentId)}

										let:entrant1={entrant1}
										let:entrant2={entrant2}
										let:isMatchHovered={isMatchHovered}
										let:isTopHovered={isTopHovered}
										let:isBottomHovered={isBottomHovered}
										let:onEnter={onEnter}
										let:onLeave={onLeave}
									>
										<Match {match} {entrant1} {entrant2} {isTopHovered} {isBottomHovered} {onEnter} {onLeave} />
									</MatchWrapper>
								</slot>
							</foreignObject>
						{/each}
					</g>
				</g>
			{/each}
		</g>
	</svg>
<!-- </BracketViewer> -->