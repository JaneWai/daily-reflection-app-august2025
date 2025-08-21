import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-mono font-bold border-4 border-neo-black transition-all duration-100 active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-wider';
  
  const variantClasses = {
    primary: 'bg-neo-pink text-neo-white shadow-brutal hover:bg-neo-pink/90',
    secondary: 'bg-neo-cyan text-neo-black shadow-brutal hover:bg-neo-cyan/90',
    danger: 'bg-neo-black text-neo-white shadow-brutal-pink hover:bg-gray-800',
    success: 'bg-neo-green text-neo-black shadow-brutal hover:bg-neo-green/90',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
