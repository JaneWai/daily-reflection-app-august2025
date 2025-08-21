import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  disabled,
  ...props 
}) => {
  const baseClasses = 'font-sans font-semibold border-3 border-black transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-400 to-primary-500 text-white shadow-neo hover:from-primary-500 hover:to-primary-600 active:translate-x-1 active:translate-y-1 active:shadow-none',
    secondary: 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white shadow-neo hover:from-secondary-500 hover:to-secondary-600 active:translate-x-1 active:translate-y-1 active:shadow-none',
    outline: 'bg-white text-gray-800 shadow-neo hover:bg-gray-50 active:translate-x-1 active:translate-y-1 active:shadow-none',
    success: 'bg-gradient-to-r from-success-400 to-success-500 text-white shadow-neo hover:from-success-500 hover:to-success-600 active:translate-x-1 active:translate-y-1 active:shadow-none'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed hover:translate-x-0 hover:translate-y-0 active:translate-x-0 active:translate-y-0 hover:shadow-neo active:shadow-neo' 
    : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
