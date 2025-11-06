'use server'

import { loginWithLaravel, registerWithLaravel, logoutFromLaravel } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export async function login(_prevState: unknown, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    // Authenticate with Laravel backend
    const { user, laravelToken } = await loginWithLaravel(email, password)

    // Store session data in httpOnly cookies
    const cookieStore = await cookies()

    // Store Laravel JWT token for API requests
    cookieStore.set('laravel_token', laravelToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    // Store user data for client access
    cookieStore.set('session_user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

  } catch (error: any) {
    return { error: error.message || 'Login failed. Please check your connection.' }
  }

  redirect('/posts')
}

export async function register(_prevState: unknown, formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const password_confirmation = formData.get('password_confirmation') as string

  if (password !== password_confirmation) {
    return { error: 'Passwords do not match' }
  }

  try {
    // Register with Laravel backend
    const { user, laravelToken } = await registerWithLaravel(name, email, password, password_confirmation)

    // Store session data in httpOnly cookies
    const cookieStore = await cookies()

    // Store Laravel JWT token
    cookieStore.set('laravel_token', laravelToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    // Store user data
    cookieStore.set('session_user', JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

  } catch (error: any) {
    return { error: error.message || 'Registration failed. Please check your connection.' }
  }

  redirect('/posts')
}

export async function logout() {
  // Get Laravel token
  const cookieStore = await cookies()
  const laravelToken = cookieStore.get('laravel_token')?.value

  if (laravelToken) {
    try {
      await logoutFromLaravel(laravelToken)
    } catch (error) {
    }
  }

  cookieStore.delete('laravel_token')
  cookieStore.delete('session_user')

  redirect('/login')
}
