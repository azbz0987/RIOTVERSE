import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
}

/** Original RIOTVERSE wordmark: a nested diamond sigil + Cinzel lettering. */
export function Logo({ className }: LogoProps) {
  return (
    <Link to="/" aria-label="RIOTVERSE 홈" className={cn('group inline-flex items-center gap-2.5', className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0 transition-transform duration-slow ease-cinematic group-hover:rotate-45" aria-hidden>
        <path d="M16 3 29 16 16 29 3 16Z" fill="none" className="stroke-primary" strokeWidth="1.5" />
        <path d="M16 10 22 16 16 22 10 16Z" className="fill-primary" />
        <path d="M16 1v4M16 27v4M1 16h4M27 16h4" className="stroke-accent" strokeWidth="1.5" />
      </svg>
      <span className="font-display text-lg font-bold tracking-[0.18em] text-text">
        RIOT<span className="text-primary">VERSE</span>
      </span>
    </Link>
  );
}
