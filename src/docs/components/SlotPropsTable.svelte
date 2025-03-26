<script lang="ts">
	import getSlotsSchema from "$docs/api";

	export let schema: "header" | "match" | "connector";

	const schemaData = getSlotsSchema(schema);
</script>

<svelte:component this={schemaData.props} />
