<script lang="ts">
	export let width: number;
	export let height: number;

	let className: string | undefined = undefined;
	export { className as class };
</script>

<svg x="0" y="0" {width} {height} class={className}>
	<rect x="0" y="0" {width} {height} />
	<slot></slot>
</svg>

<style>
	svg {
		fill: transparent;
	}
</style>
