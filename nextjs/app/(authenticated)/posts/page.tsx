'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/lib/useUser';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import type { Post, PaginationMeta } from '@/types';
import { PageContainer, PageHeader } from '@/components/layout';
import { Modal, Button } from '@/components/ui';
import { PostCard } from '@/components/posts';

export default function PostsPage() {
  const { user, loading: userLoading } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!userLoading) {
      fetchPosts(currentPage);
    }
  }, [userLoading, currentPage]);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const response = await apiClient.get<any>(`/posts?page=${page}`);
      setPosts(response.data);
      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id: number) => {
    setDeletePostId(id);
    setShowDeleteModal(true);
    setDeleteError('');
  };

  const handleDelete = async () => {
    if (!deletePostId) return;

    setDeleting(true);
    setDeleteError('');
    try {
      await apiClient.delete(`/posts/${deletePostId}`);
      setShowDeleteModal(false);
      setDeletePostId(null);
      setDeleting(false);
      fetchPosts(currentPage);
    } catch (error) {
      setDeleteError('Failed to delete post. Please try again.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Community Posts"
        description={
          pagination
            ? `${pagination.total} ${pagination.total === 1 ? 'post' : 'posts'} shared by the community`
            : 'Loading posts...'
        }
      >
        <Link href="/posts/create">
          <Button size="sm" className="gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Post
          </Button>
        </Link>
      </PageHeader>

      {posts.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 opacity-20 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">No Posts Yet</h3>
            <p className="text-base-content/70 mb-5 max-w-md text-sm">
              Be the first to share your thoughts with the community!
            </p>
            <Link href="/posts/create">
              <Button size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create Your First Post
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-5">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={user?.id}
                onDelete={openDeleteModal}
              />
            ))}
          </div>

          {pagination && pagination.last_page > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join shadow-lg">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="join-item btn btn-sm btn-disabled">
                  Page {pagination.current_page} of {pagination.last_page}
                </button>
                <button
                  className="join-item btn btn-sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.last_page}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletePostId(null);
          setDeleteError('');
        }}
        title="Delete Post"
        confirmText="Delete"
        confirmVariant="error"
        onConfirm={handleDelete}
        loading={deleting}
        error={deleteError}
      >
        <p>Are you sure you want to delete this post? This action cannot be undone.</p>
      </Modal>
    </PageContainer>
  );
}
