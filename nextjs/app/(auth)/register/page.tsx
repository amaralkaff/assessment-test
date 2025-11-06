import Link from 'next/link';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl border-2 border-base-300">
        <div className="card-body items-center text-center p-6">
          <h2 className="card-title text-2xl mb-1">Sign Up</h2>
          <p className="text-base-content/60 mb-4 text-sm">Create your account to get started</p>

          <RegisterForm />

          <div className="divider my-3 text-xs">OR</div>

          <p className="text-xs">
            Already have an account?{' '}
            <Link href="/login" className="link link-primary font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
