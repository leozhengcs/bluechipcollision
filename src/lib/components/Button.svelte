<script lang='ts'>
    import { headerState } from '../../stores/header.svelte';

    let { 
        label = "Book",
        href = "#", 
        width = 'sm:w-40 xl:w-52',
        height = 'sm:h-8 xl:h-12',
        additionalStyling = '',
    } = $props();
    const baseStyling = 'flex justify-center bg-yellow font-fontInter sm:font-bold text-blue items-center xl:text-base sm:text-sm rounded-lg'
</script>

<a href={href} class={width + ' ' + height + ' ' + baseStyling + ' ' + additionalStyling} onclick={() => headerState.currentPath = '/'}>
    {label}
</a>