<script lang="ts">
    import { Sparkles } from "lucide-svelte";
</script>

<div class="w-full rounded-lg overflow-hidden border-2 border-violet-400/30 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-md">
    <div class="bg-gradient-to-r from-violet-700 to-indigo-600 px-3 py-1.5 text-sm font-medium flex justify-between items-center text-white">
        <div class="flex items-center gap-2">
        <Sparkles class="h-4 w-4 text-amber-300" />
        <span>Quarterfinal</span>
        </div>
        <span class="bg-indigo-800/50 px-2 py-0.5 rounded-full text-xs">Match 2</span>
    </div>
    <div class="p-0">
        <div class="flex justify-between items-center p-3 bg-violet-100/50 border-b border-violet-200">
        <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white text-xs font-medium shadow-md">
            1
            </div>
            <div>
            <div class="font-medium text-violet-900">Team Alpha</div>
            <div class="text-xs text-violet-600 flex items-center gap-1">
                <Sparkles class="h-3 w-3 text-amber-500" />
                <span>Victorious</span>
            </div>
            </div>
        </div>
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md">
            3
        </div>
        </div>

        <div class="flex justify-between items-center p-3">
        <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-violet-200 text-violet-700 text-xs font-medium">
            8
            </div>
            <div>
            <div class="text-violet-800">Team Bravo</div>
            <div class="text-xs text-violet-600/70">Defeated</div>
            </div>
        </div>
        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-violet-200 text-violet-700 border border-violet-300">
            1
        </div>
        </div>
    </div>
</div>