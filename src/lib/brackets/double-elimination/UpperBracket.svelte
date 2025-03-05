<script 
	lang="ts"
	generics="
		Match extends BaseMatch = BaseMatch, 
		Round extends BaseRound = BaseRound
	"
>
	import { ConnectorWrapper } from "$lib/brackets/components";
	import { getPreviousMatches } from "$lib/internal/utils";
	import type { BaseMatch, BaseRound, MatchData, BracketConfig } from "$lib/internal";

	export let bracketData: (Round & { matches: MatchData<Match>[]; })[];
	export let config: BracketConfig;
</script>

{#each bracketData as round, roundIdx}
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
			{#each round.matches as match, matchIdx}
				{@const y = match.position.y}
				{#if roundIdx !== 0}
					<ConnectorWrapper
						snippet={{
							currentMatch: match,
							...getPreviousMatches(
								bracketData, 
								roundIdx, 
								matchIdx
							),
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
				{/if}
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