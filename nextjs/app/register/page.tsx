'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, passwordConfirmation);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center justify-center text-2xl mb-4">
              Sign Up
            </h2>

            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
              </div>
            </form>

            <div className="divider">OR</div>

            <p className="text-center">
              Already have an account?{' '}
              <Link href="/login" className="link link-primary">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
