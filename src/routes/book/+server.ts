import { google } from "googleapis";

export async function POST({ request }) {
  try {
    // Use already-parsed data passed via locals (or context)
    const { start, end, summary } = await request.json();

    // Validate data
    if (!start || !end || !summary) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: start, end, or summary' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Authenticate with Google API
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.SERVICE_ACCOUNT_KEY,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Create a calendar event
    const event = {
      summary,
      start: { dateTime: start },
      end: { dateTime: end },
      timeZone: 'America/Los_Angeles',
    };

    const res = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    // Respond with event details
    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error booking slot:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to book slot' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}