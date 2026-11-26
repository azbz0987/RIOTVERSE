import { cn } from '@/lib/cn';
import { DIFFICULTY_LABEL, type Difficulty } from '@/types/champion';

const fill: Record<Difficulty, string> = {
  1: 'bg-difficulty-easy',
  2: 'bg-difficulty-normal',
  3: 'bg-difficulty-hard',
};

interface DifficultyMeterProps {
  level: Difficulty;
  showLabel?: boolean;
  className?: string;
}

/** Three-segment difficulty bar, colored by level. */
export function DifficultyMeter({ level, showLabel, className }: DifficultyMeterProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)} aria-label={`난이도 ${DIFFICULTY_LABEL[level]}`}>
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span key={n} className={cn('h-1 w-3 rounded-full', n <= level ? fill[level] : 'bg-text/15')} />
        ))}
      </span>
      {showLabel && <span className="text-caption text-text-secondary">{DIFFICULTY_LABEL[level]}</span>}
    </span>
  );
}
