<script>
    import { footerState } from "../../../stores/footer.svelte";
    footerState.show = false;

    const { data } = $props();
    console.log(data);
    const docId = $state(data.id);
    let phoneNum = $state(data.phoneNum);
    let email = $state(data.email);
    let modelYear = $state(data.modelYear);
    let responsePref = $state(data.responsePref);
    const vin = $state(data.vin);
    const status = $state(data.status);
    let carMake = $state(data.carMake);
    let name = $state(data.name);

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
            throw new Error(`Unrecognized Status in Ticket.svelte Form: ${docId}`);
    }
</script>

<main class="bg-blue min-h-screen">
    <!-- TODO: Type checking for typescript for this file. -->
    <h1 class='ml-10 xl:mx-64 font-bold text-white text-2xl font-fontRoboto sm:text-xl xl:text-3xl pt-20 pb-5'>CLAIM {docId}</h1>
    <hr class='bg-yellow h-[2px] border-0 ml-10 xl:ml-64'/>
    <form class='mx-10 xl:mx-64 flex flex-col items-start' method='POST'>
        <span class='font-bold font-fontInter text-white'>Status: <span class='text-{color}'>{status.toUpperCase()}</span></span>
        <label for="carMake" class='text-white font-fontInter text-lg py-0 my-0'>Car Make</label>
        <input type="text" id='carMake' name='carMake' bind:value={carMake} class='w-full bg-blue border-yellow text-white'>
        <label for="name" class='text-white font-fontInter text-lg'>Name</label>
        <input type="text" id='name' name='name' bind:value={name} class='w-full bg-blue border-yellow text-white'>
        <label for="phoneNum" class='text-white font-fontInter text-lg'>Phone Number</label>
        <input type="text" id='phoneNum' name='phoneNum' bind:value={phoneNum} class='w-full bg-blue border-yellow text-white'>
        <label for="email" class='text-white font-fontInter text-lg'>Email</label>
        <input type="text" id='email' name='email' bind:value={email} class='w-full bg-blue border-yellow text-white'>
        <label for="name" class='text-white font-fontInter text-lg'>VIN</label>
        <input type="text" id='name' name='vin' value={vin} class='w-full bg-blue border-yellow text-white'>
        <span class='text-white font-fontInter text-lg'>Images</span>

        <input type="hidden" name='docId' value={docId}>
        <button class='my-2 p-3 bg-yellow font-bold font-fontInter text-white'>Update</button>
    </form>
</main>