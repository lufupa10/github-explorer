import './Input.css';

function Input({ value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <input
      className={`input ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
