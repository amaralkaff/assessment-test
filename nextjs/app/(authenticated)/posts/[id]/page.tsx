'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/lib/useUser';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import type { Post } from '@/types';
import { PageContainer } from '@/components/layout';
import { Breadcrumbs, Card, Modal, Button } from '@/components/ui';
import { PostHeader } from '@/components/posts';

export default function PostDetailPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!userLoading && params.id) {
      fetchPost();
    }
  }, [userLoading, params.id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<any>(`/posts/${params.id}`);
      setPost(response.post);
    } catch (error: any) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      await apiClient.delete(`/posts/${params.id}`);
      setShowDeleteModal(false);
      router.push('/posts');
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

  if (error || !post) {
    return (
      <PageContainer>
        <div className="alert alert-error">
          <span>{error || 'Post not found'}</span>
        </div>
        <Link href="/posts" className="btn btn-ghost mt-4">
          Back to Posts
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-4">
        <Breadcrumbs
          items={[
            { label: 'Posts', href: '/posts' },
            { label: post.title },
          ]}
        />
      </div>

      <article>
        <Card padding="lg">
          <PostHeader post={post} />

          <div className="divider my-3"></div>

          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap text-base-content/90 leading-relaxed text-base">
              {post.content}
            </p>
          </div>

          {user?.id === post.user.id && (
            <>
              <div className="divider my-3"></div>
              <div className="flex gap-2 justify-end">
                <Link href={`/posts/${post.id}/edit`}>
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="error-outline"
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </Button>
              </div>
            </>
          )}
        </Card>
      </article>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
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
