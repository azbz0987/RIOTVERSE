# RIOTVERSE Design System

> **Dark Fantasy × Premium Gaming** — 밤의 룬테라(깊은 남색) 위에 금박(골드)과 마법공학의 빛(청록)이 떠오르는 인상.
> 공식 사이트를 복제하지 않고, 자체 시길(마름모) 로고·잘린 모서리 버튼·코너 장식 카드로 독자적인 언어를 만든다.

모든 값은 **`src/styles/tokens.css`의 CSS 변수 한 곳**에서 정의하고, `tailwind.config.ts`가 그 변수를 Tailwind 클래스 이름으로 연결한다. 컴포넌트에는 HEX 값을 직접 쓰지 않는다.

```
tokens.css (CSS 변수)  →  tailwind.config.ts (클래스 이름)  →  컴포넌트 (bg-surface, text-primary …)
```

---

## 1. 디자인 원칙

| 원칙 | 의미 | 적용 |
| --- | --- | --- |
| Immersive | 콘텐츠(아트)가 주인공 | 풀블리드 아트 + 스크림, UI는 얇은 선과 반투명 면 |
| Restrained Gold | 금색은 '가장 중요한 것'에만 | 화면당 Primary 버튼 1개, 활성 상태, 제목 장식선 |
| Hextech Accent | 청록은 상호작용의 신호 | 포커스 링, 링크 호버, 로딩 시길 |
| Cinematic Motion | 느리게 시작해 부드럽게 멈춤 | `cubic-bezier(0.22, 1, 0.36, 1)` 하나로 통일 |

---

## 2. 컬러 시스템

색상은 `R G B` 채널로 저장해 투명도 수식어(`bg-primary/20`)를 쓸 수 있다.

### Base · Surface

| 토큰 | Tailwind | HEX | 용도 |
| --- | --- | --- | --- |
| `--color-bg` | `bg-bg` | `#080D18` | 페이지 배경 |
| `--color-bg-deep` | `bg-bg-deep` | `#04070E` | 푸터, 모달 딤, 히어로 오버레이 |
| `--color-surface` | `bg-surface` | `#101B2C` | 카드, 패널 |
| `--color-surface-raised` | `bg-surface-raised` | `#16243A` | 모달, 호버된 면 |
| `--color-surface-overlay` | `bg-surface-overlay` | `#1E2F48` | 입력창 내부, 칩 호버 |
| `--color-border` | `border-border` | `#24344D` | 기본 구분선 |
| `--color-border-strong` | `border-border-strong` | `#34496A` | 입력창 테두리 |

### Brand

| 토큰 | Tailwind | HEX | 용도 |
| --- | --- | --- | --- |
| `--color-primary` | `primary` | `#C8AA6E` | 주요 CTA, 활성 탭, 장식선 |
| `--color-primary-hover` | `primary-hover` | `#DCC28D` | Primary 호버 |
| `--color-primary-pressed` | `primary-pressed` | `#A68952` | Primary 눌림 |
| `--color-primary-soft` | `primary-soft` | `#3D3424` | 금색 틴트 배경 |
| `--color-accent` | `accent` | `#0AC8B9` | 포커스 링, 링크, 강조 정보 |
| `--color-accent-hover` | `accent-hover` | `#40DACD` | Accent 호버 |
| `--color-accent-soft` | `accent-soft` | `#08343A` | 청록 틴트 배경 |
| `--gradient-gold` | `bg-gradient-gold` | 그라데이션 | 히어로 타이틀 (`.text-gradient-gold`) |

### Text

| 토큰 | Tailwind | HEX | 대비(bg 기준) | 용도 |
| --- | --- | --- | --- | --- |
| `--color-text` | `text-text` | `#E8EDF4` | 약 16:1 | 제목, 본문 강조 |
| `--color-text-secondary` | `text-text-secondary` | `#A9B4C4` | 약 9:1 | 본문, 설명 |
| `--color-text-muted` | `text-text-muted` | `#7D8BA1` | 약 5.6:1 | 캡션, placeholder (AA 충족) |
| `--color-text-inverse` | `text-text-inverse` | `#080D18` | — | 금색 버튼 위 텍스트 |

### Status · Difficulty

