<script
	lang="ts"
	generics="
		BracketConfig extends DoubleElimBracketConfig,
		Round extends BaseRound, 
		Match extends BaseMatch,
		Entrant extends BaseEntrant
	"
>
	import { writable } from "svelte/store";
	import { onMount } from "svelte";
	import type {
		BaseEntrant,
		BaseRound,
		BaseMatch,
		DoubleEliminationProps,
		DoubleElimBracketConfig,
		DeepPartial,
	} from "$lib";
	import {
		Connector,
		Match,
		RoundHeader,
		SvgWrapper,
		BracketSection,
	} from "$lib/brackets/components";
	import {
		setCtx,
		processDoubleEliminationData,
		createConfig,
	} from "$lib/internal";

	export let data: DoubleEliminationProps<Round, Match, Entrant>;
	let bracketConfig: DeepPartial<BracketConfig> | undefined = undefined;
	export { bracketConfig as config };
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	let config = writable(createConfig(bracketConfig));

	setCtx({ config });

	$: $config = createConfig(bracketConfig);

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	$: ({
		width,
		height,
		winnerBracketData,
		loserBracketData,
		finalsBracketData,
	} = processDoubleEliminationData(data, $config));
	$: entrantIndexMap = new Map(
		data.entrants.map((entrant, index) => [entrant.id, index]),
	);

	export { height, width };
</script>

