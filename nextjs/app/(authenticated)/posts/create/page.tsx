'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { PageContainer, PageHeader } from '@/components/layout';
import { Breadcrumbs } from '@/components/ui';
import { PostForm } from '@/components/forms';

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.post('/posts', { title, content });
      router.push('/posts');
    } catch (err: any) {
      setError(err.message || 'Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="mb-2">
        <Breadcrumbs
          items={[
            { label: 'Posts', href: '/posts' },
            { label: 'Create Post' },
          ]}
        />
      </div>

      <PageHeader
        title="Create New Post"
        description="Share your thoughts with the community"
      />

      <PostForm
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        submitText="Publish Post"
        loading={loading}
        error={error}
      />
    </PageContainer>
  );
}
