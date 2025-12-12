import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center rounded-md text-sm font-medium px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';
  const variants: Record<typeof variant, string> = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
