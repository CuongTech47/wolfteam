'use client';

/**
 * Tầng animation dùng chung của site (GSAP + ScrollTrigger, hook `useGSAP` của @gsap/react).
 *
 * Nguyên tắc để không phá vỡ hợp đồng DOM mà bộ E2E kiểm tra:
 * - Trạng thái "ẩn để chờ hiện" chỉ do JS đặt, không có trong CSS: nếu bundle lỗi thì nội dung
 *   vẫn hiện đầy đủ (progressive enhancement).
 * - Mọi hiệu ứng đều kết thúc ở trạng thái tự nhiên và `clearProps` để không còn style inline.
 * - Tôn trọng `prefers-reduced-motion`: khi người chơi bật giảm chuyển động thì không tạo hiệu ứng.
 * - `html[data-motion]` cùng `window.__x3wMotion` là mốc để bộ E2E xác nhận GSAP đã chạy.
 */
import { useEffect, useState, type RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Nhịp điệu chung cho mọi hiệu ứng của site. */
export const MOTION = {
  ease: 'power3.out',
  enter: 0.55,
  reveal: 0.7,
  micro: 0.35,
  stagger: 0.08,
} as const;

gsap.defaults({ duration: MOTION.enter, ease: MOTION.ease });

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

type MotionState = {
  /** Phiên bản GSAP đang chạy trên trình duyệt. */
  gsap: string;
  /** Người chơi có đang bật chế độ giảm chuyển động không? */
  reduce: boolean;
  /** Số hiệu ứng đã được tạo trong phiên làm việc. */
  tweens: number;
};

declare global {
  interface Window {
    /** Mốc trạng thái chuyển động dành cho devtools và bộ E2E. */
    __x3wMotion?: MotionState;
  }
}

/** Ghi mốc trạng thái chuyển động lên `<html>` và `window`. */
function markMotion(reduce: boolean) {
  if (typeof window === 'undefined') return;
  const state: MotionState = window.__x3wMotion ?? { gsap: gsap.version, reduce, tweens: 0 };
  state.gsap = gsap.version;
  state.reduce = reduce;
  window.__x3wMotion = state;
  document.documentElement.dataset.motion = reduce ? 'reduced' : 'full';
}

/** Đếm số hiệu ứng đã tạo (bộ E2E dùng để xác nhận animation thực sự chạy). */
export function trackTween() {
  if (typeof window !== 'undefined' && window.__x3wMotion) window.__x3wMotion.tweens += 1;
}

/** Người chơi có bật "giảm chuyển động" trong hệ điều hành/trình duyệt không? */
export function motionAllowed() {
  return typeof window === 'undefined' ? false : !window.matchMedia(REDUCE_QUERY).matches;
}

/**
 * Theo dõi cài đặt giảm chuyển động; trả về `true` khi được phép chạy animation.
 * Giá trị này chỉ dùng trong hiệu ứng (không dùng trong markup) nên không gây lệch hydrate.
 */
export function useMotion() {
  const [enabled, setEnabled] = useState(motionAllowed);

  useEffect(() => {
    const query = window.matchMedia(REDUCE_QUERY);
    const sync = () => {
      setEnabled(!query.matches);
      markMotion(query.matches);
    };

    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  return enabled;
}

/** Đo lại vị trí các hiệu ứng cuộn (gọi sau khi đổi trang hoặc đổi dữ liệu làm đổi chiều cao). */
export function refreshScrollSoon() {
  if (typeof window === 'undefined') return;
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** Trượt nhẹ vào chỗ: dùng cho thông báo và khối vừa xuất hiện. */
export function popIn(
  target: gsap.TweenTarget,
  options: { y?: number; duration?: number; delay?: number } = {},
) {
  if (!target) return undefined;
  const { y = -8, duration = MOTION.micro, delay = 0 } = options;

  trackTween();
  return gsap.fromTo(
    target,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: MOTION.ease, clearProps: 'opacity,transform' },
  );
}

/** "Nảy" nhẹ khi người chơi chọn một mục hoặc khi một trạng thái vừa thay đổi. */
export function popScale(
  target: gsap.TweenTarget,
  options: { scale?: number; duration?: number } = {},
) {
  if (!target) return undefined;
  const { scale = 0.94, duration = 0.4 } = options;

  trackTween();
  return gsap.fromTo(
    target,
    { scale },
    { scale: 1, duration, ease: 'back.out(2)', clearProps: 'transform' },
  );
}

/** Rung nhẹ khi dữ liệu nhập không hợp lệ; luôn kết thúc ở đúng vị trí ban đầu. */
export function shake(
  target: gsap.TweenTarget,
  options: { amount?: number; duration?: number } = {},
) {
  if (!target) return undefined;
  const { amount = 7, duration = 0.5 } = options;

  trackTween();
  return gsap.fromTo(
    target,
    { x: -amount },
    { x: 0, duration, ease: 'elastic.out(1, 0.4)', stagger: 0.02, clearProps: 'transform' },
  );
}

/** Các kiểu xuất hiện khi cuộn tới, chọn bằng giá trị của thuộc tính `data-reveal`. */
const REVEAL_VARIANTS = {
  up: { opacity: 0, y: 24 },
  fade: { opacity: 0 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  zoom: { opacity: 0, scale: 0.94 },
} as const;

export type RevealVariant = keyof typeof REVEAL_VARIANTS;

/**
 * Cho các phần tử trong `scope` xuất hiện khi cuộn tới:
 * - `data-reveal="up|fade|left|right|zoom"` cho từng phần tử, kèm `data-reveal-delay` nếu cần;
 * - `data-reveal-group="0.08"` cho khối mà các phần tử con lần lượt hiện ra.
 *
 * Chỉ dựng hiệu ứng cho trang đang xem (`active`) để không đo nhầm khi trang còn bị ẩn;
 * khi đổi trang, `useGSAP` tự thu hồi hiệu ứng của lần dựng trước.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, active: boolean) {
  const motion = useMotion();
  const ready = motion && active;

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || !ready) return;

      gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((el) => {
        const variant = (el.dataset.reveal || 'up') as RevealVariant;
        const from = REVEAL_VARIANTS[variant] ?? REVEAL_VARIANTS.up;

        trackTween();
        gsap.fromTo(
          el,
          { ...from },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: MOTION.reveal,
            delay: Number(el.dataset.revealDelay ?? 0),
            ease: MOTION.ease,
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-group]', root).forEach((el) => {
        const children = Array.from(el.children) as HTMLElement[];
        if (!children.length) return;

        trackTween();
        gsap.fromTo(
          children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: MOTION.reveal,
            stagger: Number(el.dataset.revealGroup || MOTION.stagger),
            ease: MOTION.ease,
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });
    },
    { scope, dependencies: [ready], revertOnUpdate: true },
  );
}