'use client';

import * as React from 'react';
import { useGSAP } from '@gsap/react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { MinusIcon } from 'lucide-react';

import { popScale, useMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Ô nhập OTP theo shadcn/ui (dựng trên thư viện `input-otp`).
 * Toàn bộ props (kể cả `id`, `value`, `onChange`, `pattern`) được chuyển xuống <input> thật,
 * nên nhãn `<label htmlFor>` và bộ E2E vẫn thao tác được như một ô nhập thường.
 */
function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        'flex items-center gap-2 has-disabled:opacity-50 sm:gap-3',
        containerClassName,
      )}
      className={cn('disabled:cursor-not-allowed', className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-group" className={cn('flex items-center', className)} {...props} />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  index: number;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  const slotRef = React.useRef<HTMLDivElement>(null);
  const motion = useMotion();

  /* Mỗi ký tự vừa nhận được làm ô nảy nhẹ để người chơi biết đã ghi nhận. */
  useGSAP(
    () => {
      if (!motion || !char) return;
      popScale(slotRef.current, { scale: 0.88, duration: 0.28 });
    },
    { dependencies: [char], scope: slotRef },
  );

  return (
    <div
      ref={slotRef}
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        'relative flex size-10 items-center justify-center border-y border-r border-input bg-background text-base font-semibold text-navy-soft shadow-xs transition-[color,box-shadow,border-color] outline-none sm:size-12 sm:text-lg max-[380px]:size-9',
        'first:rounded-l-lg first:border-l last:rounded-r-lg',
        'data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/30',
        'aria-invalid:border-destructive aria-invalid:text-destructive',
        'data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20',
        'dark:bg-input/30',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-5 w-px bg-foreground duration-1000" />
        </div>
      ) : null}
    </div>
  );
}

/** Dấu gạch ngăn cách giữa hai nhóm số của mã OTP. */
function InputOTPSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className={cn(
        "text-muted-foreground [&_svg:not([class*='size-'])]:size-4 max-[380px]:hidden",
        className,
      )}
      {...props}
    >
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
