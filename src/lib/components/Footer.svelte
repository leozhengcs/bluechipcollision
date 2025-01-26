<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
	let label = $state("Book");

	$effect(() => {
		label = window.innerWidth >= 1024 ? 'Book Appointment' : 'Book Now';
		
		window.addEventListener('resize', () => {
		label = window.innerWidth >= 1024 ? 'Book Appointment' : 'Book Now';
		
	});
		// Cleanup function
		return () => window.removeEventListener('resize', () => {
		label = window.innerWidth >= 1024 ? 'Book Appointment' : 'Book Now';
    });
  });
</script>

<footer class='h-auto w-full bg-gray sm:pb-5 overflow-x-hidden sm:p-10 xl:px-24'>
	<h1 class='text-white font-fontRoboto xl:text-lg sm:text-xl font-bold py-5 pt-4'>BOOK YOUR REPAIR NOW</h1>
	<div class='w-full h-full flex flex-col py-3'>
		<h2 class="font-fontRoboto text-white mb-1">VIA ONLINE FORM</h2>
		<Button href='/book' {label} additionalStyling='xl:h-8'/>
	</div>
	<div class="w-full h-full flex flex-col py-3">
		<h2 class="font-fontRoboto text-white mb-1">VIA PHONE CALL</h2>
		<a href='tel:+16043276587' class="font-fontInter text-yellow text-sm">(604) 327-6587</a>
	</div>
	<div class='w-full h-full flex flex-col py-3'>
		<h2 class="font-fontRoboto text-white mb-1">BUSINESS HOURS</h2>
		<div class="grid grid-cols-2 grid-rows-1">
			<div class="flex flex-col sm:justify-between xl:justify-normal sm:w-full sm:row-start-1 sm:col-start-1">
				<span class="font-fontInter text-yellow text-sm ">Mon - Fri</span>
				<span class="font-fontInter text-yellow text-sm">Sat</span>
				<span class="font-fontInter text-yellow text-sm">Sun</span>
			</div>
			<div class="flex flex-col sm:justify-between xl:justify-normal sm:w-full sm:row-start-1 sm:col-start-2">
				<p class="font-fontInter text-yellow text-sm text-right">8am - 5pm</p>
				<p class="font-fontInter text-yellow text-sm text-right">By appointment</p>
				<p class="font-fontInter text-yellow text-sm text-right">Closed</p>
			</div>
		</div>
	</div>
	<div class="w-full h-full flex flex-col">
		<h2 class="font-fontRoboto text-white mb-1">OFFICE LOCATION</h2>
		<span class="font-fontInter text-yellow text-sm">8808 Laurel St #1</span>
		<span class="font-fontInter text-yellow text-sm">Vancouver, BC V6P 3V8</span>
	</div>
</footer>