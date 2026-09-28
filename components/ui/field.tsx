import * as React from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/** Nhóm nhãn + ô nhập + ghi chú, dùng chung cho các biểu mẫu của bản xem trước. */
function Field({
  label,
  htmlFor,
  hint,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  label: string;
  htmlFor?: string;
  hint?: React.ReactNode;
}) {
  return (
    <div data-slot="field" className={cn('flex flex-col gap-2', className)} {...props}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint ? <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export { Field };
