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
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Decrement Button */}
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="w-12 h-12 rounded-full bg-[#6b7280] hover:bg-[#7d8590] disabled:opacity-30 disabled:cursor-not-allowed
                   flex items-center justify-center text-[#1a1d2e] font-bold transition-colors text-2xl shadow-lg"
      >
        -
      </button>

      {/* Score Display */}
      <div className="w-20 h-14 flex items-center justify-center bg-[#1a1d2e] border-4 border-[#f59e0b] rounded-2xl shadow-xl">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          disabled={disabled}
          className="w-full h-full text-center text-3xl font-bold bg-transparent border-none
                     text-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed 
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none"
          style={{ color: '#ffffff' }}
        />
      </div>

      {/* Increment Button */}
      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className="w-12 h-12 rounded-full bg-[#f59e0b] hover:bg-[#ffc174] disabled:opacity-30 disabled:cursor-not-allowed
                   flex items-center justify-center text-[#1a1d2e] font-bold transition-colors text-2xl shadow-lg"
      >
        +
      </button>
    </div>
  );
};
