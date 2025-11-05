'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export default function PostsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchPosts(currentPage);
    }
  }, [user, currentPage]);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await api.get(`/posts?page=${page}`);
      setPosts(response.data.data);
      setPagination({
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        per_page: response.data.per_page,
        total: response.data.total,
      });
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${id}`);
      fetchPosts(currentPage);
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Posts</h1>
          <Link href="/posts/create" className="btn btn-primary">
            Create New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="alert alert-info">
            <span>No posts found. Create your first post!</span>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {posts.map((post) => (
                <div key={post.id} className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{post.title}</h2>
                    <p className="text-gray-600 line-clamp-3">{post.content}</p>
                    <div className="text-sm text-gray-500 mt-2">
                      By {post.user.name} on {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div className="card-actions justify-end mt-4">
                      <Link href={`/posts/${post.id}`} className="btn btn-sm btn-ghost">
                        View
                      </Link>
                      {user?.id === post.user.id && (
                        <>
                          <Link href={`/posts/${post.id}/edit`} className="btn btn-sm btn-primary">
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="btn btn-sm btn-error"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pagination && pagination.last_page > 1 && (
              <div className="flex justify-center mt-8">
                <div className="join">
                  <button
                    className="join-item btn"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    «
                  </button>
                  <button className="join-item btn">
                    Page {pagination.current_page} of {pagination.last_page}
                  </button>
                  <button
                    className="join-item btn"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === pagination.last_page}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
