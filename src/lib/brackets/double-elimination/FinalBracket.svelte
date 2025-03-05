<script 
	lang="ts"
	generics="
		Match extends BaseMatch = BaseMatch, 
		Round extends BaseRound = BaseRound
	"
>
	import { ConnectorWrapper } from "$lib/brackets/components";
	import type { BaseMatch, BaseRound, MatchData, BracketConfig } from "$lib/internal";

	export let bracketData: (Round & { matches: MatchData<Match>[]; })[];
	export let config: BracketConfig;
	export let bracketHeight: number;
	export let lastWinnerMatch: MatchData;
	export let lastLoserMatch: MatchData;
</script>

{#each bracketData as round}
	{@const x = round.matches[0].position.x}
	<g>
		{#if config.showRoundHeaders}
			<g>
				<foreignObject
					{x}
					y={config.padding.top}
					width={config.roundHeaderStyle.width}
					height={config.roundHeaderStyle.height}
				>
					<slot name="header" {round} />
				</foreignObject>
			</g>
		{/if}
		<g>
			{#each round.matches as match}
				{@const y = (
					bracketHeight +
					config.roundHeaderStyle.bottomMargin) / 2}
				<ConnectorWrapper
					snippet={{
						currentMatch: {
							...match,
							position: {
								x,
								y
							}
						},
						previousTopMatch: lastWinnerMatch,
						previousBottomMatch: lastLoserMatch,
					}}
					{config}
					let:topMatchPosition
					let:bottomMatchPosition
					let:currentMatchPosition
					let:isTopHighlighted
					let:isBottomHighlighted
					let:config
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
				<foreignObject
					{x}
					{y}
					width={config.matchStyle.width}
					height={config.matchStyle.height}
				>
					<slot name="match" {match} />
				</foreignObject>
			{/each}
		</g>
	</g>
{/each}