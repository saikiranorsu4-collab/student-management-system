function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) {

  const variants = {

    primary:
      "bg-purple-600 hover:bg-purple-700",

    secondary:
      "bg-blue-500 hover:bg-blue-600",

    danger:
      "bg-red-500 hover:bg-red-600",

    success:
      "bg-green-500 hover:bg-green-600",

  };

  return (

    <button
      type={type}
      onClick={onClick}
      className={`
        px-5 py-3
        rounded-xl
        font-semibold
        transition-all
        text-white
        ${variants[variant]}
        ${className}
      `}
    >

      {children}

    </button>

  );

}

export default Button;