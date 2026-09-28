import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Khối nội dung thu gọn dựa trên <details>/<summary> gốc của trình duyệt
 * (không kèm JavaScript phía client), phù hợp cho phần hỏi đáp tĩnh.
 */
function Accordion({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="accordion" className={cn('flex flex-col gap-3', className)} {...props} />;
}

function AccordionItem({ className, ...props }: React.ComponentProps<'details'>) {
  return (
    <details
      data-slot="accordion-item"
      className={cn(
        'group rounded-lg border border-border/80 bg-card px-4 py-3 transition-colors open:border-primary/30 open:bg-accent/30',
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: React.ComponentProps<'summary'>) {
  return (
    <summary
      data-slot="accordion-trigger"
      className={cn(
        'flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-navy-soft outline-none marker:content-none',
        '[&::-webkit-details-marker]:hidden',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
      />
    </summary>
  );
}

function AccordionContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="accordion-content"
      className={cn('pt-3 text-sm leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
