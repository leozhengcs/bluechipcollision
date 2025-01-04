<script lang='ts'>
    import Banner from '$lib/components/Banner.svelte';
    import { footerState } from '../../stores/footer.svelte';
    footerState.show = true
</script>

<main class='bg-blue'>
    <Banner banner='bg-about-banner' title='ABOUT US' styling='bottom-7 text-4xl xl:text-4xl xl:left-64'/>
    <section class='py-10 min-h-[100vh]'>
        <h1 class='ml-10 xl:ml-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl'>OUR MISSION</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
        <p class="font-fontInter text-base text-white sm:px-10 xl:px-64 xl:text-base py-2">
            At Blue Chip Collision, our mission is to deliver exceptional auto body repair services with honesty, precision, and care. We are committed to restoring your vehicle to its pre-accident condition while ensuring your safety and satisfaction.
        </p>
        <h1 class='ml-10 xl:ml-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl xl:pt-10'>OUR HISTORY</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
        <p class="font-fontInter text-base text-white sm:px-10 xl:px-64 xl:text-base py-2">
            Since opening our doors in 1999, Blue Chip Collision has been dedicated to serving our community with reliable, high-quality auto body repairs. What began as a small, family-owned business has grown into a trusted name in the industry, thanks to our unwavering commitment to excellence and integrity. Over the years, we've built lasting relationships with our customers by treating every car as if it were our own. Our history is a reflection of hard work, passion, and a promise to always put our customers first.
        </p>
    </section>
</main>