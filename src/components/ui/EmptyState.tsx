import { SearchX, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  /** Usually a Button or ButtonLink. */
  action?: ReactNode;
  className?: string;
}

/** Shown when a list has nothing to display (no search results, empty collection). */
export function EmptyState({ icon: Icon = SearchX, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5 rounded-lg border border-dashed border-border-strong bg-surface/40 px-6 py-16 text-center md:py-24',
        className,
      )}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span aria-hidden className="absolute inset-0 rotate-45 rounded-md border border-primary/40 bg-primary-soft/40" />
        <Icon className="relative h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden />
      </div>
      <div className="space-y-2">
        <h3 className="text-heading-md text-text">{title}</h3>
        {description && <p className="mx-auto max-w-sm text-body-sm text-text-secondary">{description}</p>}
      </div>
      {action}
    </div>
  );
}
