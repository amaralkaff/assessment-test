'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Textarea, Button, Card } from '@/components/ui';

interface PostFormProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  submitText: string;
  loading: boolean;
  error?: string;
}

export function PostForm({
  title,
  content,
  onTitleChange,
  onContentChange,
  onSubmit,
  submitText,
  loading,
  error,
}: PostFormProps) {
  const router = useRouter();

  return (
    <form onSubmit={onSubmit}>
      <Card padding="sm">
        <div className="space-y-3">
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Post Title"
            placeholder="Post title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            maxLength={200}
            showCount
            currentLength={title.length}
            required
            disabled={loading}
          />

          <Textarea
            label="Post Content"
            placeholder="Write your post content..."
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            showCount
            currentLength={content.length}
            required
            disabled={loading}
          />

          <div className="divider my-0"></div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {submitText}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}
