'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col gap-5', className)} {...props} />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex w-full flex-wrap items-center gap-1 rounded-xl border border-border/70 bg-muted p-1 sm:w-fit',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-all outline-none sm:flex-none',
        'hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/30',
        'data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm',
        'disabled:pointer-events-none disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex flex-col gap-4 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
