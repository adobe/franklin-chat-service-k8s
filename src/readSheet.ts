import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID as string;
const GOOGLE_SHEET_RANGE = 'Sheet1!A2:B';

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string;
const GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string;

export const credentials = {
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
  private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY as string,
};

export async function readSheet() {
  console.log('\nReading Email to Slack Channel Mapping from Google Sheet');
  console.log(`Google Sheet ID: ${GOOGLE_SHEET_ID}`);
  console.log(`Google Sheet Range: ${GOOGLE_SHEET_RANGE}`);
  console.log(`Google Sheet Client Email: ${credentials.client_email}\n`);

  const jwt = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth: jwt });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: GOOGLE_SHEET_RANGE,
  });

  const rows = response.data.values;
  if (rows && rows.length) {
    return new Map<string, string>(rows.map(([key, value]) => [key, value]));
  }
  console.log('No data found.');
  return new Map<string, string>();
}