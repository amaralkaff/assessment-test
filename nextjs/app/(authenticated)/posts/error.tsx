'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="alert alert-error">
        <div>
          <h2 className="text-lg font-bold">Something went wrong!</h2>
          <p className="text-sm">{error.message}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="btn btn-sm btn-ghost">
            Try again
          </button>
          <a href="/posts" className="btn btn-sm btn-primary">
            Back to Posts
          </a>
        </div>
      </div>
    </div>
  );
}
