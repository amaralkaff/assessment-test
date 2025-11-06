'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="alert alert-error max-w-md">
        <div>
          <h2 className="text-lg font-bold">Application Error</h2>
          <p className="text-sm">{error.message}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="btn btn-sm btn-ghost">
            Try again
          </button>
          <a href="/" className="btn btn-sm btn-primary">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
