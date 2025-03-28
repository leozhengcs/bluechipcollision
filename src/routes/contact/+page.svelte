<script lang='ts'>
    import Banner from '$lib/components/Banner.svelte';
    import Service from '$lib/components/Service.svelte';
    import { footerState } from '../../stores/footer.svelte';
    import { sendContact } from '$lib/utils/eventHandlers';
    import { onMount } from 'svelte';
    footerState.show = true

    let {
        form
    } = $props();

    let name = $state('');
    let email = $state('');
    let subject = $state('');
    let content = $state('');

    onMount(() => {
        if (form?.error) {
            if (form.values?.name) {
                name = form.values.name as string
            }
            if (form.values?.email) {
                email = form.values.email as string
            }
            if (form.values?.subject) {
                subject = form.values.subject as string
            }
            if (form.values?.content) {
                content = form.values.content as string
            }
        }

        if (form?.success) {
            sendContact(
                form.values.name as string, 
                form.values.email as string, 
                form.values.subject as string, 
                form.values.content as string
            );

            // User feedback
        }
    });

    import { ReCaptcha } from '@mac-barrett/svelte-recaptcha';
    const SITE_KEY = '6Ld25eUqAAAAAHZNzbCIZ18u7royaZTdmzyDRsAU';
    let Captcha: ReCaptcha;
    let token = $state(''); // Store the ReCaptcha token

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (!Captcha) {
            console.error("ReCaptcha is not initialized.");
            return;
        }

        try {
            // Correct method to retrieve ReCaptcha token
            token = Captcha.getRecaptchaResponse(); 

            // Inject token into hidden input
            const formElement = event.target as HTMLFormElement;
            const tokenInput = formElement.querySelector<HTMLInputElement>("input[name='token']");
            if (tokenInput) tokenInput.value = token;

            // Submit the form
            formElement.submit();
        } catch (error) {
            console.error("ReCaptcha Error:", error);
        }
    }
</script>

<main class='w-full h-auto shadow-sm bg-blue'>
    <Banner banner='bg-contact-banner' title='CONTACT US' styling='bottom-7 text-4xl xl:text-4xl xl:left-32 2xl:left-64'/>
    <div class="xl:grid w-full xl:grid-cols-2 xl:grid-rows-3">
        <section class='pt-5 row-start-1 row-end-2 col-start-1 col-end-2'>
            <h1 class='ml-10 xl:ml-32 2xl:ml-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl xl:pt-10'>CONTACT US</h1>
            <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
            <div class="my-4 flex flex-col">
                <Service href='tel:+16043276587' src='/icons/telephone.png' label='(604) 327 6587' iconStyling="w-[30px] ml-10 xl:ml-32 2xl:ml-64" textStyling='text-white font-fontInter text-base ml-5 hover:underline' margin='mb-2'/>
                <Service href='tel:+16043275255' src='/icons/printer.png' label='(604) 327 5255' iconStyling="w-[30px] ml-10 xl:ml-32 2xl:ml-64" textStyling='text-white font-fontInter text-base ml-5 hover:underline' margin='mb-2'/>
                <Service href='mailto:info@bluechipcollision.com' src='/icons/email.png' label='info@bluechipcollision.com' iconStyling="w-[30px] ml-10 xl:ml-32 2xl:ml-64" textStyling='text-white font-fontInter text-base ml-5 hover:underline' margin='mb-2'/>
            </div>
        </section>
        <section class="row-start-2 row-end-3 col-start-1 col-end-2 w-full">
            <h1 class='mx-10 font-bold text-white text-2xl xl:text-3xl font-fontRoboto xl:pt-10 xl:ml-32 2xl:ml-64'>BUSINESS HOURS</h1>
            <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
            <div class="flex justify-between w-full mt-2 px-10 xl:pl-32 2xl:pl-64">
                <span class="font-fontInter text-white text-sm xl:text-base">Mon - Fri</span>
                <span class="font-fontInter text-white text-sm xl:text-base">8am - 5pm</span>
            </div>
            <div class="flex justify-between w-full px-10 xl:pl-32 2xl:pl-64">
                <span class="font-fontInter text-white text-sm xl:text-base">Saturday</span>
                <span class="font-fontInter text-white text-sm xl:text-base">By appointment</span>
            </div>
            <div class="flex justify-between w-full px-10 xl:pl-32 2xl:pl-64">
                <span class="font-fontInter text-white text-sm xl:text-base">Sunday</span>
                <span class="font-fontInter text-white text-sm xl:text-base">Closed</span>
            </div>  
        </section>
        <section class="pt-5 row-start-1 row-span-3 row-end-4 col-start-2 col-end-3">
            <h1 class='font-bold text-white text-2xl font-fontRoboto xl:text-3xl px-10 xl:pt-10'>OUR LOCATION</h1>
            <hr class='bg-yellow h-[2px] border-0 ml-10'/>
            <Service
                src='/icons/location.png'
                label='8808 Laurel St #1, Vancouver, BC V6P 3V8' 
                iconStyling='w-[30px] ml-10' 
                textStyling='text-white font-fontInter text-sm px-2' 
                margin='mt-2'
                href='https://g.co/kgs/MfwmnVF'
            />
            <div class="w-full p-10"><iframe title='' width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=BlueChipCollision-8808%20Laurel%20Street,%20Vancouver,%20British%20Columbia,%20Canada+(Blue%20Chip%20Collision)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe></div>
        </section>
        <section class='row-start-3 row-end-4 col-start-1 col-end-2 w-full'>
            <h1 class='ml-10 font-bold text-white text-2xl font-fontRoboto xl:ml-32 2xl:ml-64'>LINKS</h1>
            <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
            <div class='flex flex-col ml-10 py-5 xl:ml-32 2xl:ml-64'>
                <a href="/" class='underline text-white mt-1'>Link #1</a>
                <a href="/" class='underline text-white mt-1'>Link #2</a>
                <a href="/" class='underline text-white mt-1'>Link #3</a>
            </div>
        </section>
    </div>
    <section class='bg-white w-screen h-auto py-5'>
        <h1 class='ml-10 font-bold text-blue text-2xl font-fontRoboto xl:mx-32 2xl:mx-64'>EMAIL US</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:mx-32 2xl:mx-64'/>
        <form method="POST" onsubmit={handleSubmit} class='mx-10 my-5 xl:mx-32 2xl:mx-64'>
            <input name='name' bind:value={name} type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full text-white' placeholder="Name*">
            <input name='email' bind:value={email} type="email" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full text-white' placeholder="Email Address*">
            <input name='subject' bind:value={subject} type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full text-white' placeholder="Subject*">
            <input name='content' bind:value={content} type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full min-h-[15vh] placeholder:absolute placeholder:top-3 text-white' placeholder="Message*">
            <input type="hidden" name="token" bind:value={token}>
            <ReCaptcha bind:this={Captcha} { SITE_KEY } captchaStyle={{theme: 'dark', size: 'compact'}} />
            <button class='bg-blue p-2 text-white font-fontInter font-bold text-sm'>Send Message</button>
        </form>
    </section>
</main>