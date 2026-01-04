import React, { ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full px-3 py-2 border border-[#B2B8A3]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B2B8A3] focus:border-[#B2B8A3] bg-white ${className}`}
      {...props}
    />
  );
}
