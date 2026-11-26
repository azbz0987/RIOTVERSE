import { motion } from 'framer-motion';
import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { transition } from '@/components/motion/tokens';

export interface FilterOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface FilterTabProps<T extends string> {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "포지션 필터". */
  label: string;
  className?: string;
}

/**
 * Single-select filter tabs (e.g. positions). Scrolls horizontally on small screens.
 * The active pill slides between options with a shared layout animation.
 */
export function FilterTab<T extends string>({ options, value, onChange, label, className }: FilterTabProps<T>) {
  const groupId = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        '-mx-gutter flex gap-1 overflow-x-auto px-gutter [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      <div className="flex shrink-0 gap-1 rounded-lg border border-border bg-surface/70 p-1">
        {options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={cn(
                'relative inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-4 text-body-sm font-medium transition-colors duration-base',
                active ? 'text-text-inverse' : 'text-text-secondary hover:bg-surface-overlay/60 hover:text-text',
              )}
            >
              {active && (
                <motion.span
                  layoutId={`filter-pill-${groupId}`}
                  transition={transition.base}
                  className="absolute inset-0 rounded-md bg-primary"
                />
              )}
              {option.icon && <span className="relative [&>svg]:h-4 [&>svg]:w-4">{option.icon}</span>}
              <span className="relative">{option.label}</span>
              {option.count !== undefined && (
                <span
                  className={cn(
                    'text-data relative text-data-sm',
                    active ? 'text-text-inverse/70' : 'text-text-muted',
                  )}
                >
                  {option.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
