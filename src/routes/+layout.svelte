<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { footerState } from '../stores/footer.svelte';

	let { children } = $props();

</script>

<Header />

{@render children()}

{#if footerState.show}
	<Footer />
{/if}
