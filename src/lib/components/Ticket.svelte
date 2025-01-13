<script lang='ts'>
    import { goto } from '$app/navigation';
    const { form } = $props();

    export const formId = form.id;
    const status = form.data.status;


    let color = $state('');
    switch (status) {
        case 'completed':
            color = 'green';
            break;
        case 'pending':
            color = 'yellow';
            break;
        case 'cancelled':
            color = 'red';
            break;
        default:
            throw new Error(`Unrecognized Status in Ticket.svelte Form: ${formId}`);
    }

    function goToDetails() {
        goto(`/admin/details?id=${formId}`);
    }


    // const formId = form.id;
    // const status = form.status;
    // const carMake = form.carMake;
    // const phoneNum = form.phoneNum;
    // const email = form.email;
    // const yearModel = form.yearModel;
    // const vin = form.vin;
    // const responsePref = form.responsePref;
</script>

<button class='flex w-full h-16 justify-between my-10 bg-white items-center p-5' onclick={goToDetails}>
    <span class='font-fontInter'>Claim # {formId}</span>
    <span class='font-fontInter'>Status: <span class='text-{color}'>{status.toUpperCase()}</span></span>
</button>