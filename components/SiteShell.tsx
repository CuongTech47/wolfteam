'use client';

import { Info } from 'lucide-react';

import { PageSlot } from '@/components/PageSlot';
import { PaymentModal } from '@/components/PaymentModal';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { AccountPage } from '@/components/pages/AccountPage';
import { CompanyPage } from '@/components/pages/CompanyPage';
import { GamePage } from '@/components/pages/GamePage';
import { HelpPage } from '@/components/pages/HelpPage';
import { HomePage } from '@/components/pages/HomePage';
import { NoticePage } from '@/components/pages/NoticePage';
import { PaymentPage } from '@/components/pages/PaymentPage';
import { PoliciesPage } from '@/components/pages/PoliciesPage';
import { AppProvider } from '@/lib/app-context';

/**
 * Bố cục chung của site: topline, header, 8 trang của SPA, footer và hộp thoại xác nhận.
 * Mọi trang đều được render trong DOM như bản gốc; trang đang xem nhận class "active".
 */
export function SiteShell() {
  return (
    <AppProvider>
      <div
        id="topline"
        className="brand-gradient px-4 py-2 text-center text-[0.76rem] leading-relaxed font-semibold tracking-wide text-white/95"
      >
        <span className="mx-auto flex max-w-6xl items-center justify-center gap-2">
          <Info aria-hidden className="size-3.5 shrink-0" />
          BẢN XEM TRƯỚC · GIAO DIỆN VÀ GIAO DỊCH MINH HỌA, KHÔNG THU THẬP DỮ LIỆU / THANH TOÁN THẬT
        </span>
      </div>

      <SiteHeader />

      <main className="flex flex-col">
        <PageSlot id="home">
          <HomePage />
        </PageSlot>
        <PageSlot id="company">
          <CompanyPage />
        </PageSlot>
        <PageSlot id="game">
          <GamePage />
        </PageSlot>
        <PageSlot id="notice">
          <NoticePage />
        </PageSlot>
        <PageSlot id="account">
          <AccountPage />
        </PageSlot>
        <PageSlot id="payment">
          <PaymentPage />
        </PageSlot>
        <PageSlot id="policies">
          <PoliciesPage />
        </PageSlot>
        <PageSlot id="help">
          <HelpPage />
        </PageSlot>
      </main>

      <SiteFooter />
      <PaymentModal />
    </AppProvider>
  );
}
