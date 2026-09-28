'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { AlertTriangle, BadgeCheck, Check, CreditCard, Lock, Receipt, ShieldCheck } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Select } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useApp } from '@/lib/app-context';
import { money } from '@/lib/format';
import { popIn, popScale, refreshScrollSoon, useMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

const AMOUNTS = [50_000, 100_000, 200_000, 500_000, 1_000_000, 2_000_000];
const METHODS = ['Chuyển khoản ngân hàng', 'Ví điện tử'];
const FLOW_STEPS = ['Tài khoản', 'Nhân vật', 'Số tiền', 'Xác nhận'];

/** Một dòng trong bảng tóm tắt giao dịch. */
function SummaryRow({
  label,
  id,
  value,
  total = false,
}: {
  label: string;
  id: string;
  value: ReactNode;
  total?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">{label}</span>
      <strong
        id={id}
        className={cn(
          'text-right font-semibold text-navy-soft',
          total && 'text-lg font-extrabold text-primary',
        )}
      >
        {value}
      </strong>
    </div>
  );
}

export function PaymentPage() {
  const {
    user,
    verified,
    amount,
    setAmount,
    spent,
    history,
    limit,
    payError,
    setPayError,
    requestPayment,
  } = useApp();

  const [game, setGame] = useState('');
  const [server, setServer] = useState('');
  const [character, setCharacter] = useState('');
  const [method, setMethod] = useState('');

  const pageRef = useRef<HTMLDivElement>(null);
  const amountGridRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLTableSectionElement>(null);
  const motion = useMotion();

  const ready = Boolean(user) && verified;
  const usedPercent = limit > 0 ? (spent / limit) * 100 : 0;

  const handleReview = () => {
    if (!ready) {
      setPayError('Xác thực số điện thoại trước khi nạp.');
      return;
    }
    if (!game || !server || !character.trim() || !amount || !method) {
      setPayError('Chọn đủ game, máy chủ, nhân vật, số tiền và phương thức.');
      return;
    }
    if (spent + amount > limit) {
      setPayError(`Vượt hạn mức minh họa. Bạn còn ${money(limit - spent)} trong ngày.`);
      return;
    }
    setPayError('');
    const characterName = character.trim();
    requestPayment({
      character: characterName,
      details: `${characterName} · ${server} · ${method} · ${money(amount)}. Vui lòng kiểm tra đúng nhân vật.`,
    });
  };

  /*
   * Hiệu ứng GSAP cho cổng nạp: nút số tiền vừa chọn nảy nhẹ, thông báo trượt vào khi có nội dung
   * mới, và dòng lịch sử vừa tạo trượt xuống bảng. Tất cả đều kết thúc ở trạng thái tự nhiên.
   */
  useGSAP(
    () => {
      const grid = amountGridRef.current;
      if (!motion || !amount || !grid) return;

      popScale(grid.querySelector<HTMLElement>(`button[data-amount="${amount}"]`));
    },
    { dependencies: [amount], scope: pageRef },
  );

  useGSAP(
    () => {
      if (!motion || !payError) return;
      popIn(errorRef.current);
    },
    { dependencies: [payError], scope: pageRef },
  );

  useGSAP(
    () => {
      const body = historyRef.current;
      if (!motion || !body || !history.length) return;

      const rows = Array.from(body.querySelectorAll('tr')) as HTMLElement[];
      popIn(rows[rows.length - 1], { y: -12, duration: 0.4 });

      /* Thêm giao dịch làm trang dài ra: đo lại vị trí cho các hiệu ứng cuộn phía dưới. */
      refreshScrollSoon();
    },
    { dependencies: [history.length], scope: pageRef },
  );

  return (
    <div ref={pageRef} className="shell py-12 pb-20 sm:py-16">
      <PageHeader
        eyebrow="Cổng nạp chính thức · Bản tương tác"
        title="Nạp tiền cho nhân vật"
        description="Chọn đúng game, máy chủ và nhân vật trước khi xác nhận. Hệ thống bên dưới chỉ mô phỏng luồng thanh toán, không xử lý tiền thật."
      />

      <div data-reveal-group="0.12" className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <Card className="gap-6">
          <CardHeader>
            <CardTitle>Thông tin nạp</CardTitle>
            <CardDescription>Bốn bước: tài khoản, nhân vật, số tiền và xác nhận.</CardDescription>
            <Badge variant={ready ? 'success' : 'outline'}>
              {ready ? 'Đã xác thực' : 'Cần xác thực'}
            </Badge>
          </CardHeader>

          <CardContent>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
              {FLOW_STEPS.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="flex items-center gap-2 rounded-full border border-border/70 bg-muted/60 px-3 py-1.5 text-xs font-semibold text-navy-soft">
                    <span className="grid size-5 place-items-center rounded-full bg-primary/10 text-[0.68rem] font-bold text-primary">
                      {index + 1}
                    </span>
                    {step}
                  </span>
                  {index < FLOW_STEPS.length - 1 ? (
                    <span aria-hidden className="h-px w-4 bg-border" />
                  ) : null}
                </li>
              ))}
            </ol>

            <Alert id="payGate" variant="warning" className="mt-5" hidden={ready}>
              <Lock />
              <AlertDescription>
                Để dùng cổng nạp minh họa, hãy đăng nhập và xác thực số điện thoại.
              </AlertDescription>
            </Alert>

            <div id="payFormArea" hidden={!ready} className="mt-6 flex flex-col gap-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Game" htmlFor="payGame">
                  <Select id="payGame" value={game} onChange={(event) => setGame(event.target.value)}>
                    <option value="">Chọn game</option>
                    <option value="game">Tên game — đang chuẩn bị phát hành</option>
                  </Select>
                </Field>

                <Field label="Máy chủ" htmlFor="payServer">
                  <Select
                    id="payServer"
                    value={server}
                    onChange={(event) => setServer(event.target.value)}
                  >
                    <option value="">Chọn máy chủ</option>
                    <option value="S1">Máy chủ 1 (minh họa)</option>
                    <option value="S2">Máy chủ 2 (minh họa)</option>
                  </Select>
                </Field>

                <Field label="Nhân vật" htmlFor="payCharacter" className="sm:col-span-2">
                  <Input
                    id="payCharacter"
                    type="text"
                    placeholder="Nhập tên nhân vật minh họa"
                    autoComplete="off"
                    value={character}
                    onChange={(event) => setCharacter(event.target.value)}
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Số tiền nạp</Label>
                <div
                  ref={amountGridRef}
                  id="amountGrid"
                  className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                >
                  {AMOUNTS.map((value) => {
                    const selected = amount === value;

                    return (
                      <button
                        key={value}
                        type="button"
                        data-amount={value}
                        data-selected={selected}
                        aria-pressed={selected}
                        onClick={() => {
                          setAmount(value);
                          setPayError('');
                        }}
                        className={cn(
                          'flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors',
                          selected
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-background text-navy-soft hover:border-primary/40 hover:bg-accent',
                        )}
                      >
                        {money(value)}
                        {selected ? <Check className="size-4" /> : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Label>Phương thức thanh toán</Label>
                <RadioGroup>
                  {METHODS.map((value) => (
                    <Label
                      key={value}
                      htmlFor={value === METHODS[0] ? 'methodBank' : 'methodWallet'}
                      className="items-center gap-3 rounded-lg border border-border/80 bg-background px-3 py-2.5 text-sm font-medium text-navy-soft transition-colors hover:border-primary/40 hover:bg-accent/50"
                    >
                      <Radio
                        id={value === METHODS[0] ? 'methodBank' : 'methodWallet'}
                        name="method"
                        value={value}
                        checked={method === value}
                        onChange={() => setMethod(value)}
                      />
                      {value}
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Alert
                ref={errorRef}
                id="payError"
                variant={payError.startsWith('Đã tạo') ? 'success' : 'destructive'}
                className={cn(payError ? '' : 'hidden')}
              >
                {payError.startsWith('Đã tạo') ? <BadgeCheck /> : <AlertTriangle />}
                <AlertDescription>{payError}</AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <aside className="lg:sticky lg:top-28">
          <Card className="gap-5">
            <CardHeader>
              <div className="flex flex-col gap-1">
                <CardTitle>Kiểm tra giao dịch</CardTitle>
                <CardDescription>Tóm tắt trước khi xác nhận.</CardDescription>
              </div>
              <Badge variant={ready ? 'success' : 'outline'}>
                <ShieldCheck />
                {ready ? 'Đã xác thực' : 'Cần xác thực'}
              </Badge>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col divide-y divide-border/70 border-y border-border/70">
                <SummaryRow
                  label="Trạng thái tài khoản"
                  id="paymentAccount"
                  value={ready ? 'Đã xác thực' : user ? 'Chờ OTP' : 'Chưa đăng nhập'}
                />
                <SummaryRow
                  label="Game / máy chủ"
                  id="summaryGame"
                  value={game ? `Tên game / ${server || 'Chưa chọn máy chủ'}` : 'Chưa chọn'}
                />
                <SummaryRow
                  label="Nhân vật"
                  id="summaryCharacter"
                  value={character.trim() || 'Chưa chọn'}
                />
                <SummaryRow label="Phương thức" id="summaryMethod" value={method || 'Chưa chọn'} />
                <SummaryRow label="Đã nạp hôm nay" id="spentToday" value={money(spent)} />
                <SummaryRow label="Hạn mức còn lại" id="remaining" value={money(limit - spent)} />
                <SummaryRow
                  label="Số tiền lần này"
                  id="summaryAmount"
                  value={money(amount)}
                  total
                />
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <Progress value={usedPercent} aria-label="Hạn mức nạp trong ngày" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Đã dùng {money(spent)}</span>
                  <span>Hạn mức {money(limit)}</span>
                </div>
              </div>

              <Alert variant="info" className="mt-5">
                <CreditCard />
                <AlertDescription>
                  Giới hạn dự kiến: 5.000.000đ mỗi tài khoản trong một ngày. Kiểm tra hạn mức thật
                  phải thực hiện trên server thanh toán.
                </AlertDescription>
              </Alert>

              <div className="mt-5 flex flex-col gap-3">
                <Button id="reviewPayment" size="lg" disabled={!ready} onClick={handleReview}>
                  <CreditCard />
                  Xem lại và xác nhận
                </Button>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Không kết nối ngân hàng, ví điện tử hoặc cổng thu tiền.
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Card data-reveal="up" className="mt-8 gap-4">
        <CardHeader>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <Receipt className="size-5" />
            </span>
            <div>
              <CardTitle>Lịch sử giao dịch minh họa</CardTitle>
              <CardDescription>Chỉ lưu trong phiên trình duyệt hiện tại.</CardDescription>
            </div>
          </div>
          <Badge variant="outline">{history.length} giao dịch</Badge>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Nhân vật</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody ref={historyRef} id="historyBody">
            {history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                  Chưa có giao dịch minh họa.
                </TableCell>
              </TableRow>
            ) : (
              history.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-semibold text-navy-soft">{row.id}</TableCell>
                  <TableCell className="text-muted-foreground">{row.time}</TableCell>
                  <TableCell>{row.char}</TableCell>
                  <TableCell className="font-semibold">{money(row.amount)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Minh họa</Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
