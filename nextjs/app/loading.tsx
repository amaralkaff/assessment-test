export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