| 토큰 | HEX | 용도 |
| --- | --- | --- |
| `success` / `difficulty-easy` | `#3DD68C` | 성공 토스트, 난이도 쉬움 |
| `warning` / `difficulty-normal` | `#F2B544` | 경고, 난이도 보통 |
| `danger` / `difficulty-hard` | `#F0506E` | 오류·삭제, 난이도 어려움 |
| `info` | `#4FA3F7` | 안내 |

---

## 3. 타이포그래피

| 역할 | 폰트 | Tailwind |
| --- | --- | --- |
| 영문 디스플레이 제목 | **Cinzel** (500/600/700) | `font-display` + `uppercase` |
| 한글 제목·본문 | **Pretendard Variable** | `font-sans` (기본값) |
| 숫자·데이터 | **Inter** + tabular-nums | `.text-data` |

한글은 `word-break: keep-all`로 단어 단위 줄바꿈. 디스플레이 크기는 `clamp()`로 모바일↔데스크톱 사이를 부드럽게 변한다.

| 토큰 | 폰트 · 굵기 | 크기 (모바일 → 데스크톱) | 행간 | 자간 | 용도 |
| --- | --- | --- | --- | --- | --- |
| `text-display-xl` | Cinzel 700 | 44 → 88px | 1.05 | 0.04em | 메인 히어로 |
| `text-display-lg` | Cinzel 700 | 36 → 64px | 1.1 | 0.04em | 페이지 히어로 |
| `text-display-md` | Cinzel 600 | 28 → 44px | 1.15 | 0.05em | 섹션 타이틀 |
| `text-display-sm` | Cinzel 600 | 20 → 28px | 1.25 | 0.06em | 모달 제목, 모바일 메뉴 |
| `text-heading-lg` | Pretendard 700 | 24 → 32px | 1.35 | -0.01em | 한글 큰 제목 |
| `text-heading-md` | Pretendard 700 | 20 → 24px | 1.4 | -0.01em | 카드 그룹 제목 |
| `text-heading-sm` | Pretendard 600 | 18px | 1.45 | -0.005em | 카드 이름 |
| `text-body-lg` | Pretendard 400 | 17px | 1.75 | 0 | 리드 문단 |
| `text-body` | Pretendard 400 | 16px | 1.7 | 0 | 기본 본문 |
| `text-body-sm` | Pretendard 400 | 14px | 1.6 | 0 | 보조 본문, 입력창 |
| `text-caption` | Pretendard 400 | 13px | 1.5 | 0 | 캡션, 메타 정보 |
| `text-overline` | Pretendard 600 | 12px | 1.4 | 0.28em | 섹션 눈썹 (`.eyebrow` = 이 크기 + 금색 + 대문자) |
| `text-data-lg` | Inter 600 | 32 → 48px | 1 | -0.02em | 통계 숫자 |
| `text-data-md` | Inter 600 | 20px | 1.2 | -0.01em | 수치 |
| `text-data-sm` | Inter 500 | 13px | 1.3 | 0 | 카운트 배지 |

---

## 4. 레이아웃

| 항목 | 값 | 사용 |
| --- | --- | --- |
| 최대 콘텐츠 너비 | **1440px** | `.container-page` |
| 좌우 여백 (gutter) | 20 / 32 / **48** / **64**px | `px-gutter` (PC는 1024px 이상 48, 1440px 이상 64) |
| 섹션 간격 | 72 / 96 / 128 / 160px | `.section` 또는 `py-section` |
| 헤더 높이 | 60px (모바일·태블릿) / 72px (PC) | `h-header`, 본문 `pt-header` |
| 카드 그리드 | 2 / 3 / 4 / 5 / 6열 | `.grid-cards` |
| 카드 간격 | 12 / 16 / 20 / 24px | `.grid-cards`에 포함 |

### 브레이크포인트

| 이름 | 최소 너비 | 기기 | 챔피언 그리드 |
| --- | --- | --- | --- |
| (기본) | 0 | 모바일 | 2열 |
| `sm` | 480px | 큰 모바일 | 3열 |
| `md` | 768px | 태블릿 | 4열 |
| `lg` | 1024px | 노트북 (GNB 노출) | 5열 |
| `xl` | 1440px | 데스크톱 | 6열 |

### 기타 토큰

| 분류 | 값 |
| --- | --- |
| Radius | `rounded-sm` 4 · `rounded-md` 8 · `rounded-lg` 12 · `rounded-xl` 20 |
| Shadow | `shadow-card` · `shadow-raised` · `shadow-glow-primary` · `shadow-glow-accent` |
| Motion | `ease-cinematic`, `duration-fast` 150 · `duration-base` 250 · `duration-slow` 500ms |
| Z-index | `z-header` 40 · `z-overlay` 50 · `z-modal` 60 · `z-toast` 70 |

