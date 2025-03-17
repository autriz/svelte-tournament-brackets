<script lang="ts">
	import type { PageData } from "./$types";
	import CodeBlock from "$components/CodeBlock.svelte";
	import singleElimCode from "./single-elim-code.svelte?raw";
	import doubleElimCode from "./double-elim-code.svelte?raw";
	import FooterNavigation from "$components/FooterNavigation.svelte";

	export let data: PageData;
</script>

<h1
	id="top"
	class="border-b border-muted pb-10 text-[32px] font-semibold text-primary"
>
	Getting Started
</h1>

<h2
	id="installation"
	class="mb-3 mt-8 text-[24px] font-semibold text-primary lg:mb-4"
>
	Installation
</h2>
<p>Install package with your package manager of choice:</p>
<CodeBlock
	class="mt-8"
	highlighter={data.highlighter}
	code="pnpm i svelte-tournament-brackets"
	lang="bash"
/>

<h2
	id="create-a-component"
	class="mb-3 mt-8 text-[24px] font-semibold text-primary lg:mb-4"
>
	Create a component
</h2>
<p>Bracket can be placed with no setup, just import it:</p>
<h3 class="mb-2 ml-3 mt-8 text-[16px] font-semibold text-primary lg:mb-3">
	Single Elimination Bracket
</h3>
<CodeBlock highlighter={data.highlighter} code={singleElimCode} lang="svelte" />
<h3 class="mb-2 ml-3 mt-8 text-[16px] font-semibold text-primary lg:mb-3">
	Double Elimination Bracket
</h3>
<CodeBlock highlighter={data.highlighter} code={doubleElimCode} lang="svelte" />

<FooterNavigation next={{ href: "/docs/api", title: "API" }} />
