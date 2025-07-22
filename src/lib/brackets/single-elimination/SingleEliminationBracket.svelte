<script
	lang="ts"
	generics="
		BracketConfig extends BaseBracketConfig,
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
		SingleEliminationProps,
		BracketConfig as BaseBracketConfig,
		DeepPartial,
	} from "$lib";
	import {
		Connector,
		BracketSection,
		Match,
		RoundHeader,
		SvgWrapper,
	} from "$lib/brackets/components";
	import {
		setCtx,
		processSingleEliminationData,
		createConfig,
	} from "$lib/internal";

	export let data: SingleEliminationProps<Round, Match, Entrant>;
	let bracketConfig: DeepPartial<BracketConfig> | undefined = undefined;
	export { bracketConfig as config };
	export let onMatchClick: ((match: Match) => void) | undefined = undefined;

	let config = writable(createConfig(bracketConfig));

	setCtx({ config });

	$: $config = createConfig(bracketConfig);

	let className: HTMLDivElement["className"] = "";
	export { className as class };

	$: ({ width, height, bracketData } = processSingleEliminationData(
		data,
		$config,
	));
	$: entrantIndexMap = new Map(
		data.entrants.map((entrant, index) => [entrant.id, index]),
	);

	export { height, width };
</script>

<SvgWrapper {width} {height} class={className}>
	<BracketSection
		sectionData={bracketData}
		{data}
		config={$config}
		{entrantIndexMap}
	>
		<svelte:fragment slot="header" let:round>
			<slot name="header" {round}>
				<RoundHeader {round} />
			</slot>
		</svelte:fragment>
		<svelte:fragment
			slot="connector"
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
		</svelte:fragment>
	</BracketSection>
</SvgWrapper>
