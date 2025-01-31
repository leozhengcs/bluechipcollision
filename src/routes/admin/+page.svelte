<script lang='ts'>
    import type { DocumentData } from 'firebase/firestore';
    import Ticket from '$lib/components/Ticket.svelte';
    import { footerState } from "../../stores/footer.svelte";
    footerState.show = false;

    let { data } = $props();
    const completed: DocumentData[] = [];
    const pending: DocumentData[] = [];
    const cancelled: DocumentData[] = [];
    data.forms.forEach((form) => {
        if (Object.keys(form.data).length !== 0) {
            switch(form.data.status) {
                case "completed":
                    completed.push(form);
                    break;
                case "pending":
                    pending.push(form);
                    break;
                case "cancelled":
                    cancelled.push(form);
                    break;
                default: // Should not ever get down here
                    throw new Error("Unrecognized Status Form");
            }
        }
    })
</script>

<main class='bg-blue min-h-screen'>
    <h1 class='ml-10 xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl pt-20 pb-5'>COMPLETED</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
    <div class="px-10 xl:px-64 w-screen">
        {#each completed as form}
            <Ticket {form}/>
        {/each}
    </div>

    <h1 class='ml-10 xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl pt-20 pb-5'>PENDING</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
    <div class="px-10 xl:px-64 w-screen">
        {#each pending as form}
            <Ticket {form}/>
        {/each}
    </div>
    
    <h1 class='ml-10 xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl pt-20 pb-5'>CANCELLED</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
    <div class="px-10 xl:px-64 w-screen">
        {#each cancelled as form}
            <Ticket {form}/>
        {/each}
    </div>
</main>