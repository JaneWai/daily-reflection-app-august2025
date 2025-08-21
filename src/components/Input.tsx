import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block font-mono font-bold text-neo-black mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 font-mono border-4 border-neo-black bg-neo-white text-neo-black placeholder-gray-500 shadow-brutal focus:outline-none focus:shadow-brutal-pink transition-shadow duration-100 ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 font-mono text-sm text-neo-pink font-bold uppercase">
          {error}
        </p>
      )}
    </div>
  );
};
