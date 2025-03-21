<script lang="ts" generics="Round extends BaseRound = BaseRound">
	import type { BaseRound } from "$lib/internal/types.js";

	export let round: Round;
</script>

<p
	class="text-md box-border flex h-full grow cursor-default items-center justify-center
	rounded-md border-2 border-neutral-500 bg-neutral-100 text-center font-bold
	uppercase text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-black
	dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
>
	{round.roundName}
</p>
