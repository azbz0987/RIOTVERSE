import { cn } from '@/lib/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  /** Text announced to screen readers and shown under the sigil when `showLabel` is set. */
  label?: string;
  showLabel?: boolean;
  className?: string;
}

const spinnerSizes = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-16 w-16' };

/** Rotating diamond sigil — the brand loading indicator. */
export function Spinner({ size = 'md', label = '불러오는 중', showLabel, className }: SpinnerProps) {
  return (
    <div role="status" className={cn('inline-flex flex-col items-center gap-4', className)}>
      <svg viewBox="0 0 48 48" className={cn(spinnerSizes[size], 'animate-spin-slow')} aria-hidden>
        <path d="M24 3 45 24 24 45 3 24Z" fill="none" className="stroke-border-strong" strokeWidth="2" />
        <path d="M24 3 45 24" fill="none" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 16 32 24 24 32 16 24Z" className="fill-accent/80" />
      </svg>
      <span className={showLabel ? 'eyebrow text-text-muted' : 'sr-only'}>{label}</span>
    </div>
  );
}

/** Centered loader for a whole page or section while data loads. */
export function PageLoader({ label = '룬테라를 불러오는 중' }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner size="lg" label={label} showLabel />
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

/** Placeholder block with a gold-tinted shimmer. Size it with className. */
export function Skeleton({ className }: SkeletonProps) {
  return (
    <div aria-hidden className={cn('relative overflow-hidden rounded-md bg-surface', className)}>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent" />
    </div>
  );
}

/** Skeleton matching ChampionCard's 11:20 portrait shape. */
export function ChampionCardSkeleton() {
  return <Skeleton className="aspect-[11/20] w-full rounded-lg" />;
}
