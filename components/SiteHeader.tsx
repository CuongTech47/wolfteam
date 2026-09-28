'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { LogIn, Menu, ShieldCheck, Swords, UserPlus, UserRound, Wallet, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useApp } from '@/lib/app-context';
import { popIn, popScale, useMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { Route } from '@/lib/types';

const NAV_ITEMS: { route: Route; label: string }[] = [
  { route: 'home', label: 'Trang chủ' },
  { route: 'company', label: 'Giới thiệu' },
  { route: 'game', label: 'Game' },
  { route: 'notice', label: 'Thông báo' },
  { route: 'help', label: 'Hỗ trợ' },
];

export function SiteHeader() {
  const { navigate, route, navOpen, toggleNav, accountLabel, user, verified, openRegister } =
    useApp();
  const accountRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const motion = useMotion();

  /* Nhãn tài khoản đổi (chưa đăng nhập / chờ OTP / đã xác thực) thì nút nảy nhẹ. */
  useGSAP(
    () => {
      if (motion) popScale(accountRef.current, { scale: 0.9 });
    },
    { dependencies: [accountLabel, user, verified] },
  );

  /* Menu mobile bung ra khi mở. */
  useGSAP(
    () => {
      if (motion && navOpen) popIn(navRef.current, { y: -12, duration: 0.3 });
    },
    { dependencies: [navOpen] },
  );

  return (
    <header
      id="siteHeader"
      className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md"
    >
      <div className="shell relative flex min-h-[72px] items-center gap-3 lg:gap-8">
        <Button
          variant="ghost"
          size="icon"
          id="menuToggle"
          className="lg:hidden"
          aria-label="Mở menu"
          aria-expanded={navOpen}
          aria-controls="nav"
          onClick={toggleNav}
        >
          {navOpen ? <X /> : <Menu />}
        </Button>

        <a
          href="#home"
          className="group flex items-center gap-2.5"
          onClick={(event) => {
            event.preventDefault();
            navigate('home');
          }}
        >
          <span className="brand-gradient grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
            <Swords className="size-5" />
          </span>
          <span id="logoBrand" className="text-[1.05rem] font-extrabold tracking-tight text-navy-soft">
            X3W
            <span className="text-primary">
              <em className="not-italic">.VN</em>
            </span>
          </span>
        </a>

        <nav
          ref={navRef}
          id="nav"
          className={cn(
            'absolute top-full right-0 left-0 flex-col gap-1 border-b border-border/70 bg-background p-4 shadow-lg',
            'lg:static lg:flex lg:flex-1 lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none',
            navOpen ? 'flex' : 'hidden lg:flex',
          )}
        >
          {NAV_ITEMS.map((item) => {
            const active = route === item.route;

            return (
              <button
                key={item.route}
                type="button"
                data-route={item.route}
                data-active={active}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full px-3.5 py-2 text-left text-sm font-semibold transition-colors lg:text-center',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
                onClick={() => navigate(item.route)}
              >
                {item.label}
              </button>
            );
          })}
          {/*
            Dưới `sm` nút đăng ký ngoài header được thay bằng mục này trong menu mở ra, để header
            trên điện thoại không bị tràn.
          */}
          {!user && (
            <Button id="registerNav" className="mt-2 sm:hidden" onClick={openRegister}>
              <UserPlus />
              Đăng ký
            </Button>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            data-route="payment"
            className="hidden sm:inline-flex"
            onClick={() => navigate('payment')}
          >
            <Wallet />
            Nạp tiền
          </Button>
          <Button
            ref={accountRef}
            id="accountTop"
            data-route="account"
            variant={user ? (verified ? 'default' : 'secondary') : 'outline'}
            onClick={() => navigate('account')}
          >
            {user ? verified ? <ShieldCheck /> : <UserRound /> : <LogIn />}
            {accountLabel}
          </Button>
          {/*
            Nút đăng ký nằm ngoài header, ngay cạnh nút đăng nhập: mở thẳng trang tài khoản ở tab
            đăng ký. Ẩn khi phiên xem trước đã có tài khoản; dưới `sm` nút này nhường chỗ cho mục
            "Đăng ký" trong menu mở ra (#registerNav) để header không bị tràn như nút "Nạp tiền".
          */}
          {!user && (
            <Button id="registerTop" className="hidden sm:inline-flex" onClick={openRegister}>
              <UserPlus />
              Đăng ký
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export { NAV_ITEMS };
