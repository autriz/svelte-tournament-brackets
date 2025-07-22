<script lang="ts">
	import Header from "$components/Header.svelte";
</script>

<svelte:head>
	<title>Svelte Tournament Brackets</title>
	<meta
		name="description"
		content="Tournament bracket visualizer for Svelte."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<slot />
</div>
