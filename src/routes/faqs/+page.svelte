<script lang='ts'>
    import Banner from '$lib/components/Banner.svelte';
    import { onMount } from 'svelte';
    import { getRandomInt } from '$lib/utils/mathUtils';

    let num1: number;
    let num2: number;
    let res: number;
    onMount(() => {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        res = num1 + num2;
    })

    import { footerState } from '../../stores/footer.svelte';
    footerState.show = true
</script>

<main class='bg-blue'>
    <Banner banner='bg-about-banner' title='FAQs' styling='bottom-7 text-4xl xl:text-4xl xl:left-32 2xl:left-64'/>
    <section class='py-10'>
        <h1 class='mx-10 xl:mx-32 2xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl xl:pt-10'>WHAT SERVICES DO YOU OFFER?</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
        <p class="mx-10 mt-2 text-white font-fontInter text-base w-[85%] xl:mx-32 2xl:mx-64 pb-5">
            We offer a wide range of auto body repair services, including collision repair, dent removal, frame straightening, painting, bumper repair, scratch removal, and more.
        </p>
        <h1 class='mx-10 xl:mx-32 2xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl xl:pt-10'>DO YOU PROVIDE FREE ESTIMATES?</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
        <p class="mx-10 mt-2 text-white font-fontInter text-base w-[85%] xl:mx-32 2xl:mx-64 pb-5">
            Yes! We provide free, no-obligation estimates. Simply bring your vehicle to our shop, and our technicians will assess the damage and give you an accurate quote.
        </p>
        <h1 class='mx-10 xl:mx-32 2xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl xl:pt-10'>HOW LONG WILL MY REPAIR TAKE?</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
        <p class="mx-10 mt-2 text-white font-fontInter text-base w-[85%] xl:mx-32 2xl:mx-64 pb-5">
            The time required for repairs depends on the extent of the damage and availability of parts. Minor repairs may take a day or two, while major collision repairs may take several days. We’ll provide a timeline when we prepare your estimate.        </p>
        <h1 class='mx-10 xl:mx-32 2xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl xl:pt-10'>DO I NEED TO MAKE AN APPOINTMENT?</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
        <p class="ml-10 mt-2 text-white font-fontInter text-base w-[85%] xl:ml-32 2xl:ml-64 pb-5">
            While appointments are recommended to ensure prompt service, walk-ins are always welcome. You can also schedule an appointment online or by calling us directly.
        </p>
    </section>
    <section class='bg-white'>
        <h1 class='pt-5 mx-10 xl:mx-64 font-bold text-blue text-2xl font-fontRoboto sm:text-xl xl:text-3xl xl:pt-10'>HAVE YOUR OWN QUESTIONS?</h1>
        <hr class='bg-yellow h-[2px] border-0 x-10 xl:ml-64'/>
        <form action="" class='mx-10 py-5 xl:mx-64'>
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="Name*">
            <input type="email" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="Email Address*">
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="Subject*">
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full min-h-[15vh] placeholder:absolute placeholder:top-3' placeholder="Message*">
            <input type="text" class='border-0 border-b-2 mb-5 border-yellow bg-blue w-full' placeholder="{num1} + {num2} = ?*">
            <button class='bg-blue p-2 text-white font-fontInter font-bold text-sm'>Send Message</button>
        </form>
    </section>
</main>