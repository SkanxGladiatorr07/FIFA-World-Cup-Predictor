import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-dark-800 rounded-xl border border-dark-700 p-6 transition-all duration-300
        ${hover ? 'hover:border-gold hover:shadow-card-hover hover:scale-[1.01]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
