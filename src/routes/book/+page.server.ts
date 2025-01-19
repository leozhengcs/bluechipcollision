import type { Actions } from './$types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { redirect } from '@sveltejs/kit';
import { bookSlot } from '$lib/utils/eventHandlers';
import type { Slot } from '$lib/types/calendar'

function formatTime(time: string): string {
    // Check if time contains AM/PM
    const isPM = time.toLowerCase().includes("pm");
    const isAM = time.toLowerCase().includes("am");

    // Remove AM/PM and trim whitespace
    time = time.replace(/(am|pm)/i, "").trim();

    // Split into hours and minutes
    let [hours, minutes] = time.split(":").map((val) => val.trim());

    let parsedHours = parseInt(hours, 10);
    let parsedMinutes = parseInt(minutes, 10);

    // Validate time
    if (
        isNaN(parsedHours) ||
        isNaN(parsedMinutes) ||
        parsedHours < 0 ||
        parsedHours > 12 ||
        parsedMinutes < 0 ||
        parsedMinutes >= 60
    ) {
        throw new Error("Invalid time format");
    }

    // Convert hours to 24-hour format if AM/PM is provided
    if (isPM && parsedHours !== 12) {
        parsedHours += 12; // Convert PM hours to 24-hour
    } else if (isAM && parsedHours === 12) {
        parsedHours = 0; // Convert 12 AM to 00
    }

    // Return the time in HH:mm format
    return `${parsedHours.toString().padStart(2, "0")}:${parsedMinutes
        .toString()
        .padStart(2, "0")}`;
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

            const docRef = await addDoc(collection(db, 'forms'), {
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
            const endDateObject = new Date(`${date}T${endTime}:00`)

            await bookSlot({
                start: startDateObject.toISOString(),
                end: endDateObject.toISOString(),
                summary: "Customer Booking"
            } as Slot, fetch)
        } catch (error) {
            console.error("Error updating document:", error);
        }
        throw redirect(303, '/confirm');
    }
} satisfies Actions;

