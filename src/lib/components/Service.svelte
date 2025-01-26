<script lang='ts'>
    let {
        src,
        label='',
        href='',
        iconStyling='sm:w-[65px] h-auto xl:w-[80px]',
        textStyling="ml-5 text-gray font-fontInter text-lg xl:text-xl underline",
        margin='mb-5',
    } = $props();
</script>

<div class='flex flex-row items-center {margin}'>
    <img {src} alt="Service Icon" class={iconStyling}/>
    <a {href} class={textStyling}>{label}</a>
</div>