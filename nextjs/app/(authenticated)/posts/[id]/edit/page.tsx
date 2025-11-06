'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/lib/useUser';
import { useRouter, useParams } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import Link from 'next/link';
import type { Post } from '@/types';
import { PageContainer, PageHeader } from '@/components/layout';
import { Breadcrumbs } from '@/components/ui';
import { PostForm } from '@/components/forms';

export default function EditPostPage() {
  const { user, loading: userLoading } = useUser();
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!userLoading && params.id) {
      fetchPost();
    }
  }, [userLoading, params.id]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get<any>(`/posts/${params.id}`);
      const fetchedPost = response.post;

      if (fetchedPost.user.id !== user?.id) {
        setError('Unauthorized to edit this post');
        return;
      }

      setPost(fetchedPost);
      setTitle(fetchedPost.title);
      setContent(fetchedPost.content);
    } catch (error: any) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await apiClient.put(`/posts/${params.id}`, { title, content });
      router.push(`/posts/${params.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to update post. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error && !post) {
    return (
      <PageContainer>
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mb-2">
        <Breadcrumbs
          items={[
            { label: 'Posts', href: '/posts' },
            { label: post?.title || 'Post', href: `/posts/${params.id}` },
            { label: 'Edit' },
          ]}
        />
      </div>

      <PageHeader
        title="Edit Post"
        description="Update your post content"
      />

      <PostForm
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        submitText="Save Changes"
        loading={submitting}
        error={error}
      />
    </PageContainer>
  );
}
