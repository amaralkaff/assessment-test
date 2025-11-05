'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function PostDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      setPost(response.data.post);
    } catch (error: any) {
      setError('Failed to load post');
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${params.id}`);
      router.push('/posts');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
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

  if (error || !post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="alert alert-error">
            <span>{error || 'Post not found'}</span>
          </div>
          <Link href="/posts" className="btn btn-ghost mt-4">
            Back to Posts
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-4">
          <Link href="/posts" className="btn btn-ghost btn-sm">
            ← Back to Posts
          </Link>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl mb-4">{post.title}</h1>

            <div className="text-sm text-gray-500 mb-6">
              <p>By {post.user.name}</p>
              <p>Posted on {new Date(post.created_at).toLocaleString()}</p>
              {post.created_at !== post.updated_at && (
                <p>Updated on {new Date(post.updated_at).toLocaleString()}</p>
              )}
            </div>

            <div className="prose max-w-none mb-6">
              <p className="whitespace-pre-wrap">{post.content}</p>
            </div>

            {user?.id === post.user.id && (
              <div className="card-actions justify-end">
                <Link href={`/posts/${post.id}/edit`} className="btn btn-primary">
                  Edit Post
                </Link>
                <button onClick={handleDelete} className="btn btn-error">
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
