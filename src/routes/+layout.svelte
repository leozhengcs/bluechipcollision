<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { showFooter } from '../stores/footer';

	let { children } = $props();

</script>

<Header />

{@render children()}

{#if $showFooter}
	<Footer />
{/if}
