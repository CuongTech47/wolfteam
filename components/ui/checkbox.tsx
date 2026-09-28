import * as React from 'react';
import { CheckIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Ô đánh dấu dùng <input type="checkbox"> gốc, tạo dáng bằng Tailwind.
 * Giữ input thật (thay vì dựng trên <button> như Radix Checkbox) để biểu mẫu,
 * validate của trình duyệt và `page.check()` trong E2E hoạt động như bản gốc.
 */
function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <span className={cn('relative inline-flex size-5 shrink-0 items-center justify-center', className)}>
      <input
        type="checkbox"
        data-slot="checkbox"
        className={cn(
          'peer size-5 appearance-none rounded-md border border-input bg-background shadow-xs transition-colors outline-none',
          'checked:border-primary checked:bg-primary',
          'focus-visible:ring-[3px] focus-visible:ring-ring/30',
          'disabled:pointer-events-none disabled:opacity-60',
        )}
        {...props}
      />
      <CheckIcon
        aria-hidden
        className="pointer-events-none absolute size-3.5 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100"
      />
    </span>
  );
}

export { Checkbox };
