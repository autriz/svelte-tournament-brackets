<script lang="ts">
	import CopyButton from "$components/CopyButton.svelte";
	import { SvelteLogo } from "../images/index.js";
</script>

<div class="flex h-[800px] w-full flex-col items-center justify-center">
	<div class="my-4">
		<h1
			class="inline-flex items-center gap-3 text-2xl md:text-5xl lg:text-6xl"
		>
			<span class="flex w-fit items-center text-[#f96743]">
				<img
					class="size-10 md:size-20 self-center"
					src={SvelteLogo}
					alt="S"
				/>velte
			</span> Tournament Brackets
		</h1>
	</div>
	<CopyButton class="mt-6" />
</div>
