<script lang='ts'>
    import Button from '$lib/components/Button.svelte';
    import { showFooter } from '../../stores/footer';
    showFooter.set(false);
</script>

<main class="bg-blue h-[100vh]">
    <section class="py-5">
        <h1 class='ml-10 font-bold text-white text-2xl font-fontRoboto'>SUBMISSION RECEIVED</h1>
        <hr class='bg-yellow h-[2px] border-0 ml-10'/>
        <p class="ml-10 mt-2 text-white font-fontInter text-sm w-[85%]">
            We have received your submission! Please give up to two weeks for us to review your submission. We will get back to you either via cellphone or email, depending on your selected preference.
        </p>
    </section>
    <Button href='/' label='GO HOME' additionalStyling='ml-10' width='w-24' height='h-9'/>
</main>