// components/LoadingSpinner.js
export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-brown mx-auto mb-4"></div>
        <p className="text-neutral-600">{message}</p>
      </div>
    </div>
  );
}
