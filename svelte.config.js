import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess({ script: true }),
	vitePlugin: {
		inspector: {
			showToggleButton: 'active',
			toggleButtonPos: 'top-right',
		},
	},
	kit: {
		// Deploying to Vercel. An explicit runtime is set so the function runtime
		// is independent of the Node version used to build (which may be newer).
		adapter: adapter({ runtime: 'nodejs20.x' }),
	},
};

export default config;
