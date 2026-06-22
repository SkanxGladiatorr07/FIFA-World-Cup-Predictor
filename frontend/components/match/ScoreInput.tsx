import React from 'react';

interface ScoreInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export const ScoreInput: React.FC<ScoreInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 10,
  disabled = false,
  className = '',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string for clearing
    if (inputValue === '') {
      onChange(0);
      return;
    }
    
    const newValue = parseInt(inputValue);
    
    // If not a valid number, ignore the input
    if (isNaN(newValue)) {
      return;
    }
    
    // Clamp the value between min and max
    const clampedValue = Math.max(min, Math.min(max, newValue));
    onChange(clampedValue);
  };

  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Decrement Button */}
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="w-8 h-8 rounded-md bg-dark-600 hover:bg-dark-500 disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center text-white font-bold transition-colors"
      >
        -
      </button>

      {/* Score Display */}
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        className="w-16 h-10 text-center text-2xl font-bold bg-dark-600 border border-dark-500 rounded-md
                   text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent
                   disabled:opacity-50 disabled:cursor-not-allowed [appearance:textfield]
                   [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      {/* Increment Button */}
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className="w-8 h-8 rounded-md bg-dark-600 hover:bg-dark-500 disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center text-white font-bold transition-colors"
      >
        +
      </button>
    </div>
  );
};
