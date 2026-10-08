function Button({
  children,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`portal-button ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
