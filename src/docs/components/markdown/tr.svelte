<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<tr class={cn("border-t border-border", className)}>
	<slot />
</tr>
