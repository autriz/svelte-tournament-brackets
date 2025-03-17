<script lang="ts">
    import { DoubleEliminationBracket } from "svelte-tournament-brackets";
    import type { DoubleEliminationProps } from "svelte-tournament-brackets";

    let data: DoubleEliminationProps = {/* data */};
</script>

<DoubleEliminationBracket {data} />