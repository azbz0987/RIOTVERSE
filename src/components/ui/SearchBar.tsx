import { Search, X } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Visually hidden label for screen readers. */
  label?: string;
  /** Number of results, announced politely to screen readers when provided. */
  resultCount?: number;
  size?: 'md' | 'lg';
  className?: string;
}

/** Controlled search input with a clear button. Debounce in the caller if needed. */
export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(function SearchBar(
  { value, onChange, placeholder = '챔피언 이름으로 검색', label = '검색', resultCount, size = 'md', className },
  ref,
) {
  const id = useId();

  return (
    <div className={cn('group relative w-full', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden
        className={cn(
          'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors duration-base group-focus-within:text-primary',
          size === 'lg' ? 'h-5 w-5' : 'h-4 w-4',
        )}
      />
      <input
        ref={ref}
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && value && onChange('')}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className={cn(
          'w-full rounded-md border border-border-strong bg-surface/80 text-text placeholder:text-text-muted',
          'transition-[border-color,box-shadow,background-color] duration-base ease-cinematic',
          'hover:border-primary/50 focus:border-primary focus:bg-surface focus:shadow-glow-primary focus:outline-none focus-visible:ring-0',
          '[&::-webkit-search-cancel-button]:appearance-none',
          size === 'lg' ? 'h-14 pl-12 pr-12 text-body-lg' : 'h-11 pl-11 pr-11 text-body-sm',
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
          className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-surface-overlay hover:text-text"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {resultCount !== undefined && (
        <span role="status" aria-live="polite" className="sr-only">
          검색 결과 {resultCount}개
        </span>
      )}
    </div>
  );
});
