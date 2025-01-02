<script lang='ts'>
    import Banner from '$lib/components/Banner.svelte';
    import Service from '$lib/components/Service.svelte';
    import { onMount } from 'svelte';
    import { getRandomInt } from '$lib/utils/mathUtils';
    import { showFooter } from '../../stores/footer';
    showFooter.set(true);

    let num1: number;
    let num2: number;
    let res: number;
    onMount(() => {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        res = num1 + num2;
    })
    
</script>

<main class='w-full h-auto shadow-sm bg-blue'>
    <Banner banner='bg-contact-banner' title='CONTACT US' styling='bottom-7 text-4xl'/>
    <section class='pt-5'>
        <h1 class='ml-10 font-bold text-white text-2xl font-fontRoboto'>CONTACT US</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10'/>
        <div class="my-4 flex flex-col">
            <Service src='/icons/telephone.png' label='(604) 327 6587' iconStyling="w-[30px] ml-10" textStyling='text-white font-fontInter text-md ml-5' margin='mb-2'/>
            <Service src='/icons/printer.png' label='(604) 327 5255' iconStyling="w-[30px] ml-10" textStyling='text-white font-fontInter text-md ml-5' margin='mb-2'/>
            <Service src='/icons/email.png' label='info@bluechipcollision.com' iconStyling="w-[30px] ml-10" textStyling='text-white font-fontInter text-md ml-5' margin='mb-2'/>
        </div>
    </section>
    <section class="pb-5">
        <h1 class='ml-10 font-bold text-white text-2xl font-fontRoboto'>BUSINESS HOURS</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10'/>
        <div class="flex justify-between w-[60%] mt-2">
            <span class="font-fontInter text-white text-sm ml-10">Mon - Fri</span>
            <span class="font-fontInter text-white text-sm">8am - 5pm</span>
        </div>
        <div class="flex justify-between w-[60%]">
            <span class="font-fontInter text-white text-sm ml-10">Sat</span>
            <span class="font-fontInter text-white text-sm">Closed</span>
        </div>
        <div class="flex justify-between w-[60%]">
            <span class="font-fontInter text-white text-sm ml-10">Sun</span>
            <span class="font-fontInter text-white text-sm">Closed</span>
        </div>
    </section>
    <section class="pb-5">
        <h1 class='ml-10 font-bold text-white text-2xl font-fontRoboto'>OUR LOCATION</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10'/>
        <Service 
            src='/icons/location.png' 
            label='8808 Laurel St #1, Vancouver, BC V6P 3V8' 
            iconStyling='w-[30px] ml-10' 
            textStyling='text-white font-fontInter text-md ml-2' 
            margin='mt-2'
        />
        <div class="w-screen h-60 bg-gray my-5 flex items-center justify-center">
            <span class='text-white'>GOOGLE MAPS API</span>
        </div>
    </section>
    <section>
        <h1 class='ml-10 font-bold text-white text-2xl font-fontRoboto'>LINKS</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10'/>
        <div class='flex flex-col ml-10 py-5'>
            <a href="/" class='underline text-white mt-1'>Link #1</a>
            <a href="/" class='underline text-white mt-1'>Link #2</a>
            <a href="/" class='underline text-white mt-1'>Link #3</a>
        </div>
    </section>
    <section class='bg-white w-screen h-auto py-5'>
        <h1 class='ml-10 font-bold text-blue text-2xl font-fontRoboto'>EMAIL US</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10'/>
        <form action="" class='mx-10 my-5'>
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="Name*">
            <input type="email" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="Email Address*">
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="Subject*">
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full min-h-[15vh] placeholder:absolute placeholder:top-3' placeholder="Message*">
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="{num1} + {num2} = ?*">
            <button class='bg-blue p-2 text-white font-fontInter font-bold text-sm'>Send Message</button>
        </form>
    </section>
</main>