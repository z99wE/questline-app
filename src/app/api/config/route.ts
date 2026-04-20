import { NextResponse } from 'next/server';

/**
 * GET /api/config
 * Returns the Google Maps API key at runtime.
 * This avoids build-time environment variable issues in Cloud Run.
 */
export async function GET() {
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!mapsKey) {
    return NextResponse.json({ error: "Maps API key not configured on server." }, { status: 500 });
  }

  return NextResponse.json({ mapsKey });
}
