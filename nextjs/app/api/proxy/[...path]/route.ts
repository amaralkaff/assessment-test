import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Use server-side API_URL for API proxy
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, 'GET', params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, 'POST', params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, 'PUT', params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return handleRequest(request, 'DELETE', params);
}

async function handleRequest(
  request: NextRequest,
  method: string,
  params: Promise<{ path: string[] }>
) {
  const { path } = await params;
  const endpoint = path.join('/');

  // Get Laravel token from httpOnly cookie
  const cookieStore = await cookies();
  const laravelToken = cookieStore.get('laravel_token')?.value;

  // Build headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (laravelToken) {
    headers['Authorization'] = `Bearer ${laravelToken}`;
  }

  // Build request options
  const options: RequestInit = {
    method,
    headers,
  };

  // Add body for POST/PUT requests
  if (method === 'POST' || method === 'PUT') {
    const body = await request.text();
    if (body) {
      options.body = body;
    }
  }

  try {
    const response = await fetch(`${API_URL}/${endpoint}`, options);

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Request failed' },
      { status: 500 }
    );
  }
}
