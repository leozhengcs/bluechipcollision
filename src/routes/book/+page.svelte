<script lang='ts'>
    import { goto } from "$app/navigation";
    import { footerState } from '../../stores/footer.svelte';
    import Calendar from "$lib/components/Calendar.svelte";
    import emailjs from 'emailjs-com';
    import SimpleInput from '$lib/components/SimpleInput.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import Radio from '$lib/components/Radio.svelte';
    
    footerState.show = false;

    async function navToConfirm(event: MouseEvent) {
        await sendEmail();
        await sendConfirm();
        goto('/confirm'); // Navigates to the booking confirmation page.
    }

    let file;
    let choiceResponse = $state('TEXT');
    let choiceOperational = $state('NO');
    let choiceCourtesyCar = $state('NO');
    let privateRepair = $state(false);
    let selectedDate:null|string = $state(null);
    let startTime:null|string = $state(null);
    let endTime:null|string = $state(null);
    let name = $state('');
    let email = $state('');
    let phoneNum = $state('');
    let make = $state('');
    let vin = $state('');

    // Input field constants
    const carMakes = ["Toyota", 'Mazda', 'Honda'];
    const responses = ['TEXT', 'EMAIL'];
    const carOperational = ['NO', 'YES'];
    const courtesyCar = ['NO', 'YES'];

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
    <section class="bg-white pb-16">
        <h1 class='ml-10 font-bold text-blue text-2xl font-fontRoboto pt-5 xl:mx-64'>BOOK APPOINTMENT</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
        <form method="POST" class='mx-10 mt-5 xl:mx-64' enctype="multipart/form-data">
            <SimpleInput field={name} label='name' labelName="Name" type='text'/>
            <SimpleInput field={phoneNum} label='phoneNum' labelName="Phone Num" type='number'/> <!-- TODO: Implement phone number formatting here-->
            <SimpleInput field={email} label='email' labelName="Email" type='email'/>
            <SimpleInput field={vin} label='vin' labelName="VIN" type='text'/>
            <Dropdown label='make' labelName='Car Make' option={make} options={carMakes}/>
            <input type="file" accept=".pdf,.jpeg,.png" name='insuranceForm' id='insuranceForm' onchange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.files && target.files.length > 0) {
                    file = target.files[0];
                }
            }} />
            <Radio labelName='Car Operational?' options={carOperational} ref={choiceOperational} label='carOperational'/>
            <Radio labelName='Courtesy Car?' options={courtesyCar} ref={choiceCourtesyCar} label='courtesyCar'/>
            <Radio labelName='Choice of Reply' options={responses} ref={choiceResponse} label='responsePref'/>
            <div class='my-5'>
                <input type="checkbox" bind:checked={privateRepair} name='privateRepair' id='privateRepair' class='border-yellow mr-2'/>
                <label for="privateRepair">Private Repair?</label>
            </div>
            <input type="hidden" value={selectedDate} name='selectedDate'>
            <input type="hidden" value={startTime} name='startTime'>
            <input type="hidden" value={endTime} name='endTime'>
            <button type='submit' class='bg-yellow p-2 px-3 text-blue font-fontInter font-bold text-sm' onclick={navToConfirm}>Book</button>
        </form>
    </section>
</main>