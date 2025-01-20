import { google } from 'googleapis';
import { toZonedTime, format } from 'date-fns-tz';
import dotenv from 'dotenv';

dotenv.config();

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
const SERVICE_ACCOUNT_KEY = GOOGLE_CLOUD_CREDENTIALS;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID as string;
const BOOKING_DAYS = 7; // Days you can book ahead
const NOTICE = 2; // 2 Day notice
const TIME_ZONE = 'America/Los_Angeles';

if (!SERVICE_ACCOUNT_KEY || !GOOGLE_CALENDAR_ID) {
  throw new Error('Environment variables SERVICE_ACCOUNT_KEY and GOOGLE_CALENDAR_ID must be set.');
}

function getAvailableSlots(
  workingHours: { start: string; end: string },
  slotDuration: number,
  events: { start: string; end: string }[],
): { start: string; end: string }[] {
  const slots: { start: string; end: string }[] = [];
  const rangeStart = toZonedTime(new Date(), TIME_ZONE);
  rangeStart.setDate(rangeStart.getDate() + NOTICE);

  const rangeEnd = new Date(rangeStart);
  rangeEnd.setDate(rangeStart.getDate() + BOOKING_DAYS);

  for (
    let currentDate = new Date(rangeStart);
    currentDate <= rangeEnd;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dayStart = toZonedTime(new Date(currentDate), TIME_ZONE);
    dayStart.setHours(
      parseInt(workingHours.start.split(':')[0]),
      parseInt(workingHours.start.split(':')[1]),
      0,
      0
    );

    const dayEnd = toZonedTime(new Date(currentDate), TIME_ZONE);
    dayEnd.setHours(
      parseInt(workingHours.end.split(':')[0]),
      parseInt(workingHours.end.split(':')[1]),
      0,
      0
    );

    const sortedEvents = events
      .filter(
        (event) =>
          toZonedTime(new Date(event.start), TIME_ZONE).toDateString() ===
          dayStart.toDateString()
      )
      .map((event) => ({
        start: toZonedTime(new Date(event.start), TIME_ZONE),
        end: toZonedTime(new Date(event.end), TIME_ZONE),
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    let currentTime = dayStart;

    for (const event of sortedEvents) {
      while (currentTime < event.start) {
        const gapEnd = new Date(currentTime.getTime() + slotDuration * 60000);
        if (gapEnd <= event.start && gapEnd <= dayEnd) {
          slots.push({
            start: format(currentTime, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: TIME_ZONE }),
            end: format(gapEnd, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: TIME_ZONE }),
          });
        }
        currentTime = gapEnd;
      }

      currentTime = event.end > currentTime ? event.end : currentTime;
    }

    while (currentTime < dayEnd) {
      const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);
      if (slotEnd <= dayEnd) {
        slots.push({
          start: format(currentTime, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: TIME_ZONE }),
          end: format(slotEnd, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: TIME_ZONE }),
        });
      }
      currentTime = slotEnd;
    }
  }

  return slots;
}

export async function GET(): Promise<Response> {
  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_CLOUD_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const now = toZonedTime(new Date(), TIME_ZONE);
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + BOOKING_DAYS);

  const res = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: now.toISOString(),
    timeMax: endOfWeek.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    timeZone: TIME_ZONE,
  });

  const events = (res.data.items || []).map((event) => ({
    start: event.start?.dateTime as string,
    end: event.end?.dateTime as string,
  }));

  const workingHours = { start: '8:00', end: '17:00' };
  const slotDuration = 60;

  const availableSlots = getAvailableSlots(workingHours, slotDuration, events);

  return new Response(JSON.stringify(availableSlots), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
