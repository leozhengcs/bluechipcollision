<script lang='ts'>
    import Banner from '$lib/components/Banner.svelte';
    import { footerState } from '../../stores/footer.svelte';
    footerState.show = true
</script>

<main class='bg-blue'>
    <Banner banner='bg-gallery-banner' title="GALLERY" styling='bottom-7 text-4xl xl:text-4xl xl:left-64'/>
    <section class='bg-yellow grid grid-rows-[auto] grid-cols-1 gap-5 place-items-center py-5'>
        <div class="w-full px-5 h-60 flex items-center justify-center bg-gray text-white">Image 1 Before</div>
        <div class="w-full px-5 h-60 flex items-center justify-center bg-gray text-white">Image 1 After</div>
        <div class="w-full px-5 h-60 flex items-center justify-center bg-gray text-white">Image 2 Before</div>
        <div class="w-full px-5 h-60 flex items-center justify-center bg-gray text-white">Image 2 After</div>
    </section>
</main>