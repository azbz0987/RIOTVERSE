import { Heart, Menu, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Logo } from './Logo';
import { DesktopNavigation, MobileNavigation } from './Navigation';

interface HeaderProps {
  /** Number of saved items shown on the collection badge. */
  collectionCount?: number;
}

/**
 * Fixed global header. Transparent over the hero, then switches to a
 * blurred surface once the page scrolls past 24px.
 */
export function Header({ collectionCount = 0 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-header h-header transition-[background-color,border-color,backdrop-filter] duration-base ease-cinematic',
          solid ? 'border-b border-border/70 bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Logo />
          <DesktopNavigation />

          <div className="flex items-center gap-1">
            <Link
              to="/collection"
              aria-label={`내 컬렉션, 저장 ${collectionCount}개`}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-md text-text-secondary transition-colors duration-base hover:bg-surface hover:text-primary"
            >
              <Heart className="h-5 w-5" strokeWidth={1.75} />
              {collectionCount > 0 && (
                <span className="text-data absolute right-1 top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-text-inverse">
                  {collectionCount > 99 ? '99+' : collectionCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text transition-colors duration-base hover:bg-surface lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={closeMenu} />
    </>
  );
}
