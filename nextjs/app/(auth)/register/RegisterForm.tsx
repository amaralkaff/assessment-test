'use client';

import { register } from '@/app/actions/auth';
import { useActionState } from 'react';
import { Button } from '@/components/ui';
import { FormError } from '@/components/forms/FormError';

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, undefined);

  return (
    <>
      {state?.error && <FormError message={state.error} />}

      <form action={formAction} className="w-full space-y-3">
        <div className="form-control w-full">
          <label htmlFor="name" className="text-sm font-medium text-base-content mb-1.5 block text-left">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="input input-bordered w-full h-10 text-sm bg-base-200 border-2 focus:border-primary focus:bg-base-100 transition-all px-3"
            placeholder="Full name"
            required
            disabled={isPending}
            autoComplete="name"
          />
        </div>

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
          <div className="flex justify-between items-baseline mb-1.5">
            <label htmlFor="password" className="text-sm font-medium text-base-content text-left">
              Password
            </label>
            <span className="text-xs opacity-70">Min 6 characters</span>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            className="input input-bordered w-full h-10 text-sm bg-base-200 border-2 focus:border-primary focus:bg-base-100 transition-all px-3"
            placeholder="Password"
            required
            minLength={6}
            disabled={isPending}
            autoComplete="new-password"
          />
        </div>

        <div className="form-control w-full">
          <label htmlFor="password_confirmation" className="text-sm font-medium text-base-content mb-1.5 block text-left">
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            className="input input-bordered w-full h-10 text-sm bg-base-200 border-2 focus:border-primary focus:bg-base-100 transition-all px-3"
            placeholder="Confirm password"
            required
            minLength={6}
            disabled={isPending}
            autoComplete="new-password"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-10 text-sm font-semibold mt-4"
          loading={isPending}
        >
          {isPending ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>
    </>
  );
}
