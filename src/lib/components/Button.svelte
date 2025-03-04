<script lang='ts'>
    import { headerState } from '../../stores/header.svelte';

    let { 
        label = "Book",
        href = "#", 
        width = 'w-fit px-5',
        height = 'sm:h-8 xl:h-12',
        additionalStyling = '',
        path='/'
    } = $props();
    const baseStyling = 'flex justify-center bg-yellow font-fontInter font-bold text-blue items-center text-sm rounded-lg'
</script>

<a href={href} class={width + ' ' + height + ' ' + baseStyling + ' ' + additionalStyling} onclick={() => headerState.currentPath = path}>
    {label}
</a>