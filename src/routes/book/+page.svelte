<script lang='ts'>
    import { getRandomInt } from "$lib/utils/mathUtils";
    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { footerState } from '../../stores/footer.svelte';
    
    footerState.show = false;

    let num1: number;
    let num2: number;
    let res: number;
    onMount(() => {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        res = num1 + num2;
    })

    function navToConfirm() {
        goto('/confirm'); // Navigates to the booking confirmation page.
    }

    let selectedOption = 'text';
</script>

<main class="bg-blue">
    <section class='py-5'>
        <h1 class='ml-10 font-bold text-white text-2xl font-fontRoboto xl:ml-64 xl:pt-10'>REQUEST REPAIR ESTIMATE</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
        <p class="ml-10 mt-2 text-white font-fontInter text-sm w-[85%] xl:mx-64">
            Blue Chip Collision provides complementary estimates for collision repairs. Simply complete the form to get started.
        </p>
        <p class="ml-10 mt-2 text-white font-fontInter text-sm w-[85%] xl:mx-64">
            Upon reviewing your online submission, we will contact you to arrange a data and time to assess your vehicle's damage and to provide you with a written repair estimate.
        </p>
    </section>
    <section class="bg-white">
        <h1 class='ml-10 font-bold text-blue text-2xl font-fontRoboto pt-5 xl:ml-64'>BOOK APPOINTMENT</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
        <form method="POST" class='mx-10 my-5 xl:mx-64'>
            <input type="text" name='name' class='border-2 mb-5 border-yellow w-full' placeholder="Name*">
            <input type="text" name='phoneNum' class='border-2 mb-5 border-yellow w-full' placeholder="Cell Phone #*">
            <input type="email" name='email' class='border-2 mb-5 border-yellow w-full' placeholder="Email Address*">
            <input type="text" name='modelYear' class='border-2 mb-5 border-yellow w-full' placeholder="Model Year*">
            <input type="number" name='vin' class='border-2 mb-5 border-yellow w-full' placeholder="VIN*">
            <input type="number" name='captcha' class='border-2 mb-5 border-yellow w-full' placeholder="{num1} + {num2} = ?*">
            <fieldset class='mb-5'>
                <legend class='font-bold text-blue border-0'>CHOICE OF REPLY</legend>
                <div class="flex gap-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" bind:group={selectedOption} value="text" class='text-yellow focus:ring-yellow checked:bg-yellow checked:ring-2 checked:ring-yellow'/> TEXT
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" bind:group={selectedOption} value="email" class='text-yellow focus:ring-yellow checked:bg-yellow checked:ring-2 checked:ring-yellow'/> EMAIL
                    </label>
                </div>
            </fieldset>
            <button type='submit' class='bg-yellow p-2 px-3 text-blue font-fontInter font-bold text-sm' onclick={navToConfirm}>Book</button>
        </form>
    </section>
</main>