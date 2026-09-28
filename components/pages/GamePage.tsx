'use client';

import { Clock, Gamepad2, Images, LifeBuoy, MonitorSmartphone, ShieldAlert, UserPlus } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/lib/app-context';

const SHOTS = ['Ảnh 01', 'Ảnh 02', 'Ảnh 03'];

const INFO_ROWS = [
  { icon: Clock, label: 'Trạng thái', value: 'Đang chuẩn bị phát hành' },
  { icon: MonitorSmartphone, label: 'Nền tảng', value: 'Cập nhật sau' },
  { icon: ShieldAlert, label: 'Phân loại độ tuổi', value: 'Chờ kết quả' },
];

export function GamePage() {
  const { navigate } = useApp();

  return (
    <div className="shell py-12 pb-20 sm:py-16">
      <PageHeader
        eyebrow="Sản phẩm đang chuẩn bị phát hành"
        title="Tên game"
        description="Giới thiệu ngắn về thể loại, bối cảnh và trải nghiệm chính. Nội dung và hình ảnh sẽ được thay bằng tư liệu game thật."
      >
        <Badge variant="warning" className="w-fit">
          Mức tuổi dự kiến 18+ · Chờ kết quả phân loại trong hồ sơ
        </Badge>
      </PageHeader>

      <div data-reveal-group="0.12" className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="relative grid min-h-[300px] place-items-center overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-navy-soft to-primary text-center text-white">
            <div
              aria-hidden
              className="absolute -top-16 -left-10 size-56 rounded-full border border-white/15"
            />
            <div className="relative flex flex-col items-center gap-3 px-6">
              <Gamepad2 className="size-8 text-aqua" />
              <span className="text-sm font-bold tracking-[0.18em] uppercase">
                Hình ảnh / video game
              </span>
            </div>
          </div>

          <div data-reveal-group="0.06" className="grid gap-4 sm:grid-cols-3">
            {SHOTS.map((shot) => (
              <div
                key={shot}
                className="grid min-h-[110px] place-items-center rounded-lg border border-dashed border-border bg-muted/50 text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase"
              >
                <span className="flex flex-col items-center gap-2">
                  <Images className="size-4" />
                  {shot}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Card className="h-fit lg:sticky lg:top-28">
          <CardHeader>
            <CardTitle>Thông tin người chơi</CardTitle>
          </CardHeader>

          <CardContent>
            <dl className="flex flex-col gap-3">
              {INFO_ROWS.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 text-sm">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <row.icon className="size-4" />
                    {row.label}
                  </dt>
                  <dd className="font-semibold text-navy-soft">{row.value}</dd>
                </div>
              ))}
            </dl>

            <Alert variant="warning">
              <ShieldAlert />
              <AlertTitle>Lưu ý sức khỏe</AlertTitle>
              <AlertDescription>Chơi quá 180 phút một ngày sẽ ảnh hưởng xấu đến sức khỏe.</AlertDescription>
            </Alert>

            <div className="flex flex-col gap-3">
              <Button data-route="account" onClick={() => navigate('account')}>
                <UserPlus />
                Tạo tài khoản
              </Button>
              <Button variant="outline" data-route="help" onClick={() => navigate('help')}>
                <LifeBuoy />
                Liên hệ hỗ trợ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
