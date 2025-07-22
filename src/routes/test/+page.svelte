<script lang="ts">
	import {
		SingleEliminationBracket,
		DoubleEliminationBracket,
		type DoubleEliminationProps,
		type SingleEliminationProps,
		type DeepPartial,
		type DoubleElimBracketConfig,
	} from "$lib";
	import { SVGViewer } from "svelte-svg-viewer";
	import { derived, get, writable, type Writable } from "svelte/store";

	let singData: SingleEliminationProps = {
		rounds: [
			{
				id: 1,
				name: "Semifinals",
			},
			{
				id: 2,
				name: "Final",
			},
		],
		matches: [
			{
				id: 1,
				roundId: 1,
				opponent1: {
					id: 1,
					score: 2,
					status: "LOST",
				},
				opponent2: {
					id: 2,
					score: 3,
					status: "WON",
				},
				status: "DONE",
			},
			{
				id: 2,
				roundId: 1,
				opponent1: {
					id: 3,
					score: 3,
					status: "WON",
				},
				opponent2: {
					id: 4,
					score: 1,
					status: "LOST",
				},
				status: "DONE",
			},
			{
				id: 3,
				roundId: 2,
				opponent1: {
					id: 2,
				},
				opponent2: {
					id: 3,
				},
				status: "PENDING",
			},
		],
		entrants: [
			{
				id: 1,
				name: "Mario",
			},
			{
				id: 2,
				name: "Luigi",
			},
			{
				id: 3,
				name: "Zelda",
			},
			{
				id: 4,
				name: "Link",
			},
		],
	};

	let doubData: DoubleEliminationProps = {
		rounds: [
			{
				id: 1,
				name: "Opening Round",
			},
			{
				id: 2,
				name: "Quarterfinals",
			},
			{
				id: 3,
				name: "Semifinals",
			},
			{
				id: 4,
				name: "Grand Finals",
			},
			{
				id: 5,
				name: "True Finals",
			},
		],
		matches: {
			upper: [
				{
					id: 1,
					roundId: 1,
					nextMatchId: 5,
					nextLoserMatchId: 9,
					opponent1: {
						id: 1,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 2,
						score: 0,
						status: "LOST",
					},
					status: "DONE",
				},
				{
					id: 2,
					roundId: 1,
					nextMatchId: 5,
					nextLoserMatchId: 9,
					opponent1: {
						id: 3,
						score: 0,
						status: "LOST",
					},
					opponent2: {
						id: 4,
						score: 2,
						status: "WON",
					},
					status: "DONE",
				},
				{
					id: 3,
					roundId: 1,
					nextMatchId: 6,
					nextLoserMatchId: 10,
					opponent1: {
						id: 5,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 6,
						score: 1,
						status: "LOST",
					},
					status: "DONE",
				},
				{
					id: 4,
					roundId: 1,
					nextMatchId: 6,
					nextLoserMatchId: 10,
					opponent1: {
						id: 7,
						score: 0,
						status: "LOST",
					},
					opponent2: {
						id: 8,
						score: 2,
						status: "WON",
					},
					status: "DONE",
				},
				{
					id: 5,
					roundId: 2,
					nextMatchId: 7,
					nextLoserMatchId: 11,
					opponent1: {
						id: 1,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 4,
						score: 1,
						status: "LOST",
					},
					status: "DONE",
				},
				{
					id: 6,
					roundId: 2,
					nextMatchId: 7,
					nextLoserMatchId: 11,
					opponent1: {
						id: 5,
						score: 1,
						status: "LOST",
					},
					opponent2: {
						id: 8,
						score: 2,
						status: "WON",
					},
					status: "DONE",
				},
				{
					id: 7,
					roundId: 3,
					nextMatchId: 13,
					opponent1: {
						id: 1,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 8,
						score: 0,
						status: "LOST",
					},
					status: "DONE",
				},
				{
					id: 13,
					roundId: 4,
					nextMatchId: 14,
					opponent1: {
						id: 1,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 3,
						score: 1,
						status: "LOST",
					},
					status: "DONE",
				},
				{
					id: 14,
					roundId: 5,
					opponent1: {
						id: 1,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 3,
						score: 1,
						status: "LOST",
					},
					status: "DONE",
				},
			],
			lower: [
				{
					id: 9,
					roundId: 1,
					nextMatchId: 11,
					opponent1: {
						id: 2,
						score: 0,
						status: "LOST",
					},
					opponent2: {
						id: 3,
						score: 2,
						status: "WON",
					},
					status: "DONE",
				},
				{
					id: 10,
					roundId: 1,
					nextMatchId: 12,
					opponent1: {
						id: 6,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 7,
						score: 0,
						status: "LOST",
					},
					status: "DONE",
				},
				{
					id: 11,
					roundId: 2,
					nextMatchId: 12,
					opponent1: {
						id: 3,
						score: 2,
						status: "WON",
					},
					opponent2: {
						id: 4,
						score: 0,
						status: "LOST",
					},
					status: "DONE",
				},
				{
					id: 12,
					roundId: 3,
					nextMatchId: 13,
					opponent1: {
						id: 6,
						score: 0,
						status: "LOST",
					},
					opponent2: {
						id: 3,
						score: 2,
						status: "WON",
					},
					status: "DONE",
				},
			],
		},
		entrants: [
			{
				id: 1,
				name: "Thunder Wolves",
			},
			{
				id: 2,
				name: "Sky Knights",
			},
			{
				id: 3,
				name: "Dragon Fury",
			},
			{
				id: 4,
				name: "Phoenix Blaze",
			},
			{
				id: 5,
				name: "Ice Giants",
			},
			{
				id: 6,
				name: "Shadow Hunters",
			},
			{
				id: 7,
				name: "Solar Flares",
			},
			{
				id: 8,
				name: "Lunar Eclipse",
			},
		],
	};

	function change1() {
		singData.matches[2] = {
			id: 3,
			roundId: 2,
			opponent1: {
				id: 2,
				score: 2,
				status: "WON",
			},
			opponent2: {
				id: 3,
				score: 0,
				status: "LOST",
			},
			status: "DONE",
		};
	}

	function change2() {
		singData.matches[0] = {
			id: 1,
			roundId: 1,
			opponent1: {
				id: 2,
				score: 3,
				status: "WON",
			},
			opponent2: {
				id: 1,
				score: 2,
				status: "LOST",
			},
			status: "DONE",
		};
	}

	function change3() {
		doubData.matches.upper[0] = {
			id: 1,
			roundId: 1,
			nextMatchId: 5,
			nextLoserMatchId: 9,
			opponent2: {
				id: 1,
				score: 2,
				status: "WON",
			},
			opponent1: {
				id: 2,
				score: 0,
				status: "LOST",
			},
			status: "DONE",
		};
	}

	type BooleanControl = {
		label: string;
		value: boolean;
		type: "boolean";
	};

	type NumberControl = {
		label: string;
		value: number;
		min?: number;
		max?: number;
		type: "number";
	};

	type SelectControl = {
		label: string;
		options: string[];
		value: string;
		type: "select";
	};

	type Control = BooleanControl | NumberControl | SelectControl;
	type SchemaExtends = Record<string, Control>;
	type NormalizeType<T> = T extends string
		? T
		: T extends number
			? T
			: T extends boolean
				? boolean
				: // eslint-disable-next-line @typescript-eslint/no-explicit-any
					T extends Record<string, any>
					? T
					: never;
	type ToWritableValue<T extends Control> = Omit<T, "value"> & {
		value: Writable<NormalizeType<T["value"]>>;
	};
	type Context<Schema extends SchemaExtends> = {
		[K in keyof Schema]: ToWritableValue<Schema[K]> & { id: string };
	};

	function toControls<Schema extends SchemaExtends>(
		schema: Schema,
	): Context<Schema> {
		return Object.entries(schema).reduce(
			(obj, [key, { value, ...other }]) => {
				return {
					...obj,
					[key]: {
						...other,
						id: toSnakeCase(other.label),
						value: writable(value),
					},
				};
			},
			{},
		) as Context<Schema>;
	}

	function toSnakeCase(string: string) {
		return string.toLowerCase().replaceAll(" ", "-");
	}

	const controls = toControls({
		showRoundHeaders: {
			label: "Show round headers",
			value: true,
			type: "boolean",
		},
		matchHeight: {
			label: "Match height",
			value: 55,
			min: 30,
			max: 100,
			type: "number",
		},
		matchWidth: {
			label: "Match width",
			value: 150,
			min: 60,
			max: 200,
			type: "number",
		},
		matchGap: {
			label: "Match gap",
			value: 60,
			min: 10,
			max: 140,
			type: "number",
		},
		roundGap: {
			label: "Round gap",
			value: 70,
			min: 20,
			max: 140,
			type: "number",
		},
		bracketGap: {
			label: "Bracket gap",
			value: 60,
			min: 20,
			max: 140,
			type: "number",
		},
		direction: {
			label: "Direction",
			value: "ltr",
			options: ["ltr", "rtl"],
			type: "select",
		},
	});

	$: showRoundHeaders = controls.showRoundHeaders.value;
	$: matchHeight = controls.matchHeight.value;
	$: matchWidth = controls.matchWidth.value;
	$: matchGap = controls.matchGap.value;
	$: roundGap = controls.roundGap.value;
	$: bracketGap = controls.bracketGap.value;
	$: direction = controls.direction.value;

	$: config = {
		showRoundHeaders: $showRoundHeaders,
		matchStyle: {
			height: $matchHeight,
			width: $matchWidth,
			gap: $matchGap,
		},
		roundGap: $roundGap,
		bracketGap: $bracketGap,
		direction: $direction as "ltr" | "rtl",
	} satisfies DeepPartial<DoubleElimBracketConfig>;

	$: console.log(config);
