import * as React from 'react';

import { cn } from '@/lib/utils';

/** Thanh tiến trình đơn giản cho hạn mức nạp trong ngày. */
function Progress({
  value = 0,
  className,
  ...props
}: React.ComponentProps<'div'> & { value?: number }) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(safe)}
      className={cn('h-2 w-full overflow-hidden rounded-full bg-muted', className)}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="brand-gradient h-full rounded-full transition-[width] duration-500"
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

export { Progress };
