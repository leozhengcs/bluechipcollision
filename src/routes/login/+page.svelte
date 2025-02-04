<script>
    import { footerState } from '../../stores/footer.svelte';
    footerState.show = false;
</script>

<main class="bg-blue min-h-screen">
    <h1 class='ml-10 xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl pt-20 pb-5'>ADMIN LOGIN</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
    <form id='loginForm' method="POST" class='flex flex-col items-start px-10 xl:px-64 gap-10 py-10'>
        <input type="text" name='username' placeholder='Username' class='border-yellow w-full font-fontInter bg-blue text-white placeholder:text-white peer'>
        <input type="text" name='password' placeholder='Password' class='border-yellow w-full font-fontInter bg-blue text-white placeholder:text-white'>
        <button class='text-white font-fontInter font-bold bg-yellow px-6 py-2'>Login</button>
    </form>
</main>