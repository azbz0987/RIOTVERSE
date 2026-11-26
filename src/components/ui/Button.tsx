import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-display font-semibold uppercase transition-[color,background-color,border-color,box-shadow,transform] duration-base ease-cinematic active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40';

const variants: Record<ButtonVariant, string> = {
  // Gold fill — one per view, the main call to action.
  primary:
    'bg-primary text-text-inverse hover:bg-primary-hover hover:shadow-glow-primary active:bg-primary-pressed [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]',
  // Gold outline — secondary actions next to a primary.
  secondary:
    'border border-primary/70 bg-primary/5 text-primary hover:border-primary hover:bg-primary/15 hover:text-primary-hover [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]',
  // Text only — tertiary actions, toolbars.
  ghost: 'rounded-md text-text-secondary hover:bg-surface hover:text-text',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs tracking-[0.12em]',
  md: 'h-11 px-6 text-sm tracking-[0.14em]',
  lg: 'h-14 px-8 text-sm tracking-[0.18em] md:text-base',
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: Pick<CommonProps, 'variant' | 'size' | 'fullWidth' | 'className'>) {
  return cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);
}

function Content({ leftIcon, rightIcon, children }: Pick<CommonProps, 'leftIcon' | 'rightIcon' | 'children'>) {
  return (
    <>
      {leftIcon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && (
        <span className="shrink-0 transition-transform duration-base ease-cinematic group-hover:translate-x-0.5 [&>svg]:h-4 [&>svg]:w-4">
          {rightIcon}
        </span>
      )}
    </>
  );
}

/** Primary / Secondary / Ghost button. Use <ButtonLink> for navigation. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, leftIcon, rightIcon, fullWidth, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonClasses({ variant, size, fullWidth, className })} {...rest}>
      <Content leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Content>
    </button>
  );
});

type ButtonLinkProps = CommonProps & { to: string };

/** Same look as Button, rendered as a router link. */
export function ButtonLink({ to, variant, size, leftIcon, rightIcon, fullWidth, className, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={buttonClasses({ variant, size, fullWidth, className })}>
      <Content leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </Content>
    </Link>
  );
}
