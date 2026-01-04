import React, { ReactNode } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-[#FFFBF7] rounded-lg shadow border border-[#B2B8A3]/20 ${className}`}
      {...props}
    />
  );
}
