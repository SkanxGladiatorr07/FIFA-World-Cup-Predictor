import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`
        bg-dark-800 rounded-xl border border-dark-700 p-6
        ${hover ? 'hover:border-gold hover:shadow-gold transition-smooth' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
