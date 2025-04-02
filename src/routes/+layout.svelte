<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { footerState } from '../stores/footer.svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit'

	let { children } = $props();
	injectAnalytics();
</script>

<Header />

{@render children()}

{#if footerState.show}
	<Footer />
{/if}
