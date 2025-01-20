import type { Actions } from './$types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import type { Slot } from '$lib/types/calendar';

function formatTime(time: string): string {
  const isPM = time.toLowerCase().includes('pm');
  const isAM = time.toLowerCase().includes('am');
  time = time.replace(/(am|pm)/i, '').trim();
  let [hours, minutes] = time.split(':').map((val) => val.trim());
  let parsedHours = parseInt(hours, 10);
  let parsedMinutes = parseInt(minutes, 10);

  if (
    isNaN(parsedHours) ||
    isNaN(parsedMinutes) ||
    parsedHours < 0 ||
    parsedHours > 12 ||
    parsedMinutes < 0 ||
    parsedMinutes >= 60
  ) {
    throw new Error('Invalid time format');
  }

  if (isPM && parsedHours !== 12) parsedHours += 12;
  else if (isAM && parsedHours === 12) parsedHours = 0;

  return `${parsedHours.toString().padStart(2, '0')}:${parsedMinutes
    .toString()
    .padStart(2, '0')}`;
}

export const actions = {
  default: async ({ request, fetch }) => {
    try {
      const data = await request.formData();
      const carMake = data.get('carMake');
      const name = data.get('name');
      const phoneNum = data.get('phoneNum');
      const email = data.get('email');
      const vin = data.get('vin');
      const responsePref = data.get('respondPref');
      const status = 'pending';

      await addDoc(collection(db, 'forms'), {
        carMake,
        name,
        phoneNum,
        email,
        vin,
        responsePref,
        status,
      });

      let startTime = data.get('startTime');
      let endTime = data.get('endTime');
      if (!startTime || !endTime) {
        return;
      }

      startTime = formatTime(startTime as string);
      endTime = formatTime(endTime as string);
      const date = data.get('selectedDate');

      const startDateObject = new Date(`${date}T${startTime}:00`);
      const endDateObject = new Date(`${date}T${endTime}:00`);

      const event = {
        start: startDateObject.toISOString(),
        end: endDateObject.toISOString(),
        summary: 'Customer Booking',
      } as Slot;

      const response = await fetch('/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error from /book:', error);
        throw new Error('Failed to process booking');
      }

      throw redirect(303, '/confirm');
    } catch (error) {
      console.error('Error updating document:', error);
      throw redirect(303, '/book');
    }
  },
} satisfies Actions;
