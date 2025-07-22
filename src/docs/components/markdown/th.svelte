<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<th class={cn("px-6 py-1.5 text-start", className)}>
	<slot />
</th>
