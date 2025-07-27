export function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      <p className="ml-4">Loading words...</p>
    </div>
  );
}
