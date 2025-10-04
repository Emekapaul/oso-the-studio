import { NextResponse } from 'next/server';

// Simple credential verification for demo purposes
const ADMIN_CREDENTIALS = {
  email: 'admin@osothestudio.com',
  password: 'admin123'
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Verify credentials (simple comparison for demo)
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate simple token (base64 encoded data for demo)
    const tokenData = {
      email: email,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64');

    // Create response with token
    const response = NextResponse.json({
      success: true,
      token: token,
      message: 'Login successful'
    });

    // Set cookie
    response.cookies.set('admin_token', token, {
      httpOnly: false, // Allow client-side access for WebContainer compatibility
      secure: false, // Set to true in production with HTTPS
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}