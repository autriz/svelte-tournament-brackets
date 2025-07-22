<script lang="ts">
	import { getLocale } from "$docs/paraglide/runtime";

	export let title: string;
	export let description: string;
</script>

<svelte:head>
	<title>{title} - Svelte Tournament Brackets</title>
	<meta name="description" content={description} lang={getLocale()} />
</svelte:head>
