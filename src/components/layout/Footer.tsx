import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { NAV_ITEMS } from './navItems';

interface FooterProps {
  githubUrl?: string;
}

/** Global footer with the Riot Games fan-content disclaimer. */
export function Footer({ githubUrl }: FooterProps) {
  return (
    <footer className="border-t border-border bg-bg-deep">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] lg:py-20">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-md text-body-sm text-text-secondary">
            룬테라의 챔피언과 이야기를 탐험하는 비공식 팬 프로젝트입니다.
          </p>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-body-sm text-text-secondary transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          )}
        </div>

        <nav aria-label="푸터 메뉴">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="group flex flex-col">
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-text transition-colors group-hover:text-primary">
                    {item.label}
                  </span>
                  <span className="text-caption text-text-muted">{item.labelKo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="container-page space-y-2 py-6 text-caption text-text-muted">
          <p>
            RIOTVERSE는 Riot Games가 보증하거나 후원하지 않으며, Riot Games 또는 League of Legends의 제작·관리에
            관여한 누구의 공식 입장도 반영하지 않습니다.
          </p>
          <p>
            League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. ©{' '}
            <span className="text-data">{new Date().getFullYear()}</span> RIOTVERSE · Portfolio project
          </p>
        </div>
      </div>
    </footer>
  );
}
