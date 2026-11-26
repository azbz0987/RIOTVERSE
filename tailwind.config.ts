import type { Config } from 'tailwindcss';

/** Maps a CSS variable that holds RGB channels to a Tailwind color with opacity support. */
const rgb = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

/**
 * RIOTVERSE Tailwind theme. Every value points at a CSS variable in
 * src/styles/tokens.css, so tokens live in one place.
 * Components must use these names only — no raw hex values in JSX.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Breakpoints: mobile < 768 · tablet 768–1023 · laptop 1024–1439 · desktop ≥ 1440
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        bg: { DEFAULT: rgb('bg'), deep: rgb('bg-deep') },
        surface: {
          DEFAULT: rgb('surface'),
          raised: rgb('surface-raised'),
          overlay: rgb('surface-overlay'),
        },
        border: { DEFAULT: rgb('border'), strong: rgb('border-strong') },
        primary: {
          DEFAULT: rgb('primary'),
          hover: rgb('primary-hover'),
          pressed: rgb('primary-pressed'),
          soft: rgb('primary-soft'),
        },
        accent: {
          DEFAULT: rgb('accent'),
          hover: rgb('accent-hover'),
          soft: rgb('accent-soft'),
        },
        text: {
          DEFAULT: rgb('text'),
          secondary: rgb('text-secondary'),
          muted: rgb('text-muted'),
          inverse: rgb('text-inverse'),
        },
        success: rgb('success'),
        warning: rgb('warning'),
        danger: rgb('danger'),
        info: rgb('info'),
        difficulty: {
          easy: rgb('difficulty-easy'),
          normal: rgb('difficulty-normal'),
          hard: rgb('difficulty-hard'),
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        sans: 'var(--font-sans)',
        data: 'var(--font-data)',
      },
      // [size, { lineHeight, letterSpacing, fontWeight }]
      // Display sizes scale fluidly between mobile and desktop with clamp().
      fontSize: {
        'display-xl': ['clamp(2.75rem, 1.6rem + 4.8vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '0.04em', fontWeight: '700' }],
        'display-lg': ['clamp(2.25rem, 1.5rem + 3.2vw, 4rem)', { lineHeight: '1.1', letterSpacing: '0.04em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 1.3rem + 1.9vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '0.05em', fontWeight: '600' }],
        'display-sm': ['clamp(1.25rem, 1.05rem + 0.8vw, 1.75rem)', { lineHeight: '1.25', letterSpacing: '0.06em', fontWeight: '600' }],
        'heading-lg': ['clamp(1.5rem, 1.3rem + 0.8vw, 2rem)', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-md': ['clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-sm': ['1.125rem', { lineHeight: '1.45', letterSpacing: '-0.005em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.75', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        overline: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.28em', fontWeight: '600' }],
        'data-lg': ['clamp(2rem, 1.6rem + 1.6vw, 3rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'data-md': ['1.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'data-sm': ['0.8125rem', { lineHeight: '1.3', fontWeight: '500' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        raised: 'var(--shadow-raised)',
        'glow-primary': 'var(--glow-primary)',
        'glow-accent': 'var(--glow-accent)',
      },
      backgroundImage: {
        'gradient-gold': 'var(--gradient-gold)',
        'scrim-bottom': 'var(--gradient-scrim-bottom)',
        'scrim-left': 'var(--gradient-scrim-left)',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        header: 'var(--header-height)',
        section: 'var(--section-gap)',
      },
      zIndex: {
        header: 'var(--z-header)',
        overlay: 'var(--z-overlay)',
        modal: 'var(--z-modal)',
        toast: 'var(--z-toast)',
      },
      transitionTimingFunction: {
        cinematic: 'var(--ease-cinematic)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '500ms',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s var(--ease-cinematic) infinite',
        'spin-slow': 'spin-slow 1.4s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
