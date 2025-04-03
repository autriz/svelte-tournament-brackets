<script lang="ts" generics="Round extends BaseRound = BaseRound">
	import type { BaseRound } from "$lib";

	export let round: Round;
</script>

<p data-bracket-round-header>
	{round.name}
</p>
