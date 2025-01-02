import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    screens: {
      'sm': '320px',   // Small
      'md': '375px',   // Medium
      'lg': '425px',  // Large
      'xl': '768px',  // Extra Large
      '2xl': '1024px', // Extra Extra Large
      '3xl': '1440px', // Largest screen
    },
    extend: {
      backgroundImage: {
        'root-banner': "url('/images/root-banner.jpg')", // Root Page Banner Image
        'membership-banner': "url('/images/repair-banner.jpg')", // Membership Banner Image
        'contact-banner': "url('/images/reception-desk.jpg')",
        'about-banner': "url('/images/about-us.jpg')",
        'gallery-banner': "url('/images/gallery.jpg')",
      },
      fontFamily: {
        fontInter: ['font-inter', 'sans-serif'],
        fontInterItalic: ['font-inter-italic', 'sans-serif'],
        fontRoboto: ['roboto', 'sans-serif'],
      },
      colors: {
        // Add your custom colors here
        blue: '#000043',
        yellow: '#FFCF56', 
        gray: '#666666', 
        white: '#FFFFFF',
      },
    },
  },

  plugins: [typography, forms]
} satisfies Config;
