function ErrorMessage({ message, id = "error-message" }) {
  if (!message) {
    return null;
  }

  return (
    <div id={id} className="error-message" role="alert" aria-live="assertive">
      {message}
    </div>
  );
}

export default ErrorMessage;
