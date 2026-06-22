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

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Score Display - Direct Keyboard Input Only */}
      <div className="w-20 h-14 flex items-center justify-center bg-[#1a1d2e] border-4 border-[#f59e0b] rounded-2xl shadow-xl">
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          disabled={disabled}
          className="w-full h-full text-center text-4xl font-bold bg-transparent border-none
                     focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed 
                     [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                     [&::-webkit-inner-spin-button]:appearance-none"
          style={{ color: '#f59e0b' }}
        />
      </div>
    </div>
  );
};
