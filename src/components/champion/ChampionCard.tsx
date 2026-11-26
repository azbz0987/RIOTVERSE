import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { transition } from '@/components/motion/tokens';
import { DifficultyMeter } from '@/components/ui/DifficultyMeter';
import { ROLE_LABEL, type ChampionCardData } from '@/types/champion';

interface ChampionCardProps {
  champion: ChampionCardData;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  /** Eager-load images for cards above the fold. */
  priority?: boolean;
  className?: string;
}

/**
 * Portrait champion card (loading-screen art, 11:20).
 * Hover / focus: art zooms, gold frame and corner ornaments light up.
 */
export function ChampionCard({ champion, isFavorite = false, onToggleFavorite, priority, className }: ChampionCardProps) {
  const [loaded, setLoaded] = useState(false);
  const { id, name, title, roles, difficulty, imageUrl } = champion;

  return (
    <article className={cn('group relative', className)}>
      <Link
        to={`/champions/${id}`}
        className="relative block aspect-[11/20] overflow-hidden rounded-lg border border-border bg-surface shadow-card transition-[border-color,box-shadow] duration-base ease-cinematic hover:border-primary/70 hover:shadow-glow-primary focus-visible:border-primary"
      >
        {/* Art */}
        <img
          src={imageUrl}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-[transform,opacity] duration-slow ease-cinematic group-hover:scale-105',
            loaded ? 'opacity-100' : 'opacity-0',
          )}
        />
        {!loaded && <span aria-hidden className="absolute inset-0 animate-pulse bg-surface-raised" />}

        {/* Scrim for text legibility */}
        <span aria-hidden className="absolute inset-0 bg-scrim-bottom" />

        {/* Gold corner ornaments, revealed on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-2 opacity-0 transition-opacity duration-base group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-primary" />
          <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-primary" />
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-primary" />
          <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-primary" />
        </span>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-3 md:p-4">
          <p className="truncate text-caption text-primary/90">{title}</p>
          <h3 className="truncate text-heading-sm text-text">{name}</h3>
          <div className="mt-1 flex items-center justify-between gap-2">
            <ul className="flex min-w-0 gap-1" aria-label="포지션">
              {roles.map((role) => (
                <li
                  key={role}
                  className="rounded-sm border border-text/15 bg-bg/50 px-1.5 py-0.5 text-[11px] leading-none text-text-secondary"
                >
                  {ROLE_LABEL[role]}
                </li>
              ))}
            </ul>
            <DifficultyMeter level={difficulty} />
          </div>
        </div>
      </Link>

      {/* Favorite toggle — sibling of the link so the two controls never nest */}
      {onToggleFavorite && (
        <motion.button
          type="button"
          onClick={() => onToggleFavorite(id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `${name} 즐겨찾기 해제` : `${name} 즐겨찾기 추가`}
          whileTap={{ scale: 0.85 }}
          transition={transition.base}
          className={cn(
            'absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-base',
            isFavorite
              ? 'border-primary/60 bg-primary/20 text-primary'
              : 'border-text/15 bg-bg/50 text-text-secondary hover:border-primary/50 hover:text-primary',
          )}
        >
          <motion.span
            key={String(isFavorite)}
            initial={{ scale: isFavorite ? 0.4 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className="inline-flex"
          >
            <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} strokeWidth={2} />
          </motion.span>
        </motion.button>
      )}
    </article>
  );
}
