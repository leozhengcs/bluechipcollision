<script lang='ts'>
    let {
        banner,
        title,
        styling = '',
    } = $props();
</script>

<div class="w-full sm:h-60 xl:h-[30vw] {banner} bg-[50%_30%] bg-cover bg-no-repeat relative z-10">
    <!-- Dark Overlay -->
    <section class="absolute top-0 w-full h-full bg-black opacity-[30%]"></section>
    <sub class='sm:text-xl xl:text-3xl bottom-3 absolute left-10 font-fontRoboto text-white w-auto {styling}'>{title}</sub>
</div>