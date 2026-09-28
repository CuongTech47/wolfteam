import * as React from 'react';
import { cn } from '@/lib/utils';

function RadioGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="radio-group" className={cn('flex flex-col gap-2', className)} {...props} />;
}

/**
 * Nút chọn dùng <input type="radio"> gốc: viền dày lên khi được chọn để tạo
 * chấm tròn, nhờ đó `input[name="method"]` vẫn là input thật cho form và E2E.
 */
function Radio({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <span className={cn('relative inline-flex size-5 shrink-0 items-center justify-center', className)}>
      <input
        type="radio"
        data-slot="radio"
        className={cn(
          'peer size-5 appearance-none rounded-full border border-input bg-background shadow-xs transition-[border-width,border-color,background-color] outline-none',
          'checked:border-[6px] checked:border-primary',
          'focus-visible:ring-[3px] focus-visible:ring-ring/30',
          'disabled:pointer-events-none disabled:opacity-60',
        )}
        {...props}
      />
    </span>
  );
}

export { RadioGroup, Radio };
