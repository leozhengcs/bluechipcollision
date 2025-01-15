<script lang="ts">
  import { onMount } from 'svelte';

  // Define the Slot interface
  interface Slot {
    start: string;
    end: string;
    summary: string;
  }

  // Use the Slot type for the slots array
  let slots: Slot[] = [];

  onMount(async () => {
    const res = await fetch('/book/slots');
    slots = await res.json() as Slot[]; // Cast the response to Slot[]
  });

  const bookSlot = async (slot: Slot) => {
    const res = await fetch('/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start: slot.start,
        end: slot.end,
        summary: 'User Booking',
      }),
    });

    const data = await res.json();
    alert(`Booked: ${data.summary}`);
  };
</script>

<ul>
  {#each slots as slot}
    <li>
      {slot.start} - {slot.end}
      <button on:click={() => bookSlot(slot)}>Book</button>
    </li>
  {/each}
</ul>
