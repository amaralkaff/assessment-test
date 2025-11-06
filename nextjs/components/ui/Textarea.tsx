import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  showCount?: boolean;
  currentLength?: number;
}

export function Textarea({
  label,
  showCount = false,
  currentLength = 0,
  className = '',
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-control">
      <div className="flex justify-between items-baseline mb-1">
        <label htmlFor={textareaId} className="label-text text-sm font-bold text-base-content">
          {label}
        </label>
        {showCount && (
          <span className="text-xs text-base-content/50">{currentLength} characters</span>
        )}
      </div>
      <textarea
        id={textareaId}
        className={`textarea textarea-bordered w-full h-64 text-sm leading-relaxed bg-base-200 border-2 focus:border-primary focus:bg-base-100 transition-all resize-y ${className}`.trim()}
        {...props}
      />
    </div>
  );
}
