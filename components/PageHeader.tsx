import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Đầu trang dùng chung: nhãn nhỏ, tiêu đề và mô tả.
 * `titleId` được gắn lên <h1> để các trang giữ đúng id mà bộ E2E kiểm tra
 * (ví dụ #accountHeading).
 */
export function PageHeader({
  eyebrow,
  title,
  titleId,
  description,
  className,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  titleId?: string;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn('flex flex-col gap-4 pb-10', className)}>
      <span className="inline-flex w-fit items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-primary uppercase">
        <span aria-hidden className="h-px w-6 bg-primary/50" />
        {eyebrow}
      </span>
      <h1
        id={titleId}
        className="max-w-3xl text-3xl leading-tight font-extrabold tracking-tight text-navy-soft text-balance sm:text-4xl"
      >
        {title}
      </h1>
      {description ? (
        <p className="max-w-3xl text-[1.02rem] leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </header>
  );
}