`prefers-reduced-motion: reduce`이면 모든 애니메이션과 전환이 즉시 끝난다.

---

## 5. 공통 컴포넌트

| 컴포넌트 | 파일 | 핵심 규칙 |
| --- | --- | --- |
| Header | `components/layout/Header.tsx` | 고정. 스크롤 24px 전에는 투명, 이후 `bg-bg/80` + 블러. 컬렉션 하트 배지, 1024px 미만은 햄버거 |
| Navigation | `components/layout/Navigation.tsx` | PC: Cinzel GNB + 활성 밑줄이 `layoutId`로 미끄러짐. 모바일: 풀스크린 메뉴, 항목 순차 등장, Esc·라우트 이동 시 닫힘, 스크롤 잠금 |
| Footer | `components/layout/Footer.tsx` | 로고·메뉴·GitHub, Riot 팬 콘텐츠 고지 필수 |
| Primary Button | `components/ui/Button.tsx` `variant="primary"` | 금색 채움, 잘린 모서리(clip-path). 화면당 1개 |
| Secondary Button | 같은 파일 `variant="secondary"` | 금색 외곽선 + 5% 틴트. Primary 옆 보조 행동 |
| (Ghost Button) | 같은 파일 `variant="ghost"` | 텍스트만. 툴바·"View all" |
| Button 크기 | `sm` 36 · `md` 44 · `lg` 56px | 터치 영역 44px 이상은 `md` 이상 |
| Champion Card | `components/champion/ChampionCard.tsx` | 11:20 로딩 아트, 하단 스크림 + 칭호·이름·포지션·난이도. 호버 시 아트 확대 + 금색 테두리 + 코너 장식. 하트는 링크 바깥 형제 요소 |
| Section Title | `components/ui/SectionTitle.tsx` | 눈썹(overline) → 영문 Cinzel 제목 → 한글 설명. `align` left/center, 우측 `action` |
| Search Bar | `components/ui/SearchBar.tsx` | 제어 컴포넌트. 지우기 버튼, Esc로 초기화, 결과 수 스크린리더 안내. 포커스 시 금색 테두리 + 글로우 |
| Filter Tab | `components/ui/FilterTab.tsx` | 단일 선택 `radiogroup`. 활성 알약이 `layoutId`로 이동, 개수 표시, 모바일 가로 스크롤 |
| Modal | `components/ui/Modal.tsx` | Portal, Esc·배경 클릭 닫기, 포커스 트랩, 닫으면 트리거로 포커스 복귀, 스크롤 잠금. `md` / `lg` / `full` |
| Loading | `components/ui/Loading.tsx` | `Spinner`(회전 마름모 시길), `PageLoader`, `Skeleton`(금빛 시머), `ChampionCardSkeleton` |
| Empty State | `components/ui/EmptyState.tsx` | 점선 박스 + 마름모 아이콘 + 제목·설명·행동 버튼 |
| (DifficultyMeter) | `components/ui/DifficultyMeter.tsx` | 3칸 막대, 난이도 색상 |

### 상태 규칙 (모든 인터랙티브 요소 공통)

| 상태 | 표현 |
| --- | --- |
| Hover | 색 한 단계 밝게 또는 금색 테두리, `duration-base` |
| Focus (키보드) | `ring-2 ring-accent` + bg 색 오프셋 (전역 `:focus-visible`) |
| Active | `scale(0.98)` |
| Disabled | `opacity-40`, 포인터 이벤트 없음 |
| Selected | 금색 채움(`bg-primary` + `text-text-inverse`) |

---

## 6. 사용 예

```tsx
<section className="section">
  <div className="container-page">
    <SectionTitle eyebrow="01 — Featured" title="Champions" description="지금 주목할 챔피언" />
    <div className="grid-cards mt-10">
      {champions.map((c) => <ChampionCard key={c.id} champion={c} />)}
    </div>
  </div>
</section>
```

## 7. 미리보기

`npm run dev` 실행 후 첫 화면(`src/preview/DesignSystemPreview.tsx`)에서 모든 토큰과 컴포넌트를 확인할 수 있다. 실제 페이지가 만들어지면 이 미리보기는 개발용 경로로 옮기거나 삭제한다.
