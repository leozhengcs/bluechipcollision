<script lang='ts'>
    let {
        src,
        label='',
        href='',
        iconStyling='sm:w-[50px] h-auto xl:w-[80px]',
        textStyling="ml-5 text-gray font-fontInter xl:text-xl",
        additionalStyling = '',
        margin='mb-5',
    } = $props();
</script>

<div class='flex flex-row items-center {margin}'>
    <img {src} alt="Service Icon" class={iconStyling}/>
    <a {href} class='{textStyling} {additionalStyling}'>{label}</a>
</div>