<script lang="ts">
    import { onMount } from "svelte";
    import { SVGViewer } from "svelte-svg-viewer";

    let gapHeight = 100;
    let gapWidth = 100;
    $: width = 0;
    $: height = 0;

    let arrs = [[1,2], [1,2,3], [1,2,3]];
    
    $: biggestIdx = arrs.map((arr) => arr.length).sort((a, b) => a - b)[0];
    
    $: gameWidth = (width * arrs.length) + (gapWidth * (arrs.length - 1));
    $: gameHeight = height * arrs[biggestIdx].length + gapHeight * (arrs[biggestIdx].length - 1);
    
    let test: HTMLDivElement;

    const calcYPosInternal = (idx: number, height: number) => (height + gapHeight) * idx;
    const calcXPosInternal = (idx: number, width: number) => (width + gapWidth) * idx;
    
    $: calcYPos = (idx: number) => calcYPosInternal(idx, height);
    $: calcXPos = (idx: number) => calcXPosInternal(idx, width);

    $: calcRectYCenter = (idx: number) => calcYPosInternal(idx, height) + height / 2;
    $: calcRectXCenter = (idx: number) => calcXPosInternal(idx, width) + width / 2;

    onMount(() => {
        let rect = test.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        arrs.map((arr) => {
            let temp = rect.height * arr.length + gapHeight * (arr.length - 1);

            if (gameHeight < temp) gameHeight = temp;
        });
        gameWidth = (rect.width * arrs.length) + (gapWidth * (arrs.length - 1));
    });
</script>

<div>
    <SVGViewer
        height={"80vh"}
        width={"80vw"}
        class="m-4"
        defaultLockToBoundaries={true}
    >
        <svg x="0" y="0" width={gameWidth} height={gameHeight}>
            <rect x="0" y="0" width={gameWidth} height={gameHeight} fill="#0B0D13"/>
            {#each arrs as arr, arrIdx}
                <g>
                    {#each arr as val, valIdx}
                        {#if arrIdx !== 0 && arrs[arrIdx - 1].at(valIdx)}
                            <path 
                                d="M{calcXPos(arrIdx - 1) + width} {calcRectYCenter(valIdx)} H{calcXPos(arrIdx) + width}"
                                fill="transparent"
                                stroke="white"
                                class="hover:stroke-gray-700 hover:z-10"
                            />
                        {/if}
                        <foreignObject 
                            transform="translate({calcXPos(arrIdx)}, {calcYPos(valIdx)})" 
                            width="{width}" 
                            height="{height}"
                        >
                            <div bind:this={test} class="w-fit h-fit bg-slate-600 hover:bg-slate-700">
                                <div style="height: {height}px; width: {width}px;">
                                    [{arrIdx}][{valIdx}] = {val}
                                </div>
                            </div>
                        </foreignObject>
                    {/each}
                </g>
            {/each}
        </svg>
    </SVGViewer>
    <div>
        <label for="width-range">Width</label>
        <input bind:value={width} type="range" min="100" max="600" id="width-range"/>
    </div>
    <div>
        <label for="height-range">Height</label>
        <input bind:value={height} type="range" min="100" max="600" id="height-range"/>
    </div>
</div>
<div>
    <svg>
        <path id="abc" d="M30 30 h40 v40 h40" fill="transparent" stroke="black"></path>
        <use href="#abc"></use>
        </svg>
</div>