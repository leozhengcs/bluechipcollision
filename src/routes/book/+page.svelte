<script lang='ts'>
    import { footerState } from '../../stores/footer.svelte';
    import Calendar from "$lib/components/Calendar.svelte";
    import SimpleInput from '$lib/components/SimpleInput.svelte';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import Radio from '$lib/components/Radio.svelte';
    import { get, writable } from 'svelte/store';
    import { sendEmail, sendConfirm } from '$lib/utils/eventHandlers';
    import { onMount } from 'svelte';
    import { ReCaptcha } from '@mac-barrett/svelte-recaptcha';

    const SITE_KEY = '6Ld25eUqAAAAAHZNzbCIZ18u7royaZTdmzyDRsAU';
    let Captcha: ReCaptcha;
    let token = $state(''); // Store the ReCaptcha token  

    footerState.show = false;
    const MAX_DAMAGE_FILES = 3;

    let fileInsurance: File | null = $state(null);
    let fileDamages = writable<File[]>([]);
    let dragging_insurance = $state(false);
    let dragging_damages = $state(false);

    const { form } = $props();

    onMount(() => {
        if (form?.error) {
            console.log("Error: ", form.error);
        }
    })
        
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

    async function sendEmails() {
        // await sendEmail(name, email, startTime, endTime);
        sendConfirm(name, email, startTime as string, endTime as string);
    }

    function isDuplicate(file: File): boolean {
        const currentFiles = get(fileDamages);
        return currentFiles.some(existingFile => 
            existingFile.name === file.name && existingFile.size === file.size
        );    
    }

    function handleFileSelectInsurance(event: Event) {
        const target = event.target as HTMLInputElement;
    
        if (target.files && target.files.length > 0) {
            const selectedFile = target.files[0];

            if (!selectedFile.type.startsWith("image/")) {
                alert("Only image files are allowed. Please select a valid image.");
                target.value = "";
                return;
            }

            fileInsurance = selectedFile;
            dragging_insurance = false;
        }
    }

    function handleDragOverInsurance(event: DragEvent) {
        dragging_insurance = true;
    }

    function handleDragLeaveInsurance(event: DragEvent) {
        dragging_insurance = false;
    }
    function handleDragOverDamages(event: DragEvent) {
        dragging_damages = true;
    }

    function handleDragLeaveDamages(event: DragEvent) {
        dragging_damages = false;
    }

    function handleDropInsurance(event: DragEvent) {
        dragging_insurance = false;
    }

    function handleFileSelectDamages(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            let files = Array.from(target.files);

            // Get current files from store
            let currentFiles = get(fileDamages);

            const filteredFiles = files.filter(file => file.type.startsWith("image/"));
            if (filteredFiles.length !== files.length) {
                alert("Only image files are allowed. Please select valid images.");
                target.value = ""; // Clear file input
                return;
            }

            // Filter out duplicates
            const newFiles = files.filter(file => !isDuplicate(file));
            const remainingSlots = MAX_DAMAGE_FILES - currentFiles.length;

            // Ensure we do not exceed MAX_DAMAGE_FILES
            if (currentFiles.length + newFiles.length > MAX_DAMAGE_FILES) {
                alert(`SELECT: You can upload a maximum of ${MAX_DAMAGE_FILES} files.`);
                target.value = "";
                return;
            }

            // Add only allowed number of files
            fileDamages.set([...currentFiles, ...newFiles.slice(0, remainingSlots)]);

            dragging_insurance = false;
        }
        console.log($fileDamages);
    }

    function removeInsurance() {
        fileInsurance = null;
    }

    function removeDamages(index: number) {
        fileDamages.update(files => {
            const updatedFiles = files.filter((_, i) => i !== index);
            console.log("Updated Files After Removal:", updatedFiles);
            return updatedFiles;
        });

        const fileInput = document.getElementById("damagePhotos") as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }    
}

    async function handleSubmit(event: Event) {
        token = Captcha.getRecaptchaResponse();  

        const formData = new FormData(event.target as HTMLFormElement);
        if (!token) {
            console.error("Failed to retrieve reCAPTCHA token.");
            return;
        }
        formData.append('token', token);
        console.log(Object.fromEntries(formData.entries()));
        const selectedFiles = get(fileDamages);

        selectedFiles.forEach(file => formData.append("damagePhotos", file));

        if (!Captcha) {
            console.error("ReCaptcha is not initialized. Peter");
            return;
        }

        try {
            const response = await fetch('/book', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                sendEmails();
            } else {
                console.error("Booking failed:", result.error);
            }
        } catch (error) {
            console.error("Error booking:", error);
        }

        // try {
        //     // Correct method to retrieve ReCaptcha token
        //     token = Captcha.getRecaptchaResponse(); 

        //     // Inject token into hidden input
        //     const formElement = event.target as HTMLFormElement;
        //     const tokenInput = formElement.querySelector<HTMLInputElement>("input[name='token']");
        //     if (tokenInput) tokenInput.value = token;

        //     // Submit the form
        // } catch (error) {
        //     console.error("ReCaptcha Error:", error);
        // }
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
        <form method="POST" class='mx-10 mt-5 xl:mx-64' enctype="multipart/form-data" onsubmit={handleSubmit}>
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
                    class:border-yellow={!dragging_insurance}
                    class:border-blue-500={dragging_insurance}
                    ondragover={handleDragOverInsurance}
                    ondragleave={handleDragLeaveInsurance}
                    ondrop={handleDropInsurance}
                >
                    <label 
                        for="insuranceForm"
                        class="absolute top-[-10px] left-3 bg-white px-1 text-gray-900 text-sm font-medium"
                    >
                        Upload Insurance Form
                    </label>
                    
                    <input 
                        type="file" 
                        accept=".jpeg,.png,.jpg" 
                        name="insuranceForm" 
                        id="insuranceForm"
                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onchange={handleFileSelectInsurance}
                    >
                    
                    <div class="flex flex-col items-center justify-center h-full text-gray-700">
                        {#if fileInsurance}
                            <p class="text-center text-green-700 font-semibold z-20">{fileInsurance.name}<button type='button' class='text-red-500 p-5' onclick={removeInsurance}>X</button></p>
                        {:else}
                            <p class="text-center">
                                Drag & Drop a file here <br> <span class="text-sm text-gray-500">or click to browse</span>
                            </p>
                        {/if}
                    </div>
                </div>
            </fieldset>
            <fieldset class="relative w-full mb-5 border-2 border-yellow rounded-lg px-3 pt-4 pb-2 shadow-sm">
                <legend class="px-2 text-gray-900 text-base font-semibold">Damage Photos (Optional)</legend>
                <div 
                    tabindex='0'
                    role='button'
                    aria-label="Drag and drop file upload"
                    class="relative w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ease-in-out"
                    class:border-yellow={!dragging_damages}
                    class:border-blue-500={dragging_damages}
                    ondragover={handleDragOverDamages}
                    ondragleave={handleDragLeaveDamages}
                    ondrop={handleFileSelectDamages}
                >
                    <label 
                        for="damagePhotos"
                        class="absolute top-[-10px] left-3 bg-white px-1 text-gray-900 text-sm font-medium"
                    >
                        Upload Damage Photos Max {MAX_DAMAGE_FILES}
                    </label>
                    
                    <input 
                        type="file"
                        multiple
                        accept=".jpeg,.png,.jpg" 
                        name="damagePhotos" 
                        id="damagePhotos"
                        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onchange={handleFileSelectDamages}
                    >
                    
                    <div class="flex flex-col items-center justify-center h-full text-gray-700">
                        {#if $fileDamages.length > 0}
                            {#each $fileDamages as file, i}
                                <p class="text-center text-green-700 font-semibol z-20">{file.name}<button type='button' class='text-red-500 p-5 cursor-pointer' onclick={() => removeDamages(i)}>X</button></p>
                            {/each}
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
            <input type="hidden" name="token" bind:value={token}>
            <ReCaptcha bind:this={Captcha} { SITE_KEY } captchaStyle={{theme: 'dark', size: 'compact'}} />
            <input type="hidden" value={selectedDate} name='selectedDate'>
            <input type="hidden" value={startTime} name='startTime'>
            <input type="hidden" value={endTime} name='endTime'>
            <button class='bg-yellow p-2 px-3 text-blue font-fontInter font-bold text-sm'>Book</button>
        </form>
    </section>
</main>