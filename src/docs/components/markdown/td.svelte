<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<td class={cn("px-6 py-4 text-start", className)}>
	<slot />
</td>
