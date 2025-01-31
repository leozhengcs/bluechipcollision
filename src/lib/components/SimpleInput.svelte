<script lang='ts'>
    let {
        field = $bindable(),
        type = 'text',
        label,
        labelName,
    } = $props();
</script>

<style>
    .label-active {
        top: 0;
        transform: translateY(-50%);
    }

    /* For Chrome, Safari, Edge, and Opera */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* For Firefox */
    input[type="number"] {
        -appearance: textfield;
    }
</style>

<div class="relative w-full mb-5">
    <input 
        {type} 
        name={label} 
        id={label}
        class="peer w-full rounded-lg border-2 border-yellow px-3 pt-4 pb-2 text-gray-900 shadow-sm focus:border-yellow focus:ring-yellow focus:outline-none" 
        bind:value={field}
    >
    <label 
    for={label} 
    class="absolute left-3 transition-all transform bg-white px-1 text-gray text-base translate-y-1/2
        peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:px-1"
        class:label-active={field !== ''}
    >
        {labelName}
    </label>
</div>

