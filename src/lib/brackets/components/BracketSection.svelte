<script context="module" lang="ts">
	function getEntrantsIndices<
		Entrant extends BaseEntrant,
		Match extends BaseMatch,
	>(entrantIndexMap: Map<Entrant["id"], number>, match: Match) {
		return {
			entrant1: entrantIndexMap.get(match.opponent1!.id),
			entrant2: entrantIndexMap.get(match.opponent2!.id),
		};
	}

	function getEntrants<
		Round extends BaseRound,
		Entrant extends BaseEntrant,
		Props extends BaseProps<Round, Entrant>,
	>(
		data: Props,
		entrantIndices: {
			entrant1: number | undefined;
			entrant2: number | undefined;
		},
	): { entrant1: Entrant | undefined; entrant2: Entrant | undefined } {
		return {
			entrant1: data.entrants[entrantIndices.entrant1!],
			entrant2: data.entrants[entrantIndices.entrant2!],
		};
	}
</script>

<script
	lang="ts"
	generics="
        Config extends BracketConfig,
		Round extends BaseRound, 
		Match extends BaseMatch,
		Entrant extends BaseEntrant,
		Props extends BaseProps<Round, Entrant>,
    "
>
	import {
		getPreviousMatches,
		shiftHeaderXPos,
		shiftMatchXPos,
		type MatchData,
		type RoundWithMatchData,
	} from "$lib/internal";
	import { ConnectorWrapper, MatchWrapper } from ".";
	import type {
		BaseEntrant,
		BaseMatch,
		BaseProps,
		BaseRound,
		BracketConfig,
		Id,
	} from "../types";

	export let data: Props;
	export let sectionData: RoundWithMatchData<Round, Match>[];
	export let config: Config;
	export let finals: boolean = false;
	export let lastWinnerMatch: MatchData<Match> | undefined = undefined;
	export let lastLoserMatch: MatchData<Match> | undefined = undefined;
	export let entrantIndexMap: Map<Id, number>;
</script>

{#each sectionData as { matches, round }, roundIdx}
	{@const x = matches[0].position.x}
	<g>
		{#if config.showRoundHeaders && $$slots["header"]}
			<g>
				<foreignObject
					x={shiftHeaderXPos(x, config)}
					y={config.padding.top}
					width={config.roundHeaderStyle.width}
					height={config.roundHeaderStyle.height}
				>
					<slot name="header" {round} />
				</foreignObject>
			</g>
		{/if}
		<g>
			{#each matches as match, matchIdx}
				{@const y = match.position.y}
				{@const previousMatches =
					finals && roundIdx === 0
						? {
								previousBottomMatch: lastLoserMatch,
								previousTopMatch: lastWinnerMatch,
							}
						: getPreviousMatches(sectionData, roundIdx, matchIdx)}
				{@const matchData = match.data}
				{#if finals || roundIdx !== 0}
					<ConnectorWrapper
						snippet={{
							currentMatch: {
								...match,
								position: !finals ? match.position : { x, y },
							},
							...previousMatches,
						}}
						let:topMatchPosition
						let:bottomMatchPosition
						let:currentMatchPosition
						let:isTopHighlighted
						let:isBottomHighlighted
					>
						<slot
							name="connector"
							{topMatchPosition}
							{bottomMatchPosition}
							{currentMatchPosition}
							{isTopHighlighted}
							{isBottomHighlighted}
							{config}
						/>
					</ConnectorWrapper>
				{/if}
				<foreignObject
					x={shiftMatchXPos(x, config)}
					{y}
					width={config.matchStyle.width}
					height={config.matchStyle.height}
				>
					<MatchWrapper
						match={matchData}
						let:isMatchHovered
						let:isTopHovered
						let:isBottomHovered
						let:onEnter
						let:onLeave
					>
						{@const entrantIndices = getEntrantsIndices(
							entrantIndexMap,
							matchData,
						)}
						{@const indices = {
							...entrantIndices,
							...match.indices,
						}}
						{@const { entrant1, entrant2 } = getEntrants(
							data,
							entrantIndices,
						)}
						<slot
							name="match"
							match={matchData}
							{indices}
							{entrant1}
							{entrant2}
							{isTopHovered}
							{isBottomHovered}
							{isMatchHovered}
							{onEnter}
							{onLeave}
						/>
					</MatchWrapper>
				</foreignObject>
			{/each}
		</g>
	</g>
{/each}

<style>
	foreignObject {
		overflow: visible;
	}
</style>
