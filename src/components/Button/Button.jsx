import "./Button.css";

function Button({ children, onClick, type = "button", icon: Icon, className}) {
  return (
    <button   className={`button ${className || ""}`} type={type} onClick={onClick}>
      {Icon && <Icon className="button-icon" />}
      {children}
    </button>
  );
}

export default Button;
