<script lang="ts">
	import "./styles.css";
	import { ModeWatcher } from "mode-watcher";
	import { Header } from "$components/index.js";
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

<Header />
<main
	class="h-fit min-h-screen min-w-[100vw] w-fit bg-background pt-[3.75rem] text-foreground"
>
	<slot />
</main>
