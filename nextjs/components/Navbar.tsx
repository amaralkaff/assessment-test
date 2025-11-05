'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link href={user ? "/posts" : "/"} className="btn btn-ghost text-xl">
          Assessment App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {user ? (
            <>
              <li>
                <Link href="/posts">Posts</Link>
              </li>
              <li>
                <Link href="/posts/create">Create Post</Link>
              </li>
              <li>
                <span className="font-semibold">{user.name}</span>
              </li>
              <li>
                <button onClick={logout} className="btn btn-sm btn-outline">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
