<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { handleClickOutside } from '$lib/utils/eventHandlers';

    let sidebar = $state(false);
	let currentPath = $state('');
	
	// In case user reloads page in another screen
	onMount(() => {
		currentPath = window.location.pathname;
	});

	const isActive = (path: string) => {
		return currentPath.includes(path);
	}

	const handleNavigation = (path: string) => {
		currentPath = path;
	}

    let toggleSidebar = () => {
		sidebar = !sidebar;
		if (sidebar) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}
	}
</script>

<svelte:window
	onclick={(e) => {
		handleClickOutside(e, '.plus-menu-container', () => (sidebar ? (sidebar = false) : sidebar))
	}}
/>
	

<header class='sticky top-0 left-0 bg-blue sm:pt-6 xl:pt-0 w-full shadow-xl z-20 overflow-x-hidden'>
	<nav class='flex justify-between items-center p-2'>
		<a href="/" class='sm:w-1/3 h-auto mr-5 xl:w-[10%] 2xl:mx-5' onclick={() => handleNavigation('/')}>
			<img src='/icons/logo.png' alt="Company Logo">
		</a>
		<div class='flex flex-row items-center sm:gap-2 2xl:gap-5'>
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
			<Button href="/book" label='Book Appointment' additionalStyling='xl:ml-2 xl:mr-5 xl:h-8 xl:w-auto xl:px-3'/>
		</div>
		<button type='button' onclick={toggleSidebar} class='xl:hidden plus-menu-container'>
			<img src="/icons/menu-gray.png" alt="Menu Icon" class='w-10 h-auto opacity-70'/>
		</button>
	</nav>
</header>

{#if sidebar}
	<nav class="w-full h-full fixed top-0 bg-black bg-opacity-50 z-50">
		<div class="h-full w-72 absolute top-0 right-0 bg-black bg-opacity-50 grid grid-rows-[auto,4rem,1fr] grid-cols-1">
			<div class="w-full row-start-1 col-start-1 h-auto">
				<button type='button' onclick={toggleSidebar} class='mt-8 mr-8 float-right'>
					<img src="/icons/close.png" alt="Close Sidebar Icon" class='w-7 h-auto'>
				</button>
			</div>
			<div class='w-full h-auto row-start-2 col-start-1 flex flex-col mt-10'>
				<a href='/' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>HOME</a>
				<a href='/about' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>ABOUT US</a>
				<a href='/contact' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>CONTACT</a>
				<a href='/gallery' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>GALLERY</a>
				<a href='/faqs' class='font-fontRoboto text-white text-3xl ml-5 mb-4' onclick={toggleSidebar}>FAQs</a>
			</div>
		</div>
	</nav>
{/if}