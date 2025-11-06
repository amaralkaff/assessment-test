'use client';

import { login } from '@/app/actions/auth';
import { useActionState } from 'react';
import { Button } from '@/components/ui';
import { FormError } from '@/components/forms/FormError';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <>
      {state?.error && <FormError message={state.error} />}

      <form action={formAction} className="w-full space-y-4">
        <div className="form-control w-full">
          <label htmlFor="email" className="text-sm font-medium text-base-content mb-1.5 block text-left">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="input input-bordered w-full h-10 text-sm bg-base-200 border-2 focus:border-primary focus:bg-base-100 transition-all px-3"
            placeholder="Email"
            required
            disabled={isPending}
            autoComplete="email"
          />
        </div>

        <div className="form-control w-full">
          <label htmlFor="password" className="text-sm font-medium text-base-content mb-1.5 block text-left">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="input input-bordered w-full h-10 text-sm bg-base-200 border-2 focus:border-primary focus:bg-base-100 transition-all px-3"
            placeholder="Password"
            required
            disabled={isPending}
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold mt-5"
          loading={isPending}
        >
          {isPending ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </>
  );
}
