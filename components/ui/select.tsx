import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Hộp chọn dùng <select> gốc của trình duyệt (không dùng Radix Select) để giữ
 * nguyên hành vi form, hỗ trợ bàn phím và mobile, đồng thời giữ hợp đồng
 * `selectOption('#payGame')` của bộ E2E.
 */
function Select({ className, children, ...props }: React.ComponentProps<'select'>) {
  return (
    <div className="relative w-full">
      <select
        data-slot="select"
        className={cn(
          'h-10 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-9 text-sm text-foreground shadow-xs transition-[color,box-shadow] outline-none',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30',
          'disabled:pointer-events-none disabled:opacity-60',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export { Select };
