<script
	lang="ts"
	generics="
		Round extends BaseRound = BaseRound,
		Match extends BaseMatch = BaseMatch, 
	"
>
	import { ConnectorWrapper } from "$lib/brackets/components";
	import type {
		BaseMatch,
		BaseRound,
		DeepRequired,
		BracketConfig,
	} from "$lib";
	import type {
		MatchData,
		RoundWithMatchData,
	} from "$lib/internal";
	import { shiftHeaderXPos, shiftMatchXPos } from "$lib/internal/utils";

	export let bracketData: RoundWithMatchData<Round, Match>[];
	export let config: DeepRequired<BracketConfig>;
	export let bracketHeight: number;
	export let lastWinnerMatch: MatchData<Match>;
	export let lastLoserMatch: MatchData<Match>;
</script>

{#each bracketData as {matches, round: round}, roundIdx}
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
			{#each matches as match}
				{@const y =
					(bracketHeight + config.roundHeaderStyle.bottomMargin) / 2}
				<ConnectorWrapper
					snippet={{
						currentMatch: {
							...match,
							position: {
								x,
								y,
							},
						},
						previousTopMatch: lastWinnerMatch,
						previousBottomMatch: lastLoserMatch,
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
