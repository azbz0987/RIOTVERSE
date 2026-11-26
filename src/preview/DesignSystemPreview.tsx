import { ArrowRight, Heart, Play } from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { ChampionCard } from '@/components/champion/ChampionCard';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { FilterTab, type FilterOption } from '@/components/ui/FilterTab';
import { ChampionCardSkeleton, Spinner } from '@/components/ui/Loading';
import { Modal } from '@/components/ui/Modal';
import { SearchBar } from '@/components/ui/SearchBar';
import { SectionTitle } from '@/components/ui/SectionTitle';
import type { ChampionCardData, Role } from '@/types/champion';

/*
 * Temporary design-system preview (STEP 02).
 * Shows every token and shared component on one screen. Remove or move
 * behind a dev-only route once real pages exist.
 */

const loading = (id: string) => `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;

const SAMPLE: ChampionCardData[] = [
  { id: 'Ahri', name: '아리', title: '구미호', roles: ['mid'], difficulty: 2, imageUrl: loading('Ahri') },
  { id: 'Garen', name: '가렌', title: '데마시아의 힘', roles: ['top'], difficulty: 1, imageUrl: loading('Garen') },
  { id: 'LeeSin', name: '리 신', title: '눈먼 수도승', roles: ['jungle'], difficulty: 3, imageUrl: loading('LeeSin') },
  { id: 'Jinx', name: '징크스', title: '난폭한 말괄량이', roles: ['bot'], difficulty: 2, imageUrl: loading('Jinx') },
  { id: 'Thresh', name: '쓰레쉬', title: '지옥의 간수', roles: ['support'], difficulty: 3, imageUrl: loading('Thresh') },
  { id: 'Yasuo', name: '야스오', title: '용서받지 못한 자', roles: ['mid', 'top'], difficulty: 3, imageUrl: loading('Yasuo') },
];

const COLORS: { group: string; items: { name: string; token: string; hex: string; className: string }[] }[] = [
  {
    group: 'Base',
    items: [
      { name: 'Background', token: '--color-bg', hex: '#080D18', className: 'bg-bg' },
      { name: 'Background Deep', token: '--color-bg-deep', hex: '#04070E', className: 'bg-bg-deep' },
      { name: 'Surface', token: '--color-surface', hex: '#101B2C', className: 'bg-surface' },
      { name: 'Surface Raised', token: '--color-surface-raised', hex: '#16243A', className: 'bg-surface-raised' },
      { name: 'Surface Overlay', token: '--color-surface-overlay', hex: '#1E2F48', className: 'bg-surface-overlay' },
      { name: 'Border', token: '--color-border', hex: '#24344D', className: 'bg-border' },
    ],
  },
  {
    group: 'Brand',
    items: [
      { name: 'Primary', token: '--color-primary', hex: '#C8AA6E', className: 'bg-primary' },
      { name: 'Primary Hover', token: '--color-primary-hover', hex: '#DCC28D', className: 'bg-primary-hover' },
      { name: 'Primary Pressed', token: '--color-primary-pressed', hex: '#A68952', className: 'bg-primary-pressed' },
      { name: 'Accent', token: '--color-accent', hex: '#0AC8B9', className: 'bg-accent' },
      { name: 'Accent Hover', token: '--color-accent-hover', hex: '#40DACD', className: 'bg-accent-hover' },
      { name: 'Gold Gradient', token: '--gradient-gold', hex: 'gradient', className: 'bg-gradient-gold' },
    ],
  },
  {
    group: 'Text',
    items: [
      { name: 'Text', token: '--color-text', hex: '#E8EDF4', className: 'bg-text' },
      { name: 'Text Secondary', token: '--color-text-secondary', hex: '#A9B4C4', className: 'bg-text-secondary' },
      { name: 'Text Muted', token: '--color-text-muted', hex: '#7D8BA1', className: 'bg-text-muted' },
    ],
  },
  {
    group: 'Status',
    items: [
      { name: 'Success', token: '--color-success', hex: '#3DD68C', className: 'bg-success' },
      { name: 'Warning', token: '--color-warning', hex: '#F2B544', className: 'bg-warning' },
      { name: 'Danger', token: '--color-danger', hex: '#F0506E', className: 'bg-danger' },
      { name: 'Info', token: '--color-info', hex: '#4FA3F7', className: 'bg-info' },
    ],
  },
];

const TYPE_SCALE: { token: string; spec: string; sample: string; className: string }[] = [
  { token: 'display-xl', spec: 'Cinzel 700 · 44→88px · 1.05', sample: 'Runeterra', className: 'font-display text-display-xl uppercase' },
  { token: 'display-lg', spec: 'Cinzel 700 · 36→64px · 1.1', sample: 'Champions', className: 'font-display text-display-lg uppercase' },
  { token: 'display-md', spec: 'Cinzel 600 · 28→44px · 1.15', sample: 'Discover', className: 'font-display text-display-md uppercase' },
  { token: 'display-sm', spec: 'Cinzel 600 · 20→28px · 1.25', sample: 'Skin Gallery', className: 'font-display text-display-sm uppercase' },
  { token: 'heading-lg', spec: 'Pretendard 700 · 24→32px · 1.35', sample: '데마시아의 정의', className: 'text-heading-lg' },
  { token: 'heading-md', spec: 'Pretendard 700 · 20→24px · 1.4', sample: '필트오버와 자운', className: 'text-heading-md' },
  { token: 'heading-sm', spec: 'Pretendard 600 · 18px · 1.45', sample: '아리 · 구미호', className: 'text-heading-sm' },
  { token: 'body-lg', spec: 'Pretendard 400 · 17px · 1.75', sample: '룬테라의 이야기는 수많은 지역과 챔피언으로 이어집니다.', className: 'text-body-lg text-text-secondary' },
  { token: 'body', spec: 'Pretendard 400 · 16px · 1.7', sample: '아리는 영혼의 정수를 흡수하는 바스타야입니다.', className: 'text-body text-text-secondary' },
  { token: 'body-sm', spec: 'Pretendard 400 · 14px · 1.6', sample: '검색 결과 34명 · 미드 포지션', className: 'text-body-sm text-text-secondary' },
  { token: 'caption', spec: 'Pretendard 400 · 13px · 1.5', sample: '마지막 업데이트 2026.11.26', className: 'text-caption text-text-muted' },
  { token: 'overline', spec: 'Pretendard 600 · 12px · 0.28em', sample: '01 — Featured', className: 'eyebrow' },
  { token: 'data-lg', spec: 'Inter 600 · 32→48px · tabular', sample: '172', className: 'text-data text-data-lg' },
  { token: 'data-md', spec: 'Inter 600 · 20px · tabular', sample: '1,742 skins', className: 'text-data text-data-md' },
];

const ROLE_FILTERS: FilterOption<'all' | Role>[] = [
  { value: 'all', label: '전체', count: 6 },
  { value: 'top', label: '탑', count: 2 },
  { value: 'jungle', label: '정글', count: 1 },
  { value: 'mid', label: '미드', count: 2 },
  { value: 'bot', label: '원딜', count: 1 },
  { value: 'support', label: '서포터', count: 1 },
];

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-border py-14 first:border-t-0 lg:py-20">
      <h2 className="mb-8 flex items-center gap-3 eyebrow">
        <span aria-hidden className="h-px w-8 bg-primary/60" />
        {title}
      </h2>
      {children}
    </section>
  );
}

export function DesignSystemPreview() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState<'all' | Role>('all');
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set(['Ahri']));
  const [modalOpen, setModalOpen] = useState(false);

  const champions = useMemo(
    () =>
      SAMPLE.filter(
        (c) =>
          (role === 'all' || c.roles.includes(role)) &&
          (c.name.includes(query.trim()) || c.id.toLowerCase().includes(query.trim().toLowerCase())),
      ),
    [query, role],
  );

  const toggleFavorite = (id: string) =>
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="container-page">
      {/* Intro */}
      <div className="py-16 lg:py-24">
        <SectionTitle
          as="h1"
          size="lg"
          eyebrow="Step 02 — Design System"
          title="Riotverse UI Kit"
          description="Dark Fantasy와 Premium Gaming을 결합한 RIOTVERSE의 디자인 토큰과 공통 컴포넌트입니다. 모든 페이지는 이 시스템만 사용합니다."
        />
      </div>

      <Block id="colors" title="Color">
        <div className="space-y-10">
          {COLORS.map((group) => (
            <div key={group.group}>
              <h3 className="mb-4 text-heading-sm text-text">{group.group}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {group.items.map((c) => (
                  <div key={c.token} className="overflow-hidden rounded-lg border border-border bg-surface">
                    <div className={`h-20 ${c.className}`} />
                    <div className="space-y-0.5 p-3">
                      <p className="text-body-sm font-semibold text-text">{c.name}</p>
                      <p className="text-data text-data-sm text-text-secondary">{c.hex}</p>
                      <p className="truncate font-data text-[11px] text-text-muted">{c.token}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block id="typography" title="Typography">
        <div className="divide-y divide-border">
          {TYPE_SCALE.map((t) => (
            <div key={t.token} className="grid gap-2 py-5 md:grid-cols-[200px_1fr] md:items-baseline md:gap-8">
              <div>
                <p className="font-data text-data-sm text-primary">{t.token}</p>
                <p className="text-caption text-text-muted">{t.spec}</p>
              </div>
              <p className={t.className}>{t.sample}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block id="layout" title="Layout">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Max width', '1440px', '.container-page'],
            ['Side gutter', '20 / 32 / 48 / 64px', 'px-gutter'],
            ['Section gap', '72 / 96 / 128 / 160px', 'py-section'],
            ['Card grid', '2 / 3 / 4 / 5 / 6 cols', '.grid-cards'],
          ].map(([label, value, cls]) => (
            <div key={label} className="rounded-lg border border-border bg-surface p-5">
              <p className="text-caption text-text-muted">{label}</p>
              <p className="text-data mt-1 text-data-md text-text">{value}</p>
              <p className="mt-2 font-data text-[11px] text-accent">{cls}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-body-sm text-text-secondary">
          Breakpoints — <span className="text-data">sm 480 · md 768 · lg 1024 · xl 1440</span>
        </p>
      </Block>

      <Block id="buttons" title="Buttons">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight />}>
              Explore Champions
            </Button>
            <Button variant="primary">Primary</Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="secondary" size="lg" leftIcon={<Play />}>
              Watch Story
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary" size="sm">
              Small
            </Button>
            <Button variant="ghost" leftIcon={<Heart />}>
              Ghost
            </Button>
          </div>
        </div>
      </Block>

      <Block id="section-title" title="Section Title">
        <div className="space-y-14">
          <SectionTitle
            eyebrow="01 — Featured"
            title="Champions"
            description="170명이 넘는 챔피언 중 지금 주목할 만한 이들을 만나보세요."
            action={
              <Button variant="ghost" rightIcon={<ArrowRight />}>
                View all
              </Button>
            }
          />
          <SectionTitle
            align="center"
            eyebrow="02 — World"
            title="Discover Runeterra"
            description="13개 지역의 역사와 문화, 그리고 그곳의 챔피언들."
          />
        </div>
      </Block>

      <Block id="search-filter" title="Search Bar · Filter Tab · Champion Card">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">
          <SearchBar value={query} onChange={setQuery} resultCount={champions.length} className="lg:max-w-sm" />
          <FilterTab label="포지션 필터" options={ROLE_FILTERS} value={role} onChange={setRole} />
        </div>
        {champions.length > 0 ? (
          <div className="grid-cards">
            {champions.map((c, i) => (
              <ChampionCard
                key={c.id}
                champion={c}
                priority={i < 6}
                isFavorite={favorites.has(c.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="검색 결과가 없어요"
            description="다른 이름으로 검색하거나 필터를 초기화해 보세요."
            action={
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setQuery('');
                  setRole('all');
                }}
              >
                필터 초기화
              </Button>
            }
          />
        )}
      </Block>

      <Block id="loading" title="Loading">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex items-end gap-8">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" label="룬테라를 불러오는 중" showLabel />
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => (
              <ChampionCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Block>

      <Block id="empty-modal" title="Empty State · Modal">
        <div className="grid gap-6 lg:grid-cols-2">
          <EmptyState
            icon={Heart}
            title="아직 저장한 챔피언이 없어요"
            description="마음에 드는 챔피언의 하트를 눌러 나만의 컬렉션을 만들어 보세요."
            action={
              <Button size="sm" rightIcon={<ArrowRight />}>
                챔피언 보러 가기
              </Button>
            }
          />
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-surface/40 p-10 text-center">
            <p className="text-body-sm text-text-secondary">ESC · 배경 클릭으로 닫힘 · 포커스 트랩 · 스크롤 잠금</p>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
          </div>
        </div>
      </Block>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Spirit Blossom Ahri" size="lg">
        <img
          src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_27.jpg"
          alt="영혼의 꽃 아리 스플래시 아트"
          className="aspect-video w-full object-cover"
        />
        <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
          <div>
            <p className="text-caption text-primary">아리 · 구미호</p>
            <p className="text-heading-md text-text">영혼의 꽃 아리</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" leftIcon={<Heart />}>
              저장
            </Button>
            <Button size="sm" onClick={() => setModalOpen(false)}>
              닫기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
