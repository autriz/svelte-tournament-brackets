<script lang="ts">
	import { Tabs } from "bits-ui";

	export let name: string;
</script>

<Tabs.Content class="w-full" value={name} {...$$restProps}>
	<slot></slot>
</Tabs.Content>
