<script lang='ts'>
    let {
        ref = $bindable(),
        label,
        labelName,
        options = []
    } = $props();
</script>

<fieldset class='mb-5'>
    <legend class='font-bold text-blue border-0'>{labelName}</legend>
    <div class="flex gap-4">
        {#each options as option}
        <label class="flex items-center gap-2 cursor-pointer">
            <input type="radio" name={label} bind:group={ref} value={option} class='text-yellow focus:ring-yellow checked:bg-yellow checked:ring-2 checked:ring-yellow'/>{option}
        </label>
        {/each}
    </div>
</fieldset>