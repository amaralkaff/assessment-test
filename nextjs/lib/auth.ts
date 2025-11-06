// Use server-side API_URL for server actions, fallback to NEXT_PUBLIC for local dev
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function loginWithLaravel(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }

    const data = await response.json();
    return {
      user: data.user,
      laravelToken: data.access_token,
    };
  } catch (error) {
    throw error;
  }
}

export async function registerWithLaravel(
  name: string,
  email: string,
  password: string,
  password_confirmation: string
) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    });

    if (!response.ok) {
      const error = await response.json();
      if (error.errors) {
        const errorMessages = Object.values(error.errors).flat().join(', ');
        throw new Error(errorMessages);
      }
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return {
      user: data.user,
      laravelToken: data.access_token,
    };
  } catch (error) {
    throw error;
  }
}

export async function logoutFromLaravel(laravelToken: string) {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${laravelToken}`,
        'Accept': 'application/json',
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
}
