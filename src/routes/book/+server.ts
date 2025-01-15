import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();

export async function POST({ request }) {
  const { start, end, summary } = await request.json();

  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.SERVICE_ACCOUNT_KEY,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary,
    start: { dateTime: start },
    end: { dateTime: end },
  };

  const res = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: event,
  });

  return new Response(JSON.stringify(res.data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
