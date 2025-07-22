<script>
	import { m } from "$docs/paraglide/messages";
</script>

<div class="my-4 rounded-md bg-neutral-100 p-6 shadow-md dark:bg-neutral-900">
	<span class="relative mb-3 flex items-center">
		<div class="mr-2 size-3 rounded-full bg-[#3e30ff]"></div>
		<p class="font-semibold text-[#3e30ff]">{m.note()}</p>
	</span>
	<slot />
</div>
