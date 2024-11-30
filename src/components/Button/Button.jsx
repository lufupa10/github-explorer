import "./Button.css";

function Button({ children, onClick, type = "button", icon: Icon }) {
  return (
    <button className="button" type={type} onClick={onClick}>
      {Icon && <Icon className="button-icon" />}
      {children}
    </button>
  );
}

export default Button;
