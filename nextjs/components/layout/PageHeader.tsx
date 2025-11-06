import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-base-content/70 mt-0.5 text-sm">{description}</p>
          )}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
