import { BellOff, Megaphone } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export function NoticePage() {
  return (
    <div className="shell py-12 pb-20 sm:py-16">
      <PageHeader
        eyebrow="Cập nhật"
        title="Thông báo quan trọng"
        description="Chỉ đăng các thông báo chính thức ảnh hưởng đến người chơi."
      />

      <Card data-reveal="up" className="gap-5">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
            <BellOff className="size-5" />
          </span>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-bold text-navy-soft">Chưa có thông báo</h3>
              <Badge variant="outline">Trạng thái: trống</Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Thông báo phát hành game, tài khoản và thanh toán sẽ xuất hiện tại đây.
            </p>
          </div>
        </div>

        <Alert variant="info">
          <Megaphone />
          <AlertDescription>
            Mọi thông báo chính thức sẽ được đăng tại trang này trước khi gửi tới người chơi qua các
            kênh hỗ trợ.
          </AlertDescription>
        </Alert>
      </Card>
    </div>
  );
}
