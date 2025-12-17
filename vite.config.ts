import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 3000,
	},
	build: {
		target: "esnext",
	},
	base: "/wasm-decoder/", // Questo è il percorso relativo quando il progetto è su GitHub Pages.
});
