import type { Transition, Variants } from 'framer-motion';

/** Motion tokens — mirror --ease-cinematic and --duration-* in tokens.css. */
export const EASE_CINEMATIC = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.5,
} as const;

export const transition = {
  base: { duration: DURATION.base, ease: EASE_CINEMATIC } satisfies Transition,
  slow: { duration: DURATION.slow, ease: EASE_CINEMATIC } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.slow },
};

export const staggerChildren = (stagger = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});
