import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  showCount?: boolean;
  currentLength?: number;
}

export function Input({
  label,
  showCount = false,
  currentLength = 0,
  maxLength,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-control">
      <div className="flex justify-between items-baseline mb-1">
        <label htmlFor={inputId} className="label-text text-sm font-bold text-base-content">
          {label}
        </label>
        {showCount && maxLength && (
          <span className="text-xs text-base-content/50">
            {currentLength}/{maxLength}
          </span>
        )}
      </div>
      <input
        id={inputId}
        maxLength={maxLength}
        className={`input input-bordered w-full h-10 text-sm bg-base-200 border-2 focus:border-primary focus:bg-base-100 transition-all ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
