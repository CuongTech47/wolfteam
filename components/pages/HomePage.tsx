'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowRight, BellRing, Gamepad2, Target, TrendingUp, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useApp } from '@/lib/app-context';
import { MOTION, trackTween, useMotion } from '@/lib/motion';

const VALUES = [
  {
    icon: Target,
    title: 'Làm sản phẩm tốt',
    text: 'Chất lượng trải nghiệm là mục tiêu gần nhất.',
  },
  {
    icon: Users,
    title: 'Lắng nghe người chơi',
    text: 'Phản hồi thực tế giúp sản phẩm tốt hơn.',
  },
  {
    icon: TrendingUp,
    title: 'Đi đường dài',
    text: 'Cải thiện liên tục, không dừng ở ngày ra mắt.',
  },
];

const FACTS = [
  { label: 'Trạng thái', value: 'Đang phát triển' },
  { label: 'Mức tuổi dự kiến', value: '18+' },
  { label: 'Kênh hỗ trợ', value: 'Sắp mở' },
];

export function HomePage() {
  const { navigate, route } = useApp();
  const heroRef = useRef<HTMLElement>(null);
  const motion = useMotion();

  /*
   * Hero: các khối nội dung lần lượt trượt lên khi mở trang, ảnh nền trôi chậm hơn khi cuộn
   * (parallax bằng ScrollTrigger). Hiệu ứng được dựng lại mỗi lần quay về trang chủ.
   */
  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero || !motion || route !== 'home') return;

      const items = gsap.utils.toArray<HTMLElement>('[data-hero-item]', hero);
      if (items.length) {
        trackTween();
        gsap.fromTo(
          items,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.09,
            ease: MOTION.ease,
            clearProps: 'opacity,transform',
          },
        );
      }

      /* Ảnh nền lớn hơn khung một chút để có chỗ trôi mà không hở mép. */
      const backdrop = hero.querySelector('#heroImage');
      if (backdrop) {
        trackTween();
        gsap.fromTo(
          backdrop,
          { yPercent: -6, scale: 1.15 },
          {
            yPercent: 6,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.4 },
          },
        );
      }
    },
    { scope: heroRef, dependencies: [route, motion], revertOnUpdate: true },
  );

  return (
    <>
      {/* Hero: ảnh nền + lớp chuyển sắc navy, nội dung nổi phía trên. */}
      <section
        ref={heroRef}
        id="hero"
        className="relative isolate overflow-hidden bg-navy text-white"
      >
        <img
          id="heroImage"
          src="/x3w-hero.png"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-[#031123]/95 via-[#03162d]/80 to-[#03162d]/20"
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-24 -z-10 size-[28rem] rounded-full bg-primary/25 blur-3xl"
        />

        <div className="shell relative flex min-h-[560px] flex-col justify-center py-16 lg:min-h-[620px]">
          <div className="max-w-2xl">
            <Badge data-hero-item variant="glass" className="tracking-[0.16em] uppercase">
              X3W.VN · We Will Win
            </Badge>
            <h1
              data-hero-item
              className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Làm tốt điều trước mắt.
              <span className="block text-aqua">Tiến về điều mình tin.</span>
            </h1>
            <p data-hero-item className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/85">
              Với chúng tôi, “win” bắt đầu từ việc làm ra một sản phẩm xứng đáng với thời gian và sự
              tin tưởng của người chơi. Chúng tôi sẽ lắng nghe phản hồi và liên tục hoàn thiện sản
              phẩm của mình.
            </p>

            <div data-hero-item className="mt-8 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" data-route="company" onClick={() => navigate('company')}>
                Tìm hiểu về X3W.VN
                <ArrowRight />
              </Button>
              <Button variant="glass" size="lg" data-route="game" onClick={() => navigate('game')}>
                <Gamepad2 />
                Xem sản phẩm
              </Button>
            </div>

            <p data-hero-item className="mt-7 text-sm font-medium tracking-wide text-white/70">
              Ba chữ W. Một niềm tin: We Will Win.
            </p>
          </div>

          <dl data-hero-item className="mt-12 grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <dt className="text-xs font-semibold tracking-[0.12em] text-white/60 uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-lg font-bold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Ý nghĩa tên gọi */}
      <section className="py-16 sm:py-20">
        <div data-reveal-group="0.12" className="shell grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="text-primary">
            <div className="text-6xl leading-none font-extrabold tracking-tighter sm:text-7xl lg:text-8xl">
              WWW
            </div>
            <small className="mt-3 block text-xs font-bold tracking-[0.2em] text-muted-foreground uppercase">
              X3W → WWW
            </small>
          </div>

          <div>
            <span className="inline-flex w-fit items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-primary uppercase">
              <span aria-hidden className="h-px w-6 bg-primary/50" />
              Ý nghĩa tên gọi
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-soft sm:text-4xl">
              We Will Win
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              X3W gợi đến ba chữ W trong “We Will Win”. Câu nói ấy vừa nhắc chúng tôi về trách nhiệm
              với sản phẩm mình tạo ra, vừa mang một ý nghĩa rộng hơn.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              “We Will Win” còn là niềm tin dành cho mỗi người trong cộng đồng: không phải ai cũng
              chọn cùng một con đường hay định nghĩa thành công giống nhau. Nhưng khi nghiêm túc với
              điều mình chọn và bền bỉ tiến lên, chúng ta có thể đến gần hơn với mục tiêu của mình.
            </p>

            <div data-reveal-group="0.08" className="mt-8 grid gap-4 sm:grid-cols-3">
              {VALUES.map((value) => (
                <Card key={value.title} className="gap-3 p-5">
                  <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="size-4" />
                  </span>
                  <h3 className="font-bold text-navy-soft">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{value.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sản phẩm đang chuẩn bị phát hành */}
      <section className="bg-card py-16 sm:py-20">
        <div data-reveal-group="0.12" className="shell grid items-center gap-10 lg:grid-cols-2">
          <div className="relative grid min-h-[260px] place-items-center overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-secondary to-accent text-center">
            <div
              aria-hidden
              className="absolute -right-10 -bottom-16 size-64 rounded-full border border-primary/25"
            />
            <span className="px-6 text-sm font-bold tracking-[0.18em] text-primary/80 uppercase">
              Hình ảnh game · chờ tư liệu chính thức
            </span>
          </div>

          <div>
            <span className="inline-flex w-fit items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-primary uppercase">
              <span aria-hidden className="h-px w-6 bg-primary/50" />
              Sản phẩm đang chuẩn bị phát hành
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-soft sm:text-4xl">
              Game đầu tiên của chúng tôi
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Một trang riêng sẽ giới thiệu nội dung, hình ảnh thật, phân loại độ tuổi và kênh hỗ trợ
              khi các thông tin được chốt.
            </p>
            <Badge variant="warning" className="mt-5">
              Dự kiến 18+ · Chờ kết quả phân loại
            </Badge>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button data-route="game" onClick={() => navigate('game')}>
                <Gamepad2 />
                Xem trang game
              </Button>
              <Button variant="outline" data-route="payment" onClick={() => navigate('payment')}>
                Cổng nạp minh họa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Thông báo */}
      <section className="py-16 pb-20 sm:py-20">
        <div className="shell">
          <span className="inline-flex w-fit items-center gap-2 text-xs font-extrabold tracking-[0.16em] text-primary uppercase">
            <span aria-hidden className="h-px w-6 bg-primary/50" />
            Thông tin chính thức
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-soft sm:text-4xl">
            Thông báo quan trọng
          </h2>

          <Card data-reveal="up" className="mt-7 flex-row flex-wrap items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <BellRing className="size-5" />
              </span>
              <div>
                <strong className="text-navy-soft">Chưa có thông báo</strong>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Thông tin phát hành và vận hành sẽ được cập nhật tại đây.
                </p>
              </div>
            </div>
            <Button variant="outline" data-route="notice" onClick={() => navigate('notice')}>
              Xem thông báo
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
}
