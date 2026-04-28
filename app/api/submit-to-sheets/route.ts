import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topValues, scenarioAnswers } = body;

    // Ideally, you would configure a Google Service Account and use the googleapis package,
    // or set up a simple Google Apps Script Web App that acts as an endpoint.
    
    // Example representation of a Google Apps Script Web App webhook URL:
    const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK;

    if (!GOOGLE_SHEET_WEBHOOK_URL) {
      // In development or if unconfigured, just log it.
      console.log('Received data to export to Google Sheets:', {
        topValues: topValues.map((v: any) => v.name).join(', '),
        scenarioAnswers
      });
      return NextResponse.json({ success: true, message: 'Mocked successful save (Webhook not configured).' });
    }

    // If configured, send to webhook
    const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        topValues: topValues.map((v: any) => v.name).join(', '),
        answers: JSON.stringify(scenarioAnswers),
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to save to Google Sheets: ${response.statusText}`);
    }

    return NextResponse.json({ success: true, message: 'Saved to Google Sheets successfully.' });
  } catch (error) {
    console.error('Error submitting to sheets:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
