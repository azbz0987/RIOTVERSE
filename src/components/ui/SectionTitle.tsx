import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionTitleProps {
  /** Small overline above the title, e.g. "01 — Featured". */
  eyebrow?: string;
  /** English display title (Cinzel). */
  title: string;
  /** Korean description under the title (Pretendard). */
  description?: string;
  align?: 'left' | 'center';
  /** Heading level — keep the document outline correct. */
  as?: 'h1' | 'h2' | 'h3';
  size?: 'lg' | 'md';
  /** Optional element on the right (e.g. a "View all" link). Left-aligned only. */
  action?: ReactNode;
  className?: string;
}

/**
 * Section heading pattern used on every page:
 * gold overline → English display title → Korean description, with an ornament rule.
 */
export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Heading = 'h2',
  size = 'md',
  action,
  className,
}: SectionTitleProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'flex gap-6',
        centered ? 'flex-col items-center text-center' : 'flex-col md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('flex flex-col gap-3', centered && 'items-center')}>
        {eyebrow && (
          <span className={cn('flex items-center gap-3 eyebrow', centered && 'justify-center')}>
            <span aria-hidden className="h-px w-8 bg-primary/60" />
            {eyebrow}
            {centered && <span aria-hidden className="h-px w-8 bg-primary/60" />}
          </span>
        )}
        <Heading
          className={cn(
            'font-display uppercase text-text',
            size === 'lg' ? 'text-display-lg' : 'text-display-md',
          )}
        >
          {title}
        </Heading>
        {description && (
          <p className={cn('max-w-2xl text-body-lg text-text-secondary', centered && 'mx-auto')}>{description}</p>
        )}
      </div>
      {action && !centered && <div className="shrink-0">{action}</div>}
    </div>
  );
}
