<script lang="ts">
	import { cn } from "$docs/utils/cn";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<div class="my-6 w-full">
	<div data-table-wrapper>
		<table
			class={cn("w-full bg-neutral-100 dark:bg-neutral-900", className)}
		>
			<slot />
		</table>
	</div>
</div>

<style>
	[data-table-wrapper] {
		background: border-box;
		@apply overflow-x-auto rounded-lg border border-transparent bg-gradient-to-t from-muted to-muted-foreground/30 shadow-md dark:shadow-none;
	}
</style>
