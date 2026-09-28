'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useApp } from '@/lib/app-context';
import { MOTION, refreshScrollSoon, trackTween, useMotion, useReveal } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Route } from '@/lib/types';

/**
 * Khung của một "trang" trong SPA.
 * Giữ đúng hợp đồng của bản gốc: mọi trang đều nằm trong DOM với id riêng, trang
 * đang xem nhận class "active", các trang còn lại bị ẩn.
 *
 * Phần chuyển động do GSAP đảm nhiệm: mỗi lần trang được mở, nội dung trượt nhẹ vào;
 * các khối có `data-reveal`/`data-reveal-group` bên trong hiện ra khi cuộn tới.
 */
export function PageSlot({ id, children }: { id: Route; children: ReactNode }) {
  const { route } = useApp();
  const active = route === id;
  const ref = useRef<HTMLDivElement>(null);
  const motion = useMotion();

  useReveal(ref, active);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || !active || !motion) return;

      trackTween();
      gsap.fromTo(
        root,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.enter,
          ease: MOTION.ease,
          clearProps: 'opacity,transform',
        },
      );

      /* Trang vừa hiện: đo lại vị trí cho các hiệu ứng cuộn ở bên trong. */
      refreshScrollSoon();
    },
    { scope: ref, dependencies: [route, active, motion], revertOnUpdate: true },
  );

  return (
    <div ref={ref} id={id} className={cn('page', active ? 'active' : 'hidden')}>
      {children}
    </div>
  );
}
