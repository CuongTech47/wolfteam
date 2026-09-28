'use client';

import { useRef, useState, type FormEvent } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  BadgeCheck,
  CalendarDays,
  CircleAlert,
  KeyRound,
  LogIn,
  LogOut,
  Phone,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
  UserPlus,
  UserRound,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/lib/app-context';
import { popIn, shake, useMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { AccountTab } from '@/lib/types';

const STEP_LIST = [
  'Đăng ký và khai báo ngày sinh',
  'Đăng nhập tài khoản',
  'Xác thực OTP số điện thoại',
  'Chỉ tài khoản đủ tuổi và đã xác thực mới được tiếp tục',
];

/**
 * Dòng thông báo của biểu mẫu.
 * Luôn nằm trong DOM (ẩn khi không có nội dung) để giữ id ổn định cho bộ E2E.
 */
function FormMessage({
  id,
  message,
  tone = 'destructive',
  ref,
}: {
  id: string;
  message: string;
  tone?: 'destructive' | 'success';
  /** Để trang gắn hiệu ứng trượt vào mỗi khi có thông báo mới. */
  ref?: React.Ref<HTMLDivElement>;
}) {
  return (
    <Alert id={id} ref={ref} variant={tone} className={cn(message ? '' : 'hidden')}>
      {tone === 'success' ? <BadgeCheck /> : <TriangleAlert />}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

/** Ô nhập có biểu tượng ở đầu, dùng cho các trường cần nhận diện nhanh. */
function IconInput({
  icon: Icon,
  className,
  ...props
}: React.ComponentProps<'input'> & { icon: LucideIcon }) {
  return (
    <div className="relative">
      <Icon
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input className={cn('pl-10', className)} {...props} />
    </div>
  );
}

export function AccountPage() {
  const {
    navigate,
    accountHeading,
    accountTab,
    accountStateVisible,
    verifyPhone,
    selectAccountTab,
    createAccount,
    signIn,
    verifyOtp,
    signOut,
  } = useApp();

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [otp, setOtp] = useState('');

  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');

  const pageRef = useRef<HTMLDivElement>(null);
  const loginErrorRef = useRef<HTMLDivElement>(null);
  const registerErrorRef = useRef<HTMLDivElement>(null);
  const verifyErrorRef = useRef<HTMLDivElement>(null);
  const motion = useMotion();

  const formsVisible = !accountStateVisible;
  const loginVisible = formsVisible && accountTab === 'login';
  const registerVisible = formsVisible && accountTab === 'register';
  const verifyVisible = formsVisible && accountTab === 'verify';

  /* Trạng thái lỗi của mã OTP: tô viền đỏ cho từng ô qua `aria-invalid` trên slot. */
  const otpInvalid = verifyMessage ? true : undefined;

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = createAccount({ name, birth, phone, pass });
    if (!result.ok) {
      setRegisterMessage(result.message ?? '');
      return;
    }
    /* Tài khoản minh họa đã tạo: chuyển sang tab đăng nhập và điền sẵn số điện thoại. */
    setRegisterMessage('');
    setLoginPhone(phone.trim());
    setLoginPass('');
    setLoginMessage('Tài khoản minh họa đã tạo. Đăng nhập để tiếp tục xác thực.');
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = signIn(loginPhone, loginPass);
    if (!result.ok) {
      setLoginMessage(result.message ?? '');
      return;
    }
    setLoginMessage('');
  };

  const handleVerify = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = verifyOtp(otp);
    if (!result.ok) {
      setVerifyMessage(result.message ?? '');
      return;
    }
    setVerifyMessage('');
  };

  /** Xoá thông báo lỗi cũ ngay khi người chơi nhập lại mã (giống các biểu mẫu khác). */
  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (verifyMessage) setVerifyMessage('');
  };

  const handleLogout = () => {
    signOut();
    /* Tương đương form.reset() của bản gốc: xóa giá trị đã nhập. */
    setName('');
    setBirth('');
    setPhone('');
    setPass('');
    setLoginPhone('');
    setLoginPass('');
    setOtp('');
  };

  /*
   * Hiệu ứng GSAP cho các trạng thái của biểu mẫu: thông báo mới trượt nhẹ vào, và các nhóm ô
   * OTP rung khi mã nhập sai. Cả hai đều tự trở về trạng thái ban đầu nên không lệch bố cục.
   */
  useGSAP(
    () => {
      if (motion && loginMessage) popIn(loginErrorRef.current);
    },
    { dependencies: [loginMessage], scope: pageRef },
  );

  useGSAP(
    () => {
      if (motion && registerMessage) popIn(registerErrorRef.current);
    },
    { dependencies: [registerMessage], scope: pageRef },
  );

  useGSAP(
    () => {
      if (motion && verifyMessage) popIn(verifyErrorRef.current);
    },
    { dependencies: [verifyMessage], scope: pageRef },
  );

  useGSAP(
    () => {
      const root = pageRef.current;
      if (!motion || !verifyMessage || !root) return;

      shake(
        gsap.utils.toArray<HTMLElement>(
          '[data-slot="input-otp-group"], [data-slot="input-otp-separator"]',
          root,
        ),
      );
    },
    { dependencies: [verifyMessage], scope: pageRef },
  );

  return (
    <div ref={pageRef} className="shell py-12 pb-20 sm:py-16">
      <PageHeader
        eyebrow="Tài khoản người chơi"
        title={accountHeading}
        titleId="accountHeading"
        description="Tạo tài khoản bằng số điện thoại và thông tin cá nhân. Sau khi đăng nhập, tài khoản chưa xác thực sẽ được yêu cầu xác thực số điện thoại trước khi vào game hoặc nạp tiền."
      />

      <div data-reveal-group="0.12" className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Luồng xác thực</CardTitle>
            <CardDescription>Bốn bước để mở khóa cổng nạp minh họa.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col gap-3">
              {STEP_LIST.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-sm">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <Alert variant="info">
              <CircleAlert />
              <AlertDescription>
                Người chưa đủ 18 tuổi theo ngày sinh khai báo sẽ không được tiếp tục trong bản dự kiến
                này.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-1">
              <CardTitle>Đăng nhập hoặc tạo tài khoản</CardTitle>
              <CardDescription>
                Dữ liệu chỉ nằm trong phiên trình duyệt của bản xem trước.
              </CardDescription>
            </div>
            <Badge variant="outline">Minh họa</Badge>
          </CardHeader>

          <CardContent>
            <Tabs
              value={accountTab ?? 'login'}
              onValueChange={(value) => selectAccountTab(value as AccountTab)}
            >
              <TabsList aria-label="Chọn bước tài khoản">
                <TabsTrigger value="login" data-account-tab="login">
                  <LogIn />
                  Đăng nhập
                </TabsTrigger>
                <TabsTrigger value="register" data-account-tab="register">
                  <UserPlus />
                  Đăng ký
                </TabsTrigger>
                <TabsTrigger value="verify" data-account-tab="verify">
                  <Smartphone />
                  Xác thực OTP
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form
              id="registerForm"
              hidden={!registerVisible}
              onSubmit={handleRegister}
              className="flex flex-col gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Họ và tên" htmlFor="registerName">
                  <IconInput
                    id="registerName"
                    icon={UserRound}
                    type="text"
                    autoComplete="off"
                    placeholder="Nguyễn Văn A"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Field>

                <Field
                  label="Ngày sinh"
                  htmlFor="registerBirth"
                  hint="Người chưa đủ 18 tuổi theo ngày sinh khai báo sẽ không được tiếp tục trong bản dự kiến này."
                >
                  <IconInput
                    id="registerBirth"
                    icon={CalendarDays}
                    type="date"
                    required
                    value={birth}
                    onChange={(event) => setBirth(event.target.value)}
                  />
                </Field>

                <Field label="Số điện thoại Việt Nam" htmlFor="registerPhone">
                  <IconInput
                    id="registerPhone"
                    icon={Phone}
                    type="tel"
                    inputMode="tel"
                    autoComplete="off"
                    placeholder="09xxxxxxxx"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Field>

                <Field label="Mật khẩu" htmlFor="registerPass" hint="Tối thiểu 8 ký tự.">
                  <IconInput
                    id="registerPass"
                    icon={KeyRound}
                    type="password"
                    autoComplete="off"
                    minLength={8}
                    required
                    value={pass}
                    onChange={(event) => setPass(event.target.value)}
                  />
                </Field>
              </div>

              <Label
                htmlFor="acceptTerms"
                className="items-start gap-3 text-sm font-normal text-muted-foreground"
              >
                <Checkbox id="acceptTerms" name="acceptTerms" required className="mt-0.5" />
                <span>
                  Tôi đồng ý với{' '}
                  <a href="#policies" className="font-semibold text-primary underline underline-offset-4">
                    điều khoản sử dụng và chính sách bảo mật
                  </a>
                  .
                </span>
              </Label>

              <FormMessage ref={registerErrorRef} id="registerError" message={registerMessage} />

              <Button type="submit" className="w-fit">
                <UserPlus />
                Tạo tài khoản
              </Button>
            </form>

            <form
              id="loginForm"
              hidden={!loginVisible}
              onSubmit={handleLogin}
              className="flex flex-col gap-5"
            >
              <Field label="Số điện thoại" htmlFor="loginPhone">
                <IconInput
                  id="loginPhone"
                  icon={Phone}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="09xxxxxxxx"
                  required
                  value={loginPhone}
                  onChange={(event) => setLoginPhone(event.target.value)}
                />
              </Field>

              <Field label="Mật khẩu" htmlFor="loginPass">
                <IconInput
                  id="loginPass"
                  icon={KeyRound}
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginPass}
                  onChange={(event) => setLoginPass(event.target.value)}
                />
              </Field>

              <FormMessage
                ref={loginErrorRef}
                id="loginError"
                message={loginMessage}
                tone={loginMessage.startsWith('Tài khoản minh họa') ? 'success' : 'destructive'}
              />

              <Button type="submit" className="w-fit">
                <LogIn />
                Đăng nhập
              </Button>
            </form>

            <form
              id="verifyForm"
              hidden={!verifyVisible}
              onSubmit={handleVerify}
              className="flex flex-col gap-5"
            >
              <Alert variant="info">
                <Smartphone />
                <AlertDescription>
                  Số điện thoại cần xác thực: <strong id="verifyPhone">{verifyPhone}</strong>
                </AlertDescription>
              </Alert>

              <Field
                label="Mã OTP minh họa"
                htmlFor="otpCode"
                hint={
                  <>
                    Nguyên mẫu không gửi SMS. Dùng mã <strong>123456</strong> để thử luồng giao diện.
                    Có thể dán cả mã bằng{' '}
                    <kbd className="rounded border border-border bg-muted px-1 font-mono text-[0.7rem]">
                      Ctrl
                    </kbd>{' '}
                    +{' '}
                    <kbd className="rounded border border-border bg-muted px-1 font-mono text-[0.7rem]">
                      V
                    </kbd>{' '}
                    vào ô đầu tiên.
                  </>
                }
              >
                <InputOTP
                  id="otpCode"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  value={otp}
                  onChange={handleOtpChange}
                  autoComplete="one-time-code"
                  aria-invalid={otpInvalid}
                >
                  <InputOTPGroup>
                    {[0, 1, 2].map((index) => (
                      <InputOTPSlot key={index} index={index} aria-invalid={otpInvalid} />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {[3, 4, 5].map((index) => (
                      <InputOTPSlot key={index} index={index} aria-invalid={otpInvalid} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </Field>

              <FormMessage ref={verifyErrorRef} id="verifyError" message={verifyMessage} />

              <Button type="submit" className="w-fit">
                <ShieldCheck />
                Xác thực số điện thoại
              </Button>
            </form>

            <div id="accountState" hidden={!accountStateVisible} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-success/10 text-success">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-navy-soft">Tài khoản đã xác thực</h2>
                  <p className="text-sm text-muted-foreground">
                    Số điện thoại đã được xác thực trong phiên xem trước này.
                  </p>
                </div>
              </div>

              <Alert variant="success">
                <BadgeCheck />
                <AlertDescription>
                  Bạn có thể xem cổng nạp minh họa và tiếp tục tới game khi được phát hành.
                </AlertDescription>
              </Alert>

              <div className="flex flex-wrap gap-3">
                <Button data-route="payment" onClick={() => navigate('payment')}>
                  <Wallet />
                  Đến cổng nạp
                </Button>
                <Button variant="outline" id="logoutButton" onClick={handleLogout}>
                  <LogOut />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
