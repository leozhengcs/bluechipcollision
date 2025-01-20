<script lang='ts'>
    import { getRandomInt } from "$lib/utils/mathUtils";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { footerState } from '../../stores/footer.svelte';
    import Calendar from "$lib/components/Calendar.svelte";
    import emailjs from 'emailjs-com';
    
    footerState.show = false;

    let num1: number = $state(0);
    let num2: number = $state(0);
    let res: number;
    onMount(() => {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        res = num1 + num2;
    })

    async function navToConfirm(event: MouseEvent) {
        await sendEmail();
        await sendConfirm();
        goto('/confirm'); // Navigates to the booking confirmation page.
    }

    let selectedOption = $state('text');
    let selectedDate:null|string = $state(null);
    let startTime:null|string = $state(null);
    let endTime:null|string = $state(null);
    let name = $state('');
    let email = $state('');
    let phoneNum = $state('');
    let modelYear = $state('');
    let vin = $state('');

    const sendEmail = async () => {
        try {
            const templateID = 'template_ms7apnd'; // Service ID from EmailJS
            const publicKey = 'dLmCzZJKlKbV1UctL'; // Template ID from EmailJS
            const serviceID = 'service_3br9lld'; // Public Key from EmailJS

            const templateParams = {
                name: name,
                to_email: email,
                startTime: startTime,
                endTime: endTime,
            };

            // Send email using EmailJS
            const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);

            if (response.status !== 200) {
                console.error("Error sending email. Check console for details.")
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const sendConfirm = async () => {
    try {
        const templateID = 'template_ms7apnd'; // Template ID from EmailJS
        const publicKey = 'dLmCzZJKlKbV1UctL'; // Public Key from EmailJS
        const serviceID = 'service_3br9lld'; // Service ID from EmailJS

        const templateParams = {
            name: name,
            user_email: email,
            to_email: 'bluechipcollision@gmail.com',
            startTime: startTime,
            endTime: endTime,
        };

        // Send email using EmailJS
        const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
        if (response.status !== 200) {
            console.error("Error sending email. Check console for details.")
        }
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
</script>

<main class="bg-blue">
    <section class='py-5'>
        <h1 class='mx-10 font-bold text-white text-2xl font-fontRoboto xl:mx-64 xl:pt-10'>REQUEST REPAIR ESTIMATE</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
        <p class="mx-10 mt-2 text-white font-fontInter text-sm xl:mx-64">
            Blue Chip Collision provides complementary estimates for collision repairs. Simply complete the form to get started.
        </p>
        <p class="mx-10 mt-2 text-white font-fontInter text-sm xl:mx-64">
            Upon reviewing your online submission, we will contact you to arrange a data and time to assess your vehicle's damage and to provide you with a written repair estimate.
        </p>
    </section>
    <section class="py-5 xl:mx-64">
        <Calendar bind:selectedDate bind:startTime bind:endTime/>
    </section>
    <section class="bg-white">
        <h1 class='ml-10 font-bold text-blue text-2xl font-fontRoboto pt-5 xl:mx-64'>BOOK APPOINTMENT</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
        <form method="POST" class='mx-10 my-5 xl:mx-64'>
            <input type="text" name='name' class='border-2 mb-5 border-yellow w-full' placeholder="Name*" bind:value={name}>
            <input type="text" name='phoneNum' class='border-2 mb-5 border-yellow w-full' placeholder="Cell Phone #*" bind:value={phoneNum}>
            <input type="email" name='email' class='border-2 mb-5 border-yellow w-full' placeholder="Email Address*" bind:value={email}>
            <input type="text" name='modelYear' class='border-2 mb-5 border-yellow w-full' placeholder="Model Year*" bind:value={modelYear}>
            <input type="text" name='vin' class='border-2 mb-5 border-yellow w-full' placeholder="VIN*" bind:value={vin}>
            <input type="number" name='captcha' class='border-2 mb-5 border-yellow w-full' placeholder="Captcha: {num1} + {num2} = ?*">
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
            <input type="hidden" value={selectedDate} name='selectedDate'>
            <input type="hidden" value={startTime} name='startTime'>
            <input type="hidden" value={endTime} name='endTime'>
            <button type='submit' class='bg-yellow p-2 px-3 text-blue font-fontInter font-bold text-sm' onclick={navToConfirm}>Book</button>
        </form>
    </section>
</main>