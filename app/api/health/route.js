// In the "Health checks" tab, set the path to /api/health
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'OK' }, { status: 200 });
}