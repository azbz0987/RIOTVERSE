import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { EASE_CINEMATIC, transition } from '@/components/motion/tokens';
import { NAV_ITEMS } from './navItems';

/** Desktop GNB (≥ 1024px). Active item gets a gold label and a sliding underline. */
export function DesktopNavigation() {
  return (
    <nav aria-label="주요 메뉴" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'relative block px-4 py-2 font-display text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-base',
                  isActive ? 'text-primary' : 'text-text-secondary hover:text-text',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={transition.base}
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-primary shadow-glow-primary"
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen mobile / tablet menu (< 1024px). Locks body scroll and closes on Esc. */
export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition.base}
          className="fixed inset-x-0 bottom-0 top-header z-overlay bg-bg/95 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="모바일 메뉴" className="container-page flex h-full flex-col pt-8">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: EASE_CINEMATIC }}
                  className="border-b border-border"
                >
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn('flex items-baseline justify-between py-5', isActive ? 'text-primary' : 'text-text')
                    }
                  >
                    <span className="font-display text-display-sm uppercase">{item.label}</span>
                    <span className="text-body-sm text-text-muted">{item.labelKo}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
