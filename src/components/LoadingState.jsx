function LoadingState() {
  return (
    <div
      className="loading-state"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <span className="loading-indicator" aria-hidden="true" />

      <span>Loading your information...</span>
    </div>
  );
}

export default LoadingState;