<SvgWrapper {height} {width} class={className}>
	<BracketSection
		sectionData={winnerBracketData}
		{data}
		config={$config}
		{entrantIndexMap}
	>
		<svelte:fragment slot="header" let:round>
			{#if !$$slots["winner-header"]}
				<slot name="header" {round}>
					<RoundHeader {round} />
				</slot>
			{:else}
				<slot name="winner-header" {round} />
			{/if}
		</svelte:fragment>
		<svelte:fragment
			slot="connector"
			let:topMatchPosition
			let:bottomMatchPosition
			let:currentMatchPosition
			let:isTopHighlighted
			let:isBottomHighlighted
		>
			{#if !$$slots["winner-connector"]}
				<slot
					name="connector"
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					config={$config}
				>
					<Connector
						{topMatchPosition}
						{bottomMatchPosition}
						{currentMatchPosition}
						{isTopHighlighted}
						{isBottomHighlighted}
						config={$config}
					/>
				</slot>
			{:else}
				<slot
					name="winner-connector"
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					config={$config}
				/>
			{/if}
		</svelte:fragment>
		<svelte:fragment
			slot="match"
			let:match
			let:indices
			let:entrant1
			let:entrant2
			let:isTopHovered
			let:isBottomHovered
			let:isMatchHovered
			let:onEnter
			let:onLeave
		>
			{#if !$$slots["winner-match"]}
				<slot
					name="match"
					{match}
					{indices}
					{entrant1}
					{entrant2}
					{isTopHovered}
					{isBottomHovered}
					{isMatchHovered}
					{onMatchClick}
					{onEnter}
					{onLeave}
				>
					<Match
						{match}
						{indices}
						{entrant1}
						{entrant2}
						{isTopHovered}
						{isBottomHovered}
						{onMatchClick}
						{onEnter}
						{onLeave}
					/>
				</slot>
			{:else}
				<slot
					name="winner-match"
					{match}
					{indices}
					{entrant1}
					{entrant2}
					{isTopHovered}
					{isBottomHovered}
					{isMatchHovered}
					{onMatchClick}
					{onEnter}
					{onLeave}
				/>
			{/if}
		</svelte:fragment>
	</BracketSection>
	<!-- Lower bracket -->
	<BracketSection
		sectionData={loserBracketData}
		{data}
		config={$config}
		{entrantIndexMap}
	>
		<svelte:fragment
			slot="connector"
			let:topMatchPosition
			let:bottomMatchPosition
			let:currentMatchPosition
			let:isTopHighlighted
			let:isBottomHighlighted
		>
			{#if !$$slots["loser-connector"]}
				<slot
					name="connector"
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					config={$config}
				>
					<Connector
						{topMatchPosition}
						{bottomMatchPosition}
						{currentMatchPosition}
						{isTopHighlighted}
						{isBottomHighlighted}
						config={$config}
					/>
				</slot>
			{:else}
				<slot
					name="loser-connector"
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					config={$config}
				/>
			{/if}
		</svelte:fragment>
		<svelte:fragment
			slot="match"
			let:match
			let:indices
			let:entrant1
			let:entrant2
			let:isTopHovered
			let:isBottomHovered
			let:isMatchHovered
			let:onEnter
			let:onLeave
		>
			{#if !$$slots["loser-match"]}
				<slot
					name="match"
					{match}
					{indices}
					{entrant1}
					{entrant2}
					{isTopHovered}
					{isBottomHovered}
					{isMatchHovered}
					{onMatchClick}
					{onEnter}
					{onLeave}
				>
					<Match
						{match}
						{indices}
						{entrant1}
						{entrant2}
						{isTopHovered}
						{isBottomHovered}
						{onMatchClick}
						{onEnter}
						{onLeave}
					/>
				</slot>
			{:else}
				<slot
					name="loser-match"
					{match}
					{indices}
					{entrant1}
					{entrant2}
					{isTopHovered}
					{isBottomHovered}
					{isMatchHovered}
					{onMatchClick}
					{onEnter}
					{onLeave}
				/>
			{/if}
		</svelte:fragment>
	</BracketSection>
	<!-- Finals -->
	<BracketSection
		sectionData={finalsBracketData}
		finals
		lastWinnerMatch={winnerBracketData[winnerBracketData.length - 1]
			.matches[0]}
		lastLoserMatch={loserBracketData[loserBracketData.length - 1]
			.matches[0]}
		config={$config}
		{data}
		{entrantIndexMap}
	>
		<svelte:fragment slot="header" let:round>
			{#if !$$slots["finals-header"]}
				<slot name="header" {round}>
					<RoundHeader {round} />
				</slot>
			{:else}
				<slot name="finals-header" {round} />
			{/if}
		</svelte:fragment>
		<svelte:fragment
			slot="connector"
			let:topMatchPosition
			let:bottomMatchPosition
			let:currentMatchPosition
			let:isTopHighlighted
			let:isBottomHighlighted
		>
			{#if !$$slots["finals-connector"]}
				<slot
					name="connector"
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					config={$config}
				>
					<Connector
						{topMatchPosition}
						{bottomMatchPosition}
						{currentMatchPosition}
						{isTopHighlighted}
						{isBottomHighlighted}
						config={$config}
					/>
				</slot>
			{:else}
				<slot
					name="finals-connector"
					{topMatchPosition}
					{bottomMatchPosition}
					{currentMatchPosition}
					{isTopHighlighted}
					{isBottomHighlighted}
					config={$config}
				/>
			{/if}
		</svelte:fragment>
		<svelte:fragment
			slot="match"
			let:match
			let:indices
			let:entrant1
			let:entrant2
			let:isTopHovered
			let:isBottomHovered
			let:isMatchHovered
			let:onEnter
			let:onLeave
		>
			{#if !$$slots["finals-match"]}
				<slot
					name="match"
					{match}
					{indices}
					{entrant1}
					{entrant2}
					{isTopHovered}
					{isBottomHovered}
					{isMatchHovered}
					{onMatchClick}
					{onEnter}
					{onLeave}
				>
					<Match
						{match}
						{indices}
						{entrant1}
						{entrant2}
						{isTopHovered}
						{isBottomHovered}
						{onMatchClick}
						{onEnter}
						{onLeave}
					/>
				</slot>
			{:else}
				<slot
					name="finals-match"
					{match}
					{indices}
					{entrant1}
					{entrant2}
					{isTopHovered}
					{isBottomHovered}
					{isMatchHovered}
					{onMatchClick}
					{onEnter}
					{onLeave}
				/>
			{/if}
		</svelte:fragment>
	</BracketSection>
</SvgWrapper>
