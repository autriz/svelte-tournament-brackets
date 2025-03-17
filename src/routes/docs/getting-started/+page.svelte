<script lang="ts">
	import type { PageData } from "./$types";
	import CodeBlock from "$components/CodeBlock.svelte";
	import singleElimCode from "./single-elim-code.svelte?raw";
	import doubleElimCode from "./double-elim-code.svelte?raw";
	import FooterNavigation from "$components/FooterNavigation.svelte";

	export let data: PageData;
</script>

<h1 id="top" class="text-[32px] font-semibold text-primary pb-10 border-b border-muted">Getting Started</h1>

<h2 id="installation" class="text-[24px] mt-8 font-semibold mb-3 lg:mb-4 text-primary">Installation</h2>
<p>Install package with your package manager of choice:</p>
<CodeBlock
	class="mt-8"
	highlighter={data.highlighter}
	code="pnpm i svelte-tournament-brackets"
	lang="bash"
/>

<h2 id="create-a-component" class="text-[24px] mt-8 font-semibold mb-3 lg:mb-4 text-primary">Create a component</h2>
<p>Bracket can be placed with no setup, just import it:</p>
<h3 class="text-[16px] mt-8 ml-3 font-semibold mb-2 lg:mb-3 text-primary">Single Elimination Bracket</h3>
<CodeBlock
	highlighter={data.highlighter} 
	code={singleElimCode} 
	lang="svelte" 
/>
<h3 class="text-[16px] mt-8 ml-3 font-semibold mb-2 lg:mb-3 text-primary">Double Elimination Bracket</h3>
<CodeBlock
	highlighter={data.highlighter} 
	code={doubleElimCode} 
	lang="svelte" 
/>

<FooterNavigation next={{ href: "/docs/api", title: "API" }} />
