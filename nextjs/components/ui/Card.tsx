import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  const paddingClass = {
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }[padding];

  return (
    <div className={`card bg-base-100 shadow-xl border-2 border-base-300 ${className}`.trim()}>
      <div className={`card-body ${paddingClass}`}>{children}</div>
    </div>
  );
}
