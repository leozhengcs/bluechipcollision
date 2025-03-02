import type { Actions } from './$types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/firebase';
import { fail } from '@sveltejs/kit';
import { google } from "googleapis";
import { supabase } from '$lib/supabase';
import { isEmpty } from '$lib/utils/stringHandlers';
import { RECAPTCHA_SECRET } from '$env/static/private';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];
const VERIFICATION_URL = 'https://www.google.com/recaptcha/api/siteverify';

const GOOGLE_CLOUD_CREDENTIALS = {
  type: process.env.GOOGLE_CLOUD_TYPE,
  project_id: process.env.GOOGLE_CLOUD_PROJECT_ID,
  private_key_id: process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_CLOUD_CLIENT_ID,
  auth_uri: process.env.GOOGLE_CLOUD_AUTH_URI,
  token_uri: process.env.GOOGLE_CLOUD_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGLE_CLOUD_AUTH_PROVIDER,
  client_x509_cert_url: process.env.GOOGLE_CLOUD_CLIENT,
  universe_domain: process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN,
};

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
async function handleFileUploadInsurance(file: File) {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload PDF, JPEG, or PNG');
  }

  const fileName = `${Date.now()}_${file.name}`;
  console.log(fileName);

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

/**
 * Uploads the input file into the damages bucket in Supabase
 * @param file File of type `File`
 * @returns The name of the stored file in Supabase.
 */
async function handleFileUploadDamages(file: File) {
  console.log("Truing to upload: ", file);
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Validate file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload PDF, JPEG, or PNG');
  }

  const fileName = `${Date.now()}_${file.name}`;
  console.log(fileName);

  try {
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('damage-images')
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
  default: async ({ request }) => {
    if (request.method !== 'POST') return;
    let filledFields: Record<string, string> = {};

    try {
      const data = await request.formData();
      const carMake = data.get('make');
      const name = data.get('name');
      const phoneNum = data.get('phoneNum');
      const email = data.get('email');
      const vin = data.get('vin');
      const responsePref = data.get('respondPref');
      const status = 'pending';
      const insuranceForm = data.get('insuranceForm');
      const registrationNum = data.get('registrationNum');
      const damageImages = data.getAll('damagePhotos');
      const token = data.get("token") as string;
      let uploadedFileName = null;
      let uploadedDamageFilesNames: string[] = [];

      let startTime = data.get('startTime');
      let endTime = data.get('endTime');
      const date = data.get('selectedDate');

      const requiredFields = [
        { name: "Name", value: name },
        { name: "Phone Number", value: phoneNum },
        { name: "Email", value: email },
        { name: "VIN", value: vin },
        { name: "Car Make", value: carMake },
        { name: "Booking Date", value: date },
        { name: "Booking Time", value: startTime },
      ];

      if (!insuranceForm && registrationNum && isEmpty(registrationNum as string)) {
        requiredFields.push({ name: "Insurance Information (File or Registration Number)", value: null });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validating Fields
      let missingFields = [];

      if (!name) missingFields.push("Name");
      else filledFields.name = name as string;
      if (!email || !emailRegex.test(email as string)) missingFields.push("Email");
      else filledFields.email = email as string
      if (!phoneNum) missingFields.push("Phone Number");
      else filledFields.phoneNum = phoneNum as string;
      if (!vin) missingFields.push("VIN");
      else filledFields.vin = vin as string;
      if (!carMake) missingFields.push("Car Make");
      else filledFields.carMake = carMake as string;
      if (!date) missingFields.push("Booking Date");
      else filledFields.date = date as string;
      if (!startTime) missingFields.push("Start Time");
      else filledFields.startTime = startTime as string;

      if (missingFields.length > 0) {
        return fail(400, {
          success: false,
          error: "Please fill out all required fields.", // TODO: Implement the custom errors here so that I can update form visually later.
          missingFields,
          values: filledFields
        });
      }

      if (!token) {
        console.log(token);
        return { success: false, error: 'No token provided', values: filledFields }; 
      }

      try {
          const response = await fetch(VERIFICATION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              secret: RECAPTCHA_SECRET,
              response: token.toString()
            })
          });

          const data = await response.json();
          if (!data.success) {
              return fail(400, { success: false, values: filledFields});
          }
      } catch (error) {
          return fail(400, { success: false, error: 'Captcha validation failed', values: filledFields });
      }

      // Trying to upload insurance form
      if (insuranceForm instanceof File && insuranceForm.size > 0) {
        try {
          uploadedFileName = await handleFileUploadInsurance(insuranceForm);
          console.log(uploadedFileName);
        } catch (error) {
          console.log("Uploading insurance failed");
          return fail(400, {
            success: false, 
            error: "File upload failed", 
            values: filledFields
          });
        }
      }

      for (const file of damageImages) {
        if (file instanceof File && file.size > 0) {
          try {
            const fileName = await handleFileUploadDamages(file);
            uploadedDamageFilesNames.push(fileName);
          } catch (err) {
            console.log("Uploading damages failed");
            return fail(400, { success: false, error: "File upload failed", values: filledFields });
          }
        }
      }

      await addDoc(collection(db, 'forms'), {
        carMake,
        name,
        phoneNum,
        email,
        vin,
        responsePref,
        status,
        insuranceForm: uploadedFileName || null,
        registrationNum: registrationNum,
        damageImages: uploadedDamageFilesNames,
      });

      startTime = formatTime(startTime as string);
      endTime = formatTime(endTime as string);

      const timeZone = "America/Los_Angeles";

      const startDateObject = new Date(`${date}T${startTime}:00`);
      const endDateObject = new Date(`${date}T${endTime}:00`);

      const event = {
        start: { dateTime: startDateObject.toISOString(), timeZone },
        end: { dateTime: endDateObject.toISOString(), timeZone },
        summary: 'Customer Booking',
        description: `
Customer Name: ${name || 'N/A'}
Customer Phone Number: ${phoneNum || 'N/A'}
Customer Email: ${email || 'N/A'}
Customer Response Preference: ${responsePref || 'N/A'}
Car Make: ${carMake || 'N/A'}
VIN: ${vin || 'N/A'}
      `};

      // Authenticate with Google API
      const auth = new google.auth.GoogleAuth({
        credentials: GOOGLE_CLOUD_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/calendar'],
      });

      const calendar = google.calendar({ version: 'v3', auth });

      const res = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: event,
      });

      if (res.status !== 200) {
        console.log("calendar insert failed");
        return fail(500, { success: false, error: "Failed to book slot", values: filledFields });
      }

    } catch (error) {
        console.error('Error updating document:', error);
        return fail(400, { success: false, error: "Failed to process booking", values : filledFields });
    }

    return {success: true, message: 'Booking processed successfully'};
  },
} satisfies Actions;
