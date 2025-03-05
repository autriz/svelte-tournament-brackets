<script lang="ts" generics="Round extends BaseRound = BaseRound">
	import type { BaseRound } from "$lib/internal/types.js";

	export let round: Round;
</script>

<p
	class="flex grow h-full items-center justify-center font-bold text-md uppercase 
	border-2 box-border border-neutral-700 rounded-md bg-neutral-900 
	cursor-default text-center transition-colors text-neutral-300 hover:text-white
	hover:bg-neutral-800"
>
	{round.roundName}
</p>