<script lang="ts">
	import "./styles.css";
	import "$docs/tailwind.styles.css";
	import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher modeStorageKey={"color-theme"} />

<slot />
