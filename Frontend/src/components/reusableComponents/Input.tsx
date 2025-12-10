import React from 'react';

interface InputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  icon?: React.ReactNode; // Left icon
  rightIcon?: React.ReactNode; // Right icon (e.g. eye toggle)
  onRightIconClick?: () => void; // For password toggle
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  className = '',
  icon,
  rightIcon,
  onRightIconClick,
  disabled = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block mb-0.5 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Left Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
            {icon}
          </span>
        )}

        {/* Right Icon */}
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {rightIcon}
          </button>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full border border-gray-400 rounded px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            icon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
        />
      </div>
    </div>
  );
};

export default Input;
