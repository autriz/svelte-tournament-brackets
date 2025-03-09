<script lang="ts" generics="Round extends BaseRound = BaseRound">
	import type { BaseRound } from "$lib/internal/types.js";

	export let round: Round;
</script>

<p
	class="text-md box-border flex h-full grow cursor-default items-center justify-center
	rounded-md border-2 border-neutral-700 bg-neutral-900 text-center
	font-bold uppercase text-neutral-300 transition-colors hover:bg-neutral-800
	hover:text-white"
>
	{round.roundName}
</p>
