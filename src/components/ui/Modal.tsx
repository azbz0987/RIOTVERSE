import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { transition } from '@/components/motion/tokens';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Accessible title; shown in the header unless hideTitle is set. */
  title: string;
  hideTitle?: boolean;
  size?: 'md' | 'lg' | 'full';
  children: ReactNode;
  className?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

const sizes = {
  md: 'max-w-lg',
  lg: 'max-w-4xl',
  full: 'max-w-[min(1440px,100%)] h-full md:h-auto',
};

/**
 * Accessible modal dialog: portal, Esc / backdrop to close, focus trap,
 * body scroll lock, and focus returned to the trigger on close.
 */
export function Modal({ open, onClose, title, hideTitle, size = 'md', children, className }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Focus the first focusable element once the panel mounts.
    const frame = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panelRef.current)?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items.at(0);
      const last = items.at(-1);
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-0 md:p-8">
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition.base}
            className="absolute inset-0 bg-bg-deep/85 backdrop-blur-md"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={transition.base}
            className={cn(
              'relative flex max-h-full w-full flex-col overflow-hidden border border-border bg-surface-raised shadow-raised md:rounded-lg',
              sizes[size],
              className,
            )}
          >
            {/* Gold hairline accent along the top edge */}
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <div className={cn('flex items-center justify-between gap-4 px-5 py-4 md:px-6', hideTitle && 'absolute right-0 top-0 z-10')}>
              <h2 id={titleId} className={cn('font-display text-display-sm uppercase text-text', hideTitle && 'sr-only')}>
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-bg/50 text-text-secondary transition-colors hover:bg-surface-overlay hover:text-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
