<script
	lang="ts"
	generics="
		Round extends BaseRound = BaseRound,
		Match extends BaseMatch = BaseMatch, 
	"
>
	import { ConnectorWrapper } from "$lib/brackets/components";
	import {
		getPreviousMatches,
		shiftHeaderXPos,
		shiftMatchXPos,
	} from "$lib/internal/utils";
	import type {
		BaseMatch,
		BaseRound,
		DeepRequired,
		BracketConfig,
	} from "$lib";
	import type {
		RoundWithMatchData,
	} from "$lib/internal";

	export let bracketData: RoundWithMatchData<Round, Match>[];
	export let config: DeepRequired<BracketConfig>;
</script>

{#each bracketData as { matches, round }, roundIdx}
	{@const x = matches[0].position.x}
	<g>
		{#if config.showRoundHeaders}
			<g>
				<foreignObject
					x={shiftHeaderXPos(x, config)}
					y={config.padding.top}
					width={config.roundHeaderStyle.width}
					height={config.roundHeaderStyle.height}
				>
					<slot name="header" {round} {roundIdx} />
				</foreignObject>
			</g>
		{/if}
		<g>
			{#each matches as match, matchIdx}
				{@const y = match.position.y}
				{#if roundIdx !== 0}
					<ConnectorWrapper
						snippet={{
							currentMatch: match,
							...getPreviousMatches(
								bracketData,
								roundIdx,
								matchIdx,
							),
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
						/>
					</ConnectorWrapper>
				{/if}
				<foreignObject
					class="overflow-visible"
					x={shiftMatchXPos(x, config)}
					{y}
					width={config.matchStyle.width}
					height={config.matchStyle.height}
				>
					<slot
						name="match"
						match={match.data}
						matchIndices={match.indices}
					/>
				</foreignObject>
			{/each}
		</g>
	</g>
{/each}
