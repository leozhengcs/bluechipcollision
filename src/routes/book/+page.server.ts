import type { Actions } from './$types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { fail, redirect } from '@sveltejs/kit';
import type { Slot } from '$lib/types/calendar';
import { supabase } from '$lib/supabase';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

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

/**
 * Uploads the input file into the insurance bucket in Supabase
 * @param file File of type `File`
 * @returns The name of the stored file in Supabase.
 */
async function handleFileUpload(file: File) {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload PDF, JPEG, or PNG');
  }

  const fileName = `${Date.now()}_${file.name}`;

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('insurance-forms')
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error('File upload failed');
    }
    
    return fileName;
  } catch (error) {
    console.error('Storage error:', error);
    throw new Error('File storage failed');
  }
}

export const actions = {
  default: async ({ request, fetch }) => {
    if (request.method !== 'POST') return;

    try {
      const data = await request.formData();
      const carMake = data.get('carMake');
      const name = data.get('name');
      const phoneNum = data.get('phoneNum');
      const email = data.get('email');
      const vin = data.get('vin');
      const responsePref = data.get('respondPref');
      const status = 'pending';
      const insuranceForm = data.get('insuranceForm');
      const registrationNum = data.get('registrationNum');
      let uploadedFileName = null;


      if (insuranceForm instanceof File && insuranceForm.size > 0) {
        try {
          uploadedFileName = await handleFileUpload(insuranceForm);
        } catch (error) {
          return fail(400, {
            error: error instanceof Error ? error.message : 'File upload failed',
            fields: Object.fromEntries(data.entries()),
          });
        }
      }

      // Check if they have at least an insurance form or registration number

      await addDoc(collection(db, 'forms'), {
        carMake,
        name,
        phoneNum,
        email,
        vin,
        responsePref,
        status,
        insuranceForm: uploadedFileName || null,
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

    } catch (error) {
        console.error('Error updating document:', error);
        throw redirect(303, '/book');
    }
    return redirect(303, '/confirm');
  },
} satisfies Actions;
