'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';

export default function CreatePostPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/posts', { title, content });
      router.push('/posts');
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError('Failed to create post. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter post title"
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-48"
                placeholder="Write your post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="card-actions justify-end mt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
