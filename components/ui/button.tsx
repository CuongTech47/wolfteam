import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Nút bấm theo shadcn/ui (style new-york), bổ sung hai biến thể dùng trên nền tối
 * cho khu vực hero: `hero` và `glass`.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-55 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/70',
        outline:
          'border border-input bg-background text-foreground shadow-sm hover:border-primary/40 hover:bg-accent hover:text-accent-foreground',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/25',
        link: 'text-primary underline-offset-4 hover:underline',
        hero: 'bg-white text-navy shadow-lg shadow-navy/30 hover:bg-aqua/90',
        glass: 'border border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white/20',
      },
      size: {
        default: 'h-10 px-4 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 text-[0.8rem] has-[>svg]:px-2.5',
        lg: 'h-12 rounded-xl px-6 text-[0.95rem] has-[>svg]:px-5',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { Button, buttonVariants };
