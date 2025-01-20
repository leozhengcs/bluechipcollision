import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const GOOGLE_CLOUD_CREDENTIALS = {
  "type": process.env.GOOGLE_CLOUD_TYPE,
  "project_id": process.env.GOOGLE_CLOUD_PROJECT_ID,
  "private_key_id": process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
  "private_key": process.env.GOOGLE_CLOUD_PRIVATE_KEY,
  "client_email": process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  "client_id": process.env.GOOGLE_CLOUD_CLIENT_ID,
  "auth_uri": process.env.GOOGLE_CLOUD_AUTH_URI,
  "token_uri": process.env.GOOGLE_CLOUD_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.GOOGLE_CLOUD_AUTH_PROVIDER,
  "client_x509_cert_url": process.env.GOOGLE_CLOUD_CLIENT,
  "universe_domain": process.env.GOOGLE_CLOUD_UNIVERSE_DOMAIN
}
const SERVICE_ACCOUNT_KEY = GOOGLE_CLOUD_CREDENTIALS;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID as string;
const BOOKING_DAYS = 7; // Days you can book ahead
const NOTICE = 2; // 2 Day notice

if (!SERVICE_ACCOUNT_KEY || !GOOGLE_CALENDAR_ID) {
  throw new Error('Environment variables SERVICE_ACCOUNT_KEY and GOOGLE_CALENDAR_ID must be set.');
}

// Function to calculate available slots
function getAvailableSlots(
  workingHours: { start: string; end: string },
  slotDuration: number,
  events: { start: string; end: string }[],
): { start: string; end: string }[] {
  const slots: { start: string; end: string }[] = [];

  const rangeStart = new Date();
  rangeStart.setDate(rangeStart.getDate() + NOTICE);
  const rangeEnd = new Date();
  rangeEnd.setDate(rangeStart.getDate() + BOOKING_DAYS);

  for (
    let currentDate = new Date(rangeStart);
    currentDate <= rangeEnd;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dayStart = new Date(currentDate);
    dayStart.setHours(parseInt(workingHours.start.split(':')[0]), parseInt(workingHours.start.split(':')[1]), 0, 0);

    const dayEnd = new Date(currentDate);
    dayEnd.setHours(parseInt(workingHours.end.split(':')[0]), parseInt(workingHours.end.split(':')[1]), 0, 0);

    // Convert events to Date objects and sort by start time
    const sortedEvents = events
      .filter(
        (event) =>
          new Date(event.start).toDateString() === currentDate.toDateString()
      )
      .map((event) => ({
        start: new Date(event.start),
        end: new Date(event.end),
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    let currentTime = dayStart;

    for (const event of sortedEvents) {
      // Check for gaps before the current event
      while (currentTime < event.start) {
        const gapEnd = new Date(currentTime.getTime() + slotDuration * 60000);
        if (gapEnd <= event.start && gapEnd <= dayEnd) {
          slots.push({
            start: currentTime.toISOString(),
            end: gapEnd.toISOString(),
          });
        }
        currentTime = gapEnd;
      }

      // Move currentTime past the current event
      currentTime = event.end > currentTime ? event.end : currentTime;
    }

    // Check for slots after the last event
    while (currentTime < dayEnd) {
      const slotEnd = new Date(currentTime.getTime() + (slotDuration * 60000));
      if (slotEnd <= dayEnd) {
        slots.push({
          start: currentTime.toISOString(),
          end: slotEnd.toISOString(),
        });
      }
      currentTime = slotEnd;
    }
  }

  return slots;
}

export async function GET(): Promise<Response> {
  // Initialize Google Auth
  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_CLOUD_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const now = new Date();
  const endOfWeek = new Date();
  endOfWeek.setDate(now.getDate() + BOOKING_DAYS);

  // Fetch existing events from Google Calendar
  const res = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: now.toISOString(),
    timeMax: endOfWeek.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  });

  const events = (res.data.items || []).map((event) => ({
    start: event.start?.dateTime as string,
    end: event.end?.dateTime as string,
  }));

  // Define working hours and slot duration
  const workingHours = { start: '8:00', end: '17:00' }; // 8 AM to 5 PM
  const slotDuration = 60;

  // Calculate available slots
  const availableSlots = getAvailableSlots(workingHours, slotDuration, events);

  return new Response(JSON.stringify(availableSlots), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}