<script lang="ts">
	import CodeBlock from "$components/CodeBlock.svelte";
	import FooterNavigation from "$components/FooterNavigation.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<h1 id="top" class="text-[32px] font-semibold text-primary pb-10 border-b border-muted">API</h1>

<h2 id="general-types" class="text-[24px] mt-8 font-semibold mb-3 lg:mb-4 text-primary">General types</h2>
<!-- <p>Install package with your package manager of choice:</p>
<CodeBlock
	class="mt-8"
	highlighter={data.highlighter}
	code="pnpm i svelte-tournament-brackets"
	lang="bash"
/> -->

<h2 id="single-elimination-bracket" class="text-[24px] mt-8 font-semibold mb-3 lg:mb-4 text-primary">Single Elimination Bracket</h2>
<!-- <p>Bracket can be placed with no setup, just import it:</p>
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
/> -->

<h2 id="double-elimination-bracket" class="text-[24px] mt-8 font-semibold mb-3 lg:mb-4 text-primary">Double Elimination Bracket</h2>

<FooterNavigation
	previous={{ href: "/docs/getting-started", title: "Getting Started" }} 
	next={{ href: "/docs/bring-your-own-design", title: "Bring Your Own Design" }} 
/>