import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
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
      <textarea
        className={`w-full px-4 py-3 font-mono border-4 border-neo-black bg-neo-white text-neo-black placeholder-gray-500 shadow-brutal focus:outline-none focus:shadow-brutal-cyan transition-shadow duration-100 resize-none ${className}`}
        rows={4}
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
