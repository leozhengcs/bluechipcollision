<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
    import Service from '$lib/components/Service.svelte';
    import Banner from '$lib/components/Banner.svelte';

    import { showFooter } from '../stores/footer';
    showFooter.set(true);
</script>

<main class='w-full h-auto shadow-sm overflow-hidden'>
    <Banner banner='bg-root-banner' title="Blue Chip Collision is Vancouver's top choice for automotive collision repair." styling='text-xs'/>
    <p class="m-10 2xl:m-24 2xl:mb-10 text-gray font-fontInter font-black text-md 2xl:text-xl">
        With over 25 years of experience, our team delivers exceptional service and craftsmanship for all kind of vehicle repairs and restorations.
    </p>
    <Button href='/book' label='Book Appointment' additionalStyling='ml-10 mb-10 2xl:ml-24'/>
    <h1 class='ml-10 2xl:ml-24 font-bold text-blue text-2xl font-fontRoboto'>WHAT WE OFFER</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 2xl:ml-24'/>
    <section class="mt-5 ml-10 2xl:ml-24 2xl:mb-5 flex flex-col w-full h-auto">
        <!-- TODO: Adjust these icons -->
        <Service src="/icons/body-repair.png" label="Dent & Scratch Removal"/>
        <Service src='/icons/technician.png' label='Certified Collision Repair'/>
        <Service src='/icons/car-door.png' label='Door & Panel Replacement'/>
        <Service src='/icons/spray.png' label='Painting Services'/>
        <Service src='/icons/damper.png' label='Suspension and Alignment Repair'/>
    </section>
    <div class='bg-blue w-full py-10'>
        <h1 class="ml-10 2xl:ml-24 font-bold text-white text-2xl xl:text-xl font-fontRoboto">WHY OUR SERVICES?</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 2xl:ml-24'/>
        <h2 class="font-bold font-fontInter text-base text-white px-10 2xl:px-24 xl:text-sm py-2">At Blue Chip Collision, we deliver quality auto body repairs with expert craftsmanship</h2>
        <p class="font-fontInter text-sm text-white px-10 2xl:px-24 xl:text-xs leading-relaxed">Our certified technicians use advanced technology to ensure flawless results, and we back our work with a lifetime warranty. From free estimates to insurance claim assistance, we make the repair process easy and stress-free.</p>
    </div>
    <div class='grid grid-rows-1 sm:grid-cols-[35%_65%] xl:grid-cols-[auto_auto] gap-5 relative bg-blue pb-10'>
        <!-- TODO: Potential Media Query Spot For the Background Image -->
        <section class='bg-membership-banner bg-cover bg-center xl:bg-none row-start-1 col-start-1 row-end-2 col-end-2 sm:w-full sm:h-[auto] 2xl:w-[50%]'>
            <img src="/images/repair-banner.jpg" alt="Repair banner" class='2xl:ml-24 sm:hidden xl:block'>
        </section>
        <div class='row-start-1 col-start-2 col-end-3 row-end-2'>
            <h1 class='font-bold text-white text-2xl font-fontRoboto xl:text-xl'>JOIN OUR CLUB!</h1>
            <hr class='bg-yellow h-[2px] border-0'/>
            <h2 class="font-bold font-fontInter text-base text-white py-2 w-[80%] xl:text-sm">Get Your Car Looking Like New — For FREE!</h2>
            <p class='text-white text-sm leading-relaxed w-[80%] xl:text-xs'>Join the Take Care Auto Club Appearance Package and enjoy the peace of mind that comes with free repairs on dents, scratches, and more!</p>
            <p class='text-white text-sm leading-relaxed pt-5 w-[80%] xl:text-xs'>Stop by the front desk today to learn how you can start saving and driving stress-free with our exclusive Appearance Package!</p>
        </div>
    </div>
</main>