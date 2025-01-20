import { google } from "googleapis";
import { toZonedTime, format } from "date-fns-tz";

export async function POST({ request }) {
  try {
    // Parse the request body
    const { start, end, summary } = await request.json();

    // Validate data
    if (!start || !end || !summary) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: start, end, or summary' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Convert start and end times to PST
    const timeZone = "America/Los_Angeles";
    const startPST = toZonedTime(new Date(start), timeZone);
    const endPST = toZonedTime(new Date(end), timeZone);

    // Format the dates back to ISO strings with the timezone
    const formattedStart = format(startPST, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
    const formattedEnd = format(endPST, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });

    // Authenticate with Google API
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.SERVICE_ACCOUNT_KEY,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Create a calendar event
    const event = {
      summary,
      start: { dateTime: formattedStart, timeZone },
      end: { dateTime: formattedEnd, timeZone },
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
