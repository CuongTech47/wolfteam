'use client';

import { ShieldAlert } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useApp } from '@/lib/app-context';

/**
 * Hộp thoại xác nhận giao dịch minh họa (shadcn Dialog).
 * Bấm xác nhận chỉ tạo một dòng lịch sử trong phiên xem trước.
 */
export function PaymentModal() {
  const { pendingPayment, cancelPayment, confirmPayment } = useApp();

  return (
    <Dialog
      open={Boolean(pendingPayment)}
      onOpenChange={(open) => {
        if (!open) cancelPayment();
      }}
    >
      <DialogContent id="paymentModal">
        <DialogHeader>
          <Badge variant="secondary" className="w-fit">
            Kiểm tra trước khi xác nhận
          </Badge>
          <DialogTitle id="modalTitle">Xác nhận giao dịch minh họa</DialogTitle>
          <DialogDescription id="modalDetails">{pendingPayment?.details ?? ''}</DialogDescription>
        </DialogHeader>

        <Alert variant="info">
          <ShieldAlert />
          <AlertDescription>
            Bấm xác nhận chỉ tạo một dòng lịch sử trong phiên xem trước. Không có tiền được thu hoặc
            chuyển.
          </AlertDescription>
        </Alert>

        <DialogFooter>
          <Button variant="outline" id="cancelPayment" onClick={cancelPayment}>
            Quay lại
          </Button>
          <Button id="confirmPayment" onClick={confirmPayment}>
            Xác nhận minh họa
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
