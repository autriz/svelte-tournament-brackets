<script 
	lang="ts"
	generics="
		Round extends BaseRound = BaseRound,
		MatchEntrant extends BaseMatchEntrant = BaseMatchEntrant,
		Match extends BaseMatch<MatchEntrant> = BaseMatch<MatchEntrant>, 
	"
>
	import { ConnectorWrapper } from "$lib/brackets/components";
	import { getPreviousMatches, shiftMatchXPos } from "$lib/internal/utils";
	import type { 
		BaseMatch, 
		BaseRound, 
		MatchData, 
		BracketConfig, 
		DeepRequired, 
		BaseMatchEntrant
	} from "$lib/internal";

	export let bracketData: (Round & { matches: MatchData<MatchEntrant, Match>[]; })[];
	export let config: DeepRequired<BracketConfig>;
</script>

{#each bracketData as round, roundIdx}
	{@const x = shiftMatchXPos(round.matches[0].position.x, config)}
	<g>
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
					{x}
					{y}
					width={config.matchStyle.width}
					height={config.matchStyle.height}
				>
					<slot name="match" match={match.data} indices={match.indices} />
				</foreignObject>
			{/each}
		</g>
	</g>
{/each}