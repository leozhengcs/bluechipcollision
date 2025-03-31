<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { handleClickOutside } from '$lib/utils/eventHandlers';
	import { handleNavigation } from '$lib/utils/eventHandlers';
	import { headerState } from '../../stores/header.svelte';
	import { Hamburger } from 'svelte-hamburgers';

	// In case user reloads page in another screen
	onMount(() => {
		headerState.currentPath = window.location.pathname;
	});

	const isActive = (page: string) => {
		return page === headerState.currentPath
	}

    let toggleSidebar = () => {
		headerState.sidebar = !headerState.sidebar;
		if (headerState.sidebar) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}

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

<svelte:window
	onclick={(e) => {
		handleClickOutside(e, '.plus-menu-container', () => {
			document.body.classList.remove('overflow-hidden');
			return (headerState.sidebar ? (headerState.sidebar = false) : headerState.sidebar)
		})
	}}
/>
	

<header class='sticky top-0 left-0 bg-blue sm:pt-6 xl:pt-0 w-full shadow-sm shadow-black z-50 overflow-x-hidden h-20 flex justify-center'>
	<nav class='flex justify-between items-center p-2 z-50 w-full'>
		<a href="/" class='w-24 h-auto mr-5 md:w-36 2xl:mx-5' onclick={() => handleNavigation('/')}>
			<img src='/icons/logo.png' alt="Company Logo">
		</a>
		<!-- <div class="sm:w-1/3 h-auto mr-5 xl:w-[10%] 2xl:mx-5">
			<img src="/images/icbcrepair.jpg" alt="">
		</div> -->
		<div class='xl:flex items-center h-full hidden gap-5'>
			<div class='h-full flex justify-row items-center'>
				<img src="/icons/telephone.png" alt="Phone" class='w-auto h-[35%] px-2'>
				<a href='tel:+16043276587' class='text-white text-sm hover:underline'>(604) 327 6587</a>
			</div>
			<div class='h-full flex justify-row items-center'>
				<img src="/icons/location.png" alt="" class='w-auto h-[35%] px-2'>
				<a href='https://g.co/kgs/MfwmnVF' class="text-white text-sm hover:underline" target='_blank'>8808 Laurel St #1, Vancouver, BC V6P 3V8</a>
			</div>
		</div>
		<div class='flex flex-row items-center sm:gap-2 2xl:gap-5'>
			<a href='/' 
				class={`
				    sm:hidden 
					xl:block 
					text-white 
					font-fontRoboto 
					relative 
					inline-block 
					before:content-[''] 
					before:absolute 
					before:bottom-0 
					before:left-0 
					before:w-full
					before:h-[2px] 
					before:bg-current 
					before:origin-left 
					before:transition 
					before:duration-300 
					hover:before:scale-x-100 
					${isActive('/') ? 'before:scale-x-100' : 'before:scale-x-0'}
				`}
				onclick={() => handleNavigation('/')}>
				Home
			</a>
			<a href='/about' 
				class={`
				    sm:hidden 
					xl:block 
					text-white 
					font-fontRoboto 
					relative 
					inline-block 
					before:content-[''] 
					before:absolute 
					before:bottom-0 
					before:left-0 
					before:w-full
					before:h-[2px] 
					before:bg-current 
					before:origin-left 
					before:transition 
					before:duration-300 
					hover:before:scale-x-100 
					${isActive('/about') ? 'before:scale-x-100' : 'before:scale-x-0'}
				`}
				onclick={() => handleNavigation('/about')}>
				About Us
			</a>
			<a href='/contact' 
				class={`
					sm:hidden 
					xl:block 
					text-white 
					font-fontRoboto 
					relative 
					inline-block 
					before:content-[''] 
					before:absolute 
					before:bottom-0 
					before:left-0 
					before:w-full 
					before:h-[2px] 
					before:bg-current 
					before:origin-left 
					before:transition 
					before:duration-300 
					hover:before:scale-x-100 
					${isActive('/contact') ? 'before:scale-x-100' : 'before:scale-x-0'}
				`}
				onclick={() => handleNavigation('/contact')}>
				Contact
			</a>
			<a href='/gallery' 
				class={`
					sm:hidden
					xl:block
					text-white 
					font-fontRoboto 
					relative 
					inline-block 
					before:content-[''] 
					before:absolute 
					before:bottom-0 
					before:left-0 
					before:w-full 
					before:h-[2px] 
					before:bg-current 
					before:origin-left 
					before:transition 
					before:duration-300 
					hover:before:scale-x-100 
					${isActive('/gallery') ? 'before:scale-x-100' : 'before:scale-x-0'}
				`}
				onclick={() => handleNavigation('/gallery')}>
				Gallery
			</a>
			<a href='/faqs' 
				class={`
					sm:hidden 
					xl:block 
					text-white 
					font-fontRoboto 
					relative 
					inline-block 
					before:content-[''] 
					before:absolute 
					before:bottom-0 
					before:left-0 
					before:w-full 
					before:h-[2px] 
					before:bg-current 
					before:origin-left 
					before:transition 
					before:duration-300 
					hover:before:scale-x-100 
					${isActive('/faqs') ? 'before:scale-x-100' : 'before:scale-x-0'}
				`}
				onclick={() => handleNavigation('/faqs')}>
				FAQs
			</a>
			<Button href="/book" {label} path='/book' additionalStyling='xl:ml-2 lg:mr-5 xl:h-8 xl:w-auto xl:px-3'/>
			<div class="xl:hidden sm:block z-50">
				<Hamburger --color='white' open={headerState.sidebar} onclick={toggleSidebar}/>
			</div>
		</div>
	</nav>
</header>

{#if headerState.sidebar}
	<nav class='w-full h-full fixed top-0 bg-black bg-opacity-50 z-20 transform transition-transform {headerState.sidebar ? 'translate-x-0' : 'translate-x-full'}'>
		<div class="h-full w-72 absolute top-0 right-0 bg-black bg-opacity-50 z-20 grid grid-rows-[auto,4rem,1fr] grid-cols-1">
			<div class='w-full h-auto row-start-2 col-start-1 flex flex-col mt-32'>
				<a href='/' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>HOME</a>
				<a href='/about' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>ABOUT US</a>
				<a href='/contact' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>CONTACT</a>
				<a href='/gallery' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>GALLERY</a>
				<a href='/faqs' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>FAQs</a>
			</div>
		</div>
	</nav>
{/if}