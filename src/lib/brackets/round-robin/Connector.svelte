<script lang="ts">
    export let topMatchPosition: { roundIdx: number; matchIdx: number } | null = null;
    export let bottomMatchPosition: { roundIdx: number; matchIdx: number } | null = null;
</script>

{#if topMatchPosition !== null}
    <path 
        d="M{30},H{30},V{30},H{30}"
        fill="purple"
    />
{/if}
{#if bottomMatchPosition !== null}
    <path 
        d="M{90},H{30},V{-30},H{30}"
        fill="purple"
    />
{/if}

