import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ACCOUNT_KEY = process.env.SERVICE_ACCOUNT_KEY as string;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID as string;

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
  const dayStart = new Date();
  dayStart.setHours(parseInt(workingHours.start.split(':')[0]));
  dayStart.setMinutes(parseInt(workingHours.start.split(':')[1]));

  const dayEnd = new Date();
  dayEnd.setHours(parseInt(workingHours.end.split(':')[0]));
  dayEnd.setMinutes(parseInt(workingHours.end.split(':')[1]));

  // Convert events to Date objects and sort by start time
  const sortedEvents = events
    .map((event) => ({
      start: new Date(event.start),
      end: new Date(event.end),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  let currentTime = dayStart;

  for (const event of sortedEvents) {
    // Check for gaps before the current event
    if (currentTime < event.start) {
      let gapStart = currentTime;
      while (gapStart < event.start && gapStart < dayEnd) {
        const gapEnd = new Date(gapStart.getTime() + slotDuration * 60000);
        if (gapEnd <= event.start && gapEnd <= dayEnd) {
          slots.push({
            start: gapStart.toISOString(),
            end: gapEnd.toISOString(),
          });
        }
        gapStart = gapEnd;
      }
    }
    currentTime = event.end > currentTime ? event.end : currentTime;
  }

  // Check for slots after the last event
  while (currentTime < dayEnd) {
    const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
    if (slotEnd <= dayEnd) {
      slots.push({
        start: currentTime.toISOString(),
        end: slotEnd.toISOString(),
      });
    }
    currentTime = slotEnd;
  }

  return slots;
}

export async function GET(): Promise<Response> {
  // Initialize Google Auth
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const now = new Date();
  const endOfWeek = new Date();
  endOfWeek.setDate(now.getDate() + 7); // Fetch slots for the next 7 days

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
  const workingHours = { start: '08:00', end: '17:00' }; // Example: 9 AM to 5 PM
  const slotDuration = 60; // 30 minutes

  // Calculate available slots
  const availableSlots = getAvailableSlots(workingHours, slotDuration, events);

  return new Response(JSON.stringify(availableSlots), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
