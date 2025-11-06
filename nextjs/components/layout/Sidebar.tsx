'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/actions/auth';

type User = {
  id: number;
  name: string;
  email: string;
};

export function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/posts', label: 'Posts', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
    { href: '/posts/create', label: 'Create Post', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    )},
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <aside className="bg-base-200 min-h-full w-80 flex flex-col">
        <div className="sticky top-0 z-20 bg-base-200 p-4 shadow-sm">
          <div className="p-3 bg-base-300 rounded-lg">
            <div className="text-sm opacity-70">Logged in as</div>
            <div className="font-semibold truncate">{user.name}</div>
            <div className="text-xs opacity-50 truncate">{user.email}</div>
          </div>
        </div>

        <ul className="p-4 flex-1 space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-base-300 text-base-content font-medium'
                    : 'hover:bg-base-300 text-base-content'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="p-4 mt-auto">
          <form action={handleLogout}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-error hover:text-error-content text-base-content w-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
