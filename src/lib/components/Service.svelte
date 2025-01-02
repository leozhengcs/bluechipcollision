<script lang='ts'>
    let {
        src,
        label='',
        iconStyling='sm:w-[65px] h-auto xl:w-[50px]',
        textStyling="ml-5 text-gray font-fontInter text-lg xl:text-base",
        margin='mb-5',
    } = $props();
</script>

<div class='flex flex-row items-center {margin}'>
    <img {src} alt="Service Icon" class={iconStyling}/>
    <span class={textStyling}>{label}</span>
</div>