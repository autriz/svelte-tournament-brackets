<script lang="ts">
	import "./styles.css";
	import "$docs/tailwind.styles.css";
	import { ModeWatcher } from "mode-watcher";
</script>

<svelte:head>
	<title>Svelte Tournament Brackets</title>
</svelte:head>

<ModeWatcher modeStorageKey={"color-theme"} />

<slot />
