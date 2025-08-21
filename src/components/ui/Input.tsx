import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold font-sans text-gray-800">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-gradient-to-r from-peach-50 to-rose-50 border-3 border-black shadow-neo font-sans placeholder-gray-500 focus:outline-none focus:shadow-neo-lg transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};
