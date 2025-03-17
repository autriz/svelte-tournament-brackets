<script lang="ts">
	import "./styles.css";
	import { ModeWatcher } from "mode-watcher";
	import Header from "$components/Header.svelte";
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>Svelte Tournament Brackets</title>
</svelte:head>

<ModeWatcher
	modeStorageKey={"color-theme"}
	defaultMode={"system"}
	lightClassNames={["light"]}
	darkClassNames={["dark"]}
/>

<div class="flex min-h-screen flex-col font-sans">
	{#if $page.url.pathname === "/"}
		<Header />
	{/if}
	<div class="flex-1">
		<slot />
	</div>
</div>
