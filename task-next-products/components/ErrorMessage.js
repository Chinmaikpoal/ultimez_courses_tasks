export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon">!</div>
      <h2 className="error-title">Unable to Load Products</h2>
      <p className="error-message">
        {message || 'We encountered an unexpected issue while retrieving the product list. Please check your internet connection and try again.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-retry"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
