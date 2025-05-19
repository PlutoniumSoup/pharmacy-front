import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyle = "font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary-dark focus:ring-primary-dark",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-600",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;