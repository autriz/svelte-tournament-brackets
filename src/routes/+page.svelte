<script lang="ts">
    import { SVGViewer } from "svelte-svg-viewer";
    import { SingleEliminationBracket, type SingleEliminationProps } from "$lib/index.js";
    import type { PageData } from "./$types.js";
    import { getContext, onMount } from "svelte";

    export let data: PageData;

    let toggled: boolean = true;

    let tournamentData: SingleEliminationProps = data.tournament as SingleEliminationProps;
</script>

<div class="w-screen h-fit flex flex-col bg-black text-white">
    <!-- <BracketViewer bind:data={data}>
        <div slot="round" let:round>{round.roundName}</div>
        <div 
            class="bg-green-800 w-fit h-fit"
            slot="match" 
            let:match
        >
            <div>
                {#if match.opponent1}
                    <p>
                        {data.entrants.find((entrant) => entrant.entrantID === match.opponent1?.opponentID)?.entrantName}
                    </p>
                {/if}
            </div>
            <div>
                {#if match.opponent2}
                    <p>
                        {data.entrants.find((entrant) => entrant.entrantID === match.opponent2?.opponentID)?.entrantName}
                    </p>
                {/if}
            </div>
        </div>
    </BracketViewer> -->
    <div class="w-full h-full p-4">
        <h1>Single Elimination Bracket in SVGViewer</h1>
        <button on:click={() => { toggled = !toggled }}>Toggle</button>
        {#if toggled}
            <div class="p-2 bg-[#0b0d13]">
                <SVGViewer
                    height={"800px"}
                    width={"800px"}
                    class="m-4"
                    defaultLockToBoundaries={true}
                    maxScale={100.0}
                >
                    <SingleEliminationBracket class="fill-[#0b0d13]" data={tournamentData} />
                </SVGViewer>
            </div>
        {/if}
    </div>
    <div class="w-full h-full p-4">
        <h1>Single Elimination Bracket in div</h1>
        <div class="p-4">
            <SingleEliminationBracket class="fill-[#0b0d13]" data={tournamentData} />
        </div>
    </div>
    <!-- <div>
        <div class="flex">
            <div class="w-8 h-8 acd">
    
            </div>
            <div class="w-8 h-8 abd">
    
            </div>
        </div>
        <div class="flex">
            <div class="w-8 h-8 abd">
                
            </div>
            <div class="w-8 h-8 acd">
    
            </div>
        </div>
        <div class="flex">
            <div class="w-8 h-8 abd">
    
            </div>
            <div class="w-8 h-8 acd">
    
            </div>
        </div>
        <div class="flex">
            <div class="w-8 h-8 acd">
    
            </div>
            <div class="w-8 h-8 abd">
    
            </div>
        </div>
        <svg>
            <rect x=0 y=0 width=100 height=100 class="fill-slate-400 hover:fill-slate-700 transition-colors ease-in-out"></rect>
        </svg>
    </div> -->
</div>

<!-- <style>
    .acd, .abd {
        @apply bg-slate-600;
        @apply transition-colors;
        @apply ease-in-out;
        @apply border;
        @apply border-gray-800;
    }

    *:has(.acd:hover) .acd, *:has(.abd:hover) .abd {
        @apply border-gray-300;
    }
</style> -->
