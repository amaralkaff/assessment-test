'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';

interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
}

export default function EditPostPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && params.id) {
      fetchPost();
    }
  }, [user, params.id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/posts/${params.id}`);
      const fetchedPost = response.data.post;

      if (fetchedPost.user.id !== user?.id) {
        setError('Unauthorized to edit this post');
        return;
      }

      setPost(fetchedPost);
      setTitle(fetchedPost.title);
      setContent(fetchedPost.content);
    } catch (error: any) {
      setError('Failed to load post');
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await api.put(`/posts/${params.id}`, { title, content });
      router.push(`/posts/${params.id}`);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) {
        const errorMessages = Object.values(errors).flat().join(', ');
        setError(errorMessages);
      } else {
        setError('Failed to update post. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </>
    );
  }

  if (error && !post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

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
                className={`btn btn-primary ${submitting ? 'loading' : ''}`}
                disabled={submitting}
              >
                {submitting ? 'Updating...' : 'Update Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
