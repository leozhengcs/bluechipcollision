<script lang="ts">
  import { onMount } from 'svelte';

  // Define the Slot interface
  interface Slot {
    start: string;
    end: string;
    summary: string;
  }

  type SlotsByDate = Record<string, Slot[]>;

  let slots: Slot[] = $state([]);
  let slotsByDate: SlotsByDate = $state({});

  const today = new Date();
  let currentYear = $state(today.getFullYear());
  let currentMonth = $state(today.getMonth());
  let selectedDate:null|string = $state(null);
  let selectedTime:null|string = $state(null);
  $inspect(selectedDate);

  const daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let daysInMonth:(number | null)[] = $state([]);
  let availableTimes: Slot[] = $state([]);

  // Generate days for the current month
  function generateDays(year: number, month: number): void {
    const firstDay: number = new Date(year, month, 1).getDay(); // Day of the week the month starts
    const totalDays: number = new Date(year, month + 1, 0).getDate(); // Total days in the month
    daysInMonth = [];

    // Fill with empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysInMonth.push(null);
    }

    // Fill with actual days of the month
    for (let day = 1; day <= totalDays; day++) {
      daysInMonth.push(day);
    }
  }


  onMount(async () => {
    generateDays(currentYear, currentMonth);

    const res = await fetch('/book/slots');
    slots = await res.json() as Slot[];

    // Split the slots into date and times with each date holding an array of available time
    slotsByDate = slots.reduce((acc: SlotsByDate, slot) => {
      const date = new Date(slot.start).toISOString().split('T')[0]; // YYYY-MM-DD
      if (!acc[date]) acc[date] = [];
      acc[date].push(slot);
      return acc;
    }, {});
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

  function getTimes(date: string): void {
    availableTimes = [];
    if (!slotsByDate[date]) {
      return;
    }

    const formatTime = (date: Date): string => {
      const hours = date.getHours(); // Local hours
      const minutes = String(date.getMinutes()).padStart(2, '0'); // Ensure two-digit minutes
      const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
      const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
      return `${formattedHours}:${minutes} ${period}`;
    };

    // Create an array of slots with their original start/end times
    const unsortedTimes = slotsByDate[date].map((time) => ({
      startDate: new Date(time.start), // Interpreted as local time
      endDate: new Date(time.end),    // Interpreted as local time
      start: time.start,
      end: time.end,
    }));

    // Sort times based on local `startDate` by hours.
     const sortedTimes = unsortedTimes.sort((a, b) => a.startDate.getHours() - b.startDate.getHours());


     sortedTimes.forEach(({ startDate, endDate }) => {
      console.log(startDate);
      availableTimes.push({
        start: formatTime(startDate), // Format start time in local time
        end: formatTime(endDate),     // Format end time in local time
      } as Slot);
    });
  }


  function selectDay(day: number | null): void {
    if (day) {
      const selectedDay = new Date(currentYear, currentMonth, day);
      selectedDate = selectedDay.toISOString().slice(0, 10);
      getTimes(selectedDate);
    }
  }

  function selectTime(time: string | null): void {
    if (time) {
      selectedTime = time;
    }
  }

  function prevMonth(): void {
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    generateDays(currentYear, currentMonth);
    selectedDate = null; // Reset selected day
  }

  function nextMonth(): void {
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
    generateDays(currentYear, currentMonth);
    selectedDate = null; // Reset selected day
  }
</script>


<!-- {#each slots as slot, index}
{slot.start} - {slot.end}
<button onclick={() => bookSlot(slot)}>Book</button> -->
<div class="grid grid-rows-1 grid-cols-2">
  <div class='flex flex-col items-center space-y-4 col-start-1 col-end-2'>
    <div class="flex items-center justify-between w-full max-w-xs">
      <button
        onclick={prevMonth}
        class="px-3 py-1 rounded hover:bg-gray-300 transition text-white"
      >
        ←
      </button>
      <strong class="font-fontInter text-lg font-semibold text-white">
        {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
      </strong>
      <button
        onclick={nextMonth}
        class="px-3 py-1 rounded hover:bg-gray-300 transition text-white"
      >
        →
      </button>
    </div>
  
    <!-- Calendar grid -->
    <div class="grid grid-cols-7 gap-2 w-full max-w-xs">
      <!-- Days of the week -->
      {#each daysOfWeek as day}
        <div class="text-center font-semibold text-white hover:cursor-default">{day}</div>
      {/each}
  
      <!-- Days in the month -->
      {#each daysInMonth as day}
        <button
          class={`w-10 h-10 flex items-center justify-center rounded-lg text-white 
            ${selectedDate && Number(selectedDate.slice(8,10)) === day? "bg-yellow text-white" : ""}
            ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? "border-2 border-yellow" : ""}
            ${day === null ? "invisible" : "cursor-pointer hover:bg-gray-100"}`}
          onclick={() => {
            if (day) {
              selectDay(day)
            }
          }}
        >
          {day}
        </button>
      {/each}
    </div>
  </div>

  <div class='text-white col-start-2 col-end-3 w-full flex flex-col items-center'>
    <strong class="font-fontInter text-lg font-semibold text-white py-1">Available Times</strong>
    <div class="flex flex-wrap gap-5 justify-center" id='available-times'>
      {#if selectedDate}
        {#each availableTimes as time}
          <button 
            class="flex justify-center items-center rounded-md text-center p-1 2xl:p-2 border-yellow border-2
              {selectedTime && selectedTime === time.start ? "bg-yellow text-white" : ""}"
            onclick={() => {
              selectTime(time.start);
            }}
          >{time.start} - {time.end}</button>
        {/each}
      {:else}
        <div>No day selected</div>
      {/if}
    </div>
  </div>
</div>
<!-- {/each} -->
