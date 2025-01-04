<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
</script>

<footer class='h-auto w-full bg-gray sm:pb-5 overflow-x-hidden sm:p-10 xl:px-24'>
	<h1 class='text-white font-fontRoboto xl:text-lg sm:text-xl font-bold py-5 pt-4'>BOOK YOUR REPAIR NOW</h1>
	<div class='sm:grid sm:grid-rows-2 sm:grid-cols-2 sm:gap-4 xl:flex xl:flex-row xl:gap-10'>
		<div class='sm:col-start-1 sm:row-start-1 sm:col-end-2 sm:row-end-2 w-full h-full flex flex-col'>
			<h2 class="font-fontRoboto text-white sm:text-sm  mb-1">VIA ONLINE FORM</h2>
			<Button href='/book' label='Book Appointment' additionalStyling=' xl:text-sm xl:w-36 xl:h-6'/>
		</div>
		<div class="sm:col-start-2 sm:row-start-1 sm:col-end-3 sm:row-end-2 w-full h-full flex flex-col">
			<h2 class="font-fontRoboto text-white sm:text-sm ml-5 mb-1">VIA PHONE CALL</h2>
			<a href='tel:+16043276587' class="font-fontInter text-yellow sm:text-xs ml-5">(604) 327-6587</a>
		</div>
		<div class='col-start-1 sm:row-start-2 sm:col-end-2 sm:row-end-3 w-full h-full flex flex-col'>
			<h2 class="font-fontRoboto text-white lg:text-base sm:text-sm  2xl:text-sm mb-1">BUSINESS HOURS</h2>
			<div class="grid grid-cols-2 grid-rows-1">
				<div class="flex flex-col sm:justify-between xl:justify-normal sm:w-full sm:row-start-1 sm:col-start-1">
					<span class="font-fontInter text-yellow sm:text-xs ">Mon - Fri</span>
					<span class="font-fontInter text-yellow sm:text-xs">Sat & Sun</span>
				</div>
				<div class="flex flex-col sm:justify-between xl:justify-normal sm:w-full sm:row-start-1 sm:col-start-2">
					<p class="font-fontInter text-yellow sm:text-xs  text-right">8am - 5pm</p>
					<p class="font-fontInter text-yellow sm:text-xs text-right">Closed</p>
				</div>
			</div>
		</div>
		<div class="sm:col-start-2 sm:row-start-2 sm:col-end-3 sm:row-end-3 w-full h-full flex flex-col">
			<h2 class="font-fontRoboto text-white mb-1 sm:text-sm ml-5">OFFICE LOCATION</h2>
			<span class="font-fontInter text-yellow sm:text-xs ml-5">8808 Laurel St #1</span>
			<span class="font-fontInter text-yellow sm:text-xs ml-5">Vancouver, BC V6P 3V8</span>
		</div>
	</div>
</footer>