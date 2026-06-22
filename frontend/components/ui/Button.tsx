import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-fast focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-gold hover:brightness-110 active:brightness-90 text-dark-950 shadow-md hover:shadow-gold',
    secondary: 'bg-dark-800 hover:bg-dark-700 text-white border border-dark-700 hover:border-dark-600',
    outline: 'bg-transparent hover:bg-dark-800 text-gold border border-dark-700 hover:border-gold',
    ghost: 'bg-transparent hover:bg-dark-800 text-gray-300 hover:text-white',
    danger: 'bg-error hover:brightness-110 active:brightness-90 text-white shadow-md',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-6 py-3 text-base h-11',
    lg: 'px-8 py-4 text-lg h-14',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
