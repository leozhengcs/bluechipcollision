import adapter from '@sveltejs/adapter-node';
import { sveltekit } from '@sveltejs/kit/vite';

export default {
plugins: [sveltekit()],
  kit: {
    adapter: adapter({
      // This configures where the static build output goes
      pages: 'public',       // HTML/JS/CSS files
      assets: 'public',      // Static assets
      fallback: 'index.html' // SPA fallback
    })  },
  // server: {
  //   hmr: process.env.NODE_ENV === 'production', // Enable HMR only in development
  // },

};
