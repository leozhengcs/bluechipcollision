<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
    import Service from '$lib/components/Service.svelte';
    import Banner from '$lib/components/Banner.svelte';

    import { footerState } from '../stores/footer.svelte';
    footerState.show = true
</script>

<main class='w-full h-auto shadow-sm overflow-hidden bg-white'>
    <Banner banner='bg-root-banner' title="Blue Chip Collision is Vancouver's top choice for automotive collision repair." styling='text-xs xl:ml-20 xl:mb-10'/>
    <p class="m-10 xl:mx-64 xl:my-10 text-gray font-fontInter font-black xl:text-xl">
        With over 25 years of experience, our team delivers exceptional service and craftsmanship for all kind of vehicle repairs and restorations.
    </p>
    <Button href='/book' label='Book Appointment' additionalStyling='ml-10 mb-10 xl:ml-64'/>
    <h1 class='ml-10 xl:ml-64 font-bold text-blue text-2xl font-fontRoboto sm:text-xl xl:text-3xl'>WHAT WE OFFER</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
    <section class="mt-5 ml-10 xl:ml-64 xl:mb-5 flex flex-col w-full h-auto">
        <!-- TODO: Adjust these icons -->
        <Service src="/icons/body-repair.png" label="Dent & Scratch Removal"/>
        <Service src='/icons/technician.png' label='Certified Collision Repair'/>
        <Service src='/icons/car-door.png' label='Door & Panel Replacement'/>
        <Service src='/icons/spray.png' label='Painting Services'/>
    </section>
    
    <div class='bg-blue w-full py-12'>
        <h1 class="font-bold text-white sm:text-xl xl:text-3xl font-fontRoboto sm:px-10 xl:px-64">WHY OUR SERVICES?</h1>
        <hr class='bg-yellow h-[2px] border-0 sm:ml-10 xl:ml-64'/>
        <h2 class="font-bold font-fontInter text-base text-white sm:px-10 xl:px-64 xl:text-base py-2">At Blue Chip Collision, we deliver quality auto body repairs with expert craftsmanship</h2>
        <p class="font-fontInter text-sm text-white sm:px-10 xl:px-64 xl:text-base leading-relaxed">Our certified technicians use advanced technology to ensure flawless results, and we back our work with a lifetime warranty. From free estimates to insurance claim assistance, we make the repair process easy and stress-free.</p>
    </div>
    <div class='grid grid-rows-1 sm:grid-cols-[35%_65%] xl:grid-cols-[auto_auto] gap-5 bg-blue py-10 pt-0'>
        <!-- TODO: Potential Media Query Spot For the Background Image -->
        <section class='bg-membership-banner bg-cover bg-center xl:bg-none row-start-1 col-start-1 row-end-2 col-end-2 sm:w-full sm:h-[auto] xl:w-[50%]'>
            <img src="/images/repair-banner.jpg" alt="Repair banner" class='xl:ml-64 sm:hidden xl:block'>
        </section>
        <div class='row-start-1 col-start-2 col-end-3 row-end-2'>
            <h1 class='font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-2xl'>JOIN OUR CLUB!</h1>
            <hr class='bg-yellow h-[2px] border-0'/>
            <h2 class="font-bold font-fontInter text-base text-white py-2 w-[80%] xl:text-sm">Get Your Car Looking Like New — For FREE!</h2>
            <p class='text-white text-sm leading-relaxed w-[80%] xl:text-base'>Join the Take Care Auto Club Appearance Package and enjoy the peace of mind that comes with free repairs on dents, scratches, and more!</p>
            <p class='text-white text-sm leading-relaxed pt-5 w-[80%] xl:text-base'>Stop by the front desk today to learn how you can start saving and driving stress-free with our exclusive Appearance Package!</p>
        </div>
    </div>
</main>