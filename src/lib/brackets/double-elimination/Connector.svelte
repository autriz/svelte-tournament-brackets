<script lang="ts">
    export let topMatchPosition: { roundIdx: number; matchIdx: number } | null = null;
    export let bottomMatchPosition: { roundIdx: number; matchIdx: number } | null = null;
</script>

{#if topMatchPosition !== null}
    <path />
{/if}
{#if bottomMatchPosition !== null}
    <path />
{/if}

