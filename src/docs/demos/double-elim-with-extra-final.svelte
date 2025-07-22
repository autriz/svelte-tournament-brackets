<script lang="ts">
	import { DoubleEliminationBracket } from "$lib";
	import data from "$docs/mock-data/double-elim-with-extra-final";
</script>

<DoubleEliminationBracket
	{data}
	class="fill-transparent"
	config={{ showRoundHeaders: false }}
/>
