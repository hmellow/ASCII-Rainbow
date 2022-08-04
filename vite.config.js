import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	server: {
        fs: {
          allow: ['.'],
        },
      },
};

export default config;