</script>

<div class="flex h-full w-full flex-row justify-between gap-5 px-20 pt-5">
	<div class="flex flex-col items-center justify-start">
		<SVGViewer width="520px" height="350px" lockToBoundaries>
			<SingleEliminationBracket
				data={singData}
				onMatchClick={(match) => console.log(match)}
				{config}
			/>
		</SVGViewer>
		<button on:click={change2}>Change</button>
		<code class="w-fit max-w-[280px]">
			{#each singData.matches as match}
				<pre class="">{JSON.stringify(match, undefined, "	")}</pre>
			{/each}
		</code>
	</div>
	<div class="flex flex-col items-start gap-4">
		{#each Object.values(controls) as control}
			<div class="flex flex-row-reverse gap-2">
				<label for={control.id}>{control.label}</label>
				{#if control.type === "boolean"}
					<input
						id={control.id}
						checked={get(control.value)}
						on:change={(v) =>
							control.value.update(() => v.currentTarget.checked)}
						type="checkbox"
					/>
				{:else if control.type === "number"}
					<input
						id={control.id}
						value={get(control.value)}
						on:change={(v) =>
							control.value.update(() =>
								Number(v.currentTarget.value),
							)}
						min={control.min}
						max={control.max}
						type="range"
					/>
				{:else if control.type === "select"}
					<select
						id={control.id}
						value={get(control.value)}
						on:change={(v) =>
							control.value.update(() => v.currentTarget.value)}
					>
						{#each control.options as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex flex-col items-center justify-start">
		<SVGViewer width="520px" height="350px" lockToBoundaries>
			<DoubleEliminationBracket
				data={doubData}
				onMatchClick={(match) => console.log(match)}
				{config}
			/>
		</SVGViewer>
		<button on:click={change3}>Change</button>
		<div class="flex flex-row gap-4">
			<div>
				<p>Upper</p>
				<code class="w-fit max-w-[280px]">
					{#each doubData.matches.upper as match}
						<pre class="">{JSON.stringify(
								match,
								undefined,
								"	",
							)}</pre>
					{/each}
				</code>
			</div>
			<div>
				<p>Lower</p>
				<code class="w-fit max-w-[280px]">
					{#each doubData.matches.lower as match}
						<pre class="">{JSON.stringify(
								match,
								undefined,
								"	",
							)}</pre>
					{/each}
				</code>
			</div>
		</div>
	</div>
</div>
