<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
    import Service from '$lib/components/Service.svelte';
    import Banner from '$lib/components/Banner.svelte';
    
    import { footerState } from '../stores/footer.svelte';
    footerState.show = true
    
    import images from '$lib/imageData.json';
    import Swiper from '$lib/components/Swiper.svelte';
</script>

<main class='w-full h-auto shadow-sm overflow-hidden bg-white'>
    <!-- Header Carousel -->
    <Swiper {images}/> 
    <p class="m-10 xl:mx-32 2xl:mx-64 xl:my-10 text-gray font-fontInter font-black xl:text-xl">
        With over 25 years of experience, our team delivers exceptional service and craftsmanship for all kind of vehicle repairs and restorations.
    </p>
    <Button href='/book' label='Book Appointment' additionalStyling='ml-10 mb-10 xl:mx-32 2xl:mx-64'/>
    <h1 class='ml-10 xl:mx-32 2xl:mx-64 font-bold text-blue font-fontRoboto text-2xl xl:text-3xl'>WHAT WE OFFER</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
    <section class="mt-5 ml-10 xl:mx-32 2xl:mx-64 xl:mb-5 flex flex-col w-full h-auto">
        <!-- TODO: Adjust these icons -->
        <Service src="/icons/Car_Dent.png" label="Dent & Scratch Removal"/>
        <Service src='/icons/Certified_Technician.png' label='Certified Collision Repair'/>
        <Service src='/icons/Car_Panel.png' label='Door & Panel Replacement'/>
        <Service src='/icons/Spray_Paint.png' label='Painting Services'/>
        <Service src='/icons/Auto_Glass.png' label='Auto Glass Service'/>
    </section>
    
    <div class='bg-blue w-full py-12'>
        <h1 class="font-bold text-white text-2xl xl:text-3xl font-fontRoboto sm:px-10 xl:px-32 2xl:px-64">WHY OUR SERVICES?</h1>
        <hr class='bg-yellow h-[2px] border-0 sm:ml-10 xl:ml-32 2xl:ml-64'/>
        <h2 class="font-bold font-fontInter text-base text-white sm:px-10 xl:px-32 2xl:px-64 xl:text-base py-2">At Blue Chip Collision, we deliver quality auto body repairs with expert craftsmanship</h2>
        <p class="font-fontInter text-sm text-white sm:px-10 xl:px-32 2xl:px-64 xl:text-base leading-relaxed">Our certified technicians use advanced technology to ensure flawless results, and we back our work with a lifetime warranty. From free estimates to insurance claim assistance, we make the repair process easy and stress-free.</p>
    </div>
    <section class='bg-blue py-10 pt-0'>
        <h1 class='mx-10 xl:mx-32 2xl:mx-64 font-bold text-white text-2xl xl:text-3xl font-fontRoboto'>JOIN OUR CLUB!</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-32 2xl:ml-64'/>
        <h2 class="font-bold font-fontInter text-base text-white py-2 mx-10 xl:mx-32 2xl:mx-64 xl:text-sm">Get Your Car Looking Like New — For FREE!</h2>
        <p class='text-white text-sm leading-relaxed xl:text-base ml-10 xl:mx-32 2xl:mx-64'>Join the Take Care Auto Club Appearance Package and enjoy the peace of mind that comes with free repairs on dents, scratches, and more!</p>
        <p class='text-white text-sm leading-relaxed ml-10 xl:mx-32 2xl:mx-64 xl:text-base'>Stop by the front desk today to learn how you can start saving and driving stress-free with our exclusive Appearance Package!</p>
        <div class='pt-10'>
            <div class="elfsight-app-ad760cf3-4036-4af3-ac9e-9e233c467f16" data-elfsight-app-lazy></div>
        </div>
    </section>
</main>