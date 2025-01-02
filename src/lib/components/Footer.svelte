<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
</script>

<footer class='h-auto w-full bg-gray sm:pb-5 overflow-x-hidden'>
	<h1 class='text-white font-fontRoboto xl:text-lg sm:text-xl font-bold pl-10 py-5 pt-4 2xl:pl-24'>BOOK YOUR REPAIR NOW</h1>
	<div class='grid grid-rows-2 grid-cols-2 gap-4'>
		<div class='col-start-1 row-start-1 col-end-2 row-end-2 w-full h-full flex flex-col'>
			<h2 class="font-fontRoboto text-white sm:text-sm ml-10 2xl:ml-24 mb-1">VIA ONLINE FORM</h2>
			<Button href='/book' label='Book Appointment' additionalStyling='ml-10 2xl:ml-24 xl:text-sm xl:w-36 xl:h-6'/>
		</div>
		<div class='col-start-1 row-start-2 col-end-2 row-end-3 w-full h-full flex flex-col'>
			<h2 class="font-fontRoboto text-white lg:text-base sm:text-sm ml-10 2xl:ml-24 2xl:text-sm mb-1">BUSINESS HOURS</h2>
			<div class="flex justify-between w-full">
				<span class="font-fontInter text-yellow sm:text-xs ml-10 2xl:ml-24">Mon - Fri</span>
				<span class="font-fontInter text-yellow sm:text-xs">8am - 5pm</span>
			</div>
			<div class="flex justify-between w-full">
				<span class="font-fontInter text-yellow sm:text-xs ml-10 2xl:ml-24">Sat & Sun</span>
				<span class="font-fontInter text-yellow sm:text-xs">Closed</span>
			</div>
		</div>
		<div class="col-start-2 row-start-1 col-end-3 row-end-2 w-full h-full flex flex-col">
			<h2 class="font-fontRoboto text-white sm:text-sm ml-5 mb-1 xl:ml-20">VIA PHONE CALL</h2>
			<a href='tel:+16043276587' class="font-fontInter text-yellow sm:text-xs ml-5 xl:ml-20">(604) 327-6587</a>
		</div>
		<div class="col-start-2 row-start-2 col-end-3 row-end-3 w-full h-full flex flex-col">
			<h2 class="font-fontRoboto text-white ml-5 mb-1 sm:text-sm xl:ml-20">OFFICE LOCATION</h2>
			<span class="font-fontInter text-yellow sm:text-xs ml-5 xl:ml-20">8808 Laurel St #1</span>
			<span class="font-fontInter text-yellow sm:text-xs ml-5 xl:ml-20">Vancouver, BC V6P 3V8</span>
		</div>
	</div>
</footer>