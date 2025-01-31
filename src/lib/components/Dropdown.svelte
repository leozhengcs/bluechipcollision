<script lang="ts">
    let {
        option = $bindable(),
        label,
        labelName,
        options = [] // Array of options for dropdown
    } = $props();
</script>

<style>
    .label-active {
        top: 0;
        transform: translateY(-50%);
    }
</style>

<div class="relative w-full mb-5">
    <select 
        name={label} 
        id={label}
        class="peer w-full rounded-lg border-2 border-yellow px-3 pt-4 pb-2 text-gray-900 shadow-sm focus:border-yellow focus:ring-yellow focus:outline-none bg-white"
        bind:value={option}
    >
        <option value="" disabled selected hidden></option>
        {#each options as option}
            <option value={option}>{option}</option>
        {/each}
    </select>
    
    <label 
        for={label} 
        class="absolute left-3 transition-all transform bg-white px-1 text-gray text-base translate-y-1/2
            peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:px-1"
        class:label-active={option !== ''}
    >
        {labelName}
    </label>
</div>