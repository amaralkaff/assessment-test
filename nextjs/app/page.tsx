import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const sessionUser = cookieStore.get('session_user')?.value;

  if (sessionUser) {
    redirect('/posts');
  } else {
    redirect('/login');
  }
}
