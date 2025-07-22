import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/docs/paraglide",
			strategy: ["cookie", "preferredLanguage", "baseLocale"],
			cleanOutdir: false,
		}),
		sveltekit(),
	],
});
