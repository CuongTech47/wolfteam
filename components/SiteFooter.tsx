'use client';

import { useRef } from 'react';
import { Swords } from 'lucide-react';

import { useApp } from '@/lib/app-context';
import { useReveal } from '@/lib/motion';
import type { Route } from '@/lib/types';

const LINK_GROUPS: { title: string; links: { route: Route; label: string }[] }[] = [
  {
    title: 'Về chúng tôi',
    links: [
      { route: 'company', label: 'Giới thiệu' },
      { route: 'game', label: 'Game' },
      { route: 'notice', label: 'Thông báo' },
    ],
  },
  {
    title: 'Hỗ trợ & chính sách',
    links: [
      { route: 'help', label: 'Hỗ trợ người chơi' },
      { route: 'policies', label: 'Trung tâm chính sách' },
      { route: 'payment', label: 'Cổng nạp minh họa' },
    ],
  },
];

export function SiteFooter() {
  const { navigate } = useApp();
  const footerRef = useRef<HTMLElement>(null);

  /* Chân trang luôn hiển thị nên chỉ cần hiệu ứng cuộn tới cho các nhóm liên kết. */
  useReveal(footerRef, true);

  return (
    <footer ref={footerRef} className="mt-20 border-t border-white/10 bg-navy text-white/75">
      <div data-reveal-group="0.1" className="shell grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 text-white">
            <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-aqua">
              <Swords className="size-5" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">X3W.VN</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            Ba chữ W. Một niềm tin: We Will Win. Đây là bản xem trước giao diện, không vận hành dịch
            vụ thật và không thu thập dữ liệu người chơi.
          </p>
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} X3W.VN · Bản xem trước giao diện.
          </p>
        </div>

        {LINK_GROUPS.map((group) => (
          <nav key={group.title} className="footer-links flex flex-col gap-3">
            <h2 className="text-xs font-bold tracking-[0.16em] text-white/55 uppercase">
              {group.title}
            </h2>
            {group.links.map((link) => (
              <button
                key={link.route}
                type="button"
                data-route={link.route}
                className="w-fit text-sm font-medium text-white/80 transition-colors hover:text-aqua"
                onClick={() => navigate(link.route)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        ))}
      </div>
    </footer>
  );
}
