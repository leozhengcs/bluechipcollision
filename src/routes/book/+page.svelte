<script lang='ts'>
    import { goto } from "$app/navigation";
    import { footerState } from '../../stores/footer.svelte';
    import Calendar from "$lib/components/Calendar.svelte";
    import emailjs from 'emailjs-com';
    import SimpleInput from '$lib/components/SimpleInput.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import Radio from '$lib/components/Radio.svelte';
    import { onMount } from "svelte";
    
    footerState.show = false;

    let file: File | null = $state(null);
    let dragging = $state(false);

    let { form } = $props();
        
    let choiceResponse = $state('TEXT');
    let choiceOperational = $state('NO');
    let choiceCourtesyCar = $state('NO');
    let privateRepair = $state(false);
    // TODO: Add form validation for these parts.
    let selectedDate:null|FormDataEntryValue = $state(null);
    let startTime:null|FormDataEntryValue = $state(null);
    let endTime:null|string = $state(null);
    let name = $state(form?.values?.name || '');
    let email = $state(form?.values?.email || '');
    let phoneNum = $state(form?.values?.phoneNum || '');
    let make = $state(form?.values?.carMake || '');
    let vin = $state(form?.values?.vin || '');
    let registrationNum = $state(form?.values?.registrationNum || '');

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
                throw new Error(`Error sending email ${response.text}.`)
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
                throw new Error(`Error sending email ${response.text}.`)
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    async function sendEmails(event: MouseEvent) {
        // await sendEmail();
        // await sendConfirm();
        // goto('/confirm');
    }

    function handleFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            file = target.files[0];
            dragging = false;
        }
    }

    function handleDragOver(event: DragEvent) {
        dragging = true;
    }

    function handleDragLeave(event: DragEvent) {
        dragging = false;
    }

    function handleDrop(event: DragEvent) {
        dragging = false;
        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            file = event.dataTransfer.files[0];
        }
    }

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
            <SimpleInput bind:field={name} label='name' labelName="Name" type='text'/>
            <SimpleInput bind:field={phoneNum} label='phoneNum' labelName="Phone Num" type='number'/> <!-- TODO: Implement phone number formatting here-->
            <SimpleInput bind:field={email} label='email' labelName="Email" type='text'/>
            <SimpleInput bind:field={vin} label='vin' labelName="VIN" type='text'/>
            <Dropdown label='make' labelName='Car Make' bind:option={make} options={carMakes}/>
            <fieldset class="relative w-full mb-5 border-2 border-yellow rounded-lg px-3 pt-4 pb-2 shadow-sm">
                <legend class="px-2 text-gray-900 text-base font-semibold">Insurance Information</legend>
                
                <SimpleInput bind:field={registrationNum} label="registrationNum" labelName="Registration Number" type="text" />
                
                <div class="text-center my-4 font-semibold text-black">OR</div>
                <div 
                    tabindex='0'
                    role='button'
                    aria-label="Drag and drop file upload"
                    class="relative w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
                    class:border-yellow={!dragging}
                    class:border-blue-500={dragging}
                    ondragover={handleDragOver}
                    ondragleave={handleDragLeave}
                    ondrop={handleDrop}
                >
                    <label 
                        for="insuranceForm"
                        class="absolute top-[-10px] left-3 bg-white px-1 text-gray-900 text-sm font-medium"
                    >
                        Upload Insurance Form
                    </label>
                    
                    <input 
                        type="file" 
                        accept=".pdf,.jpeg,.png" 
                        name="insuranceForm" 
                        id="insuranceForm"
                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onchange={handleFileSelect}
                    >
                    
                    <div class="flex flex-col items-center justify-center h-full text-gray-700">
                        {#if file}
                            <p class="text-center text-green-700 font-semibold">{file.name}</p>
                        {:else}
                            <p class="text-center">
                                Drag & Drop a file here <br> <span class="text-sm text-gray-500">or click to browse</span>
                            </p>
                        {/if}
                    </div>
                </div>
            </fieldset>
            <Radio labelName='Car Operational?' options={carOperational} bind:ref={choiceOperational} label='carOperational'/>
            <Radio labelName='Courtesy Car?' options={courtesyCar} bind:ref={choiceCourtesyCar} label='courtesyCar'/>
            <Radio labelName='Choice of Reply' options={responses} bind:ref={choiceResponse} label='responsePref'/>
            <div class='my-5'>
                <input type="checkbox" bind:checked={privateRepair} name='privateRepair' id='privateRepair' class='border-yellow mr-2'/>
                <label for="privateRepair">Private Repair?</label>
            </div>
            <input type="hidden" value={selectedDate} name='selectedDate'>
            <input type="hidden" value={startTime} name='startTime'>
            <input type="hidden" value={endTime} name='endTime'>
            <button class='bg-yellow p-2 px-3 text-blue font-fontInter font-bold text-sm'>Book</button>
        </form>
    </section>
</main>