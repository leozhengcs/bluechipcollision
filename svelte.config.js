import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';

export default {
plugins: [sveltekit()],
  kit: {
    adapter: adapter(),
  },
  server: {
    hmr: process.env.NODE_ENV === 'production', // Enable HMR only in development
  },
};
