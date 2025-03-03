// app/api/proxy/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = req.url.split('?')[1]; // Extract the full URL of the external resource
  const externalUrl = `https://pl26017529.effectiveratecpm.com/${url}`;

  try {
    const response = await fetch(externalUrl);
    const data = await response.text(); // or response.json() depending on the resource

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/javascript', // or 'application/json', depending on the resource type
      },
    });
  } catch (error) {
    return new NextResponse('Error fetching resource', { status: 500 });
  }
}
