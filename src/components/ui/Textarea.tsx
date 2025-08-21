import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold font-sans text-gray-800">
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-gradient-to-br from-peach-50 via-orange-50 to-amber-50 border-3 border-black shadow-neo font-sans placeholder-gray-500 focus:outline-none focus:shadow-neo-lg transition-all duration-200 resize-none ${className}`}
        {...props}
      />
    </div>
  );
};
