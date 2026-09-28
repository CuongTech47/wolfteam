import { Headphones, MailQuestion, MessageCircle, ShieldQuestion } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = [
  {
    question: 'Tôi cần xác thực số điện thoại để làm gì?',
    answer:
      'Tài khoản chưa xác thực bị giới hạn ở bước xem giao diện. Xác thực số điện thoại giúp bảo vệ tài khoản và là điều kiện bắt buộc trước khi vào game hoặc nạp tiền.',
  },
  {
    question: 'Bản xem trước có thu tiền thật không?',
    answer:
      'Không. Cổng nạp trong bản xem trước chỉ mô phỏng luồng giao diện, không kết nối ngân hàng, ví điện tử hay cổng thu tiền nào.',
  },
  {
    question: 'Hạn mức nạp trong ngày là bao nhiêu?',
    answer:
      'Giới hạn dự kiến là 5.000.000đ cho mỗi tài khoản trong một ngày. Việc kiểm tra hạn mức thật phải thực hiện trên server thanh toán.',
  },
];

export function HelpPage() {
  return (
    <div className="shell py-12 pb-20 sm:py-16">
      <PageHeader
        eyebrow="Kênh liên hệ"
        title="Hỗ trợ người chơi"
        description="Hỗ trợ về tài khoản, xác thực số điện thoại và giao dịch khi cổng nạp thật được mở."
      />

      <div data-reveal-group="0.12" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Headphones className="size-5" />
              </span>
              <div>
                <CardTitle>Live chat và Zalo</CardTitle>
                <CardDescription>Kênh hỗ trợ trực tiếp trong giờ làm việc.</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Liên kết chính thức sẽ được gắn khi công ty cung cấp tài khoản hỗ trợ. Bản xem trước
              hiện chưa kết nối nhân viên hỗ trợ.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" type="button" disabled>
                <MessageCircle />
                Live chat · Chưa kết nối
              </Button>
              <Button variant="outline" type="button" disabled>
                <MailQuestion />
                Zalo · Chưa có liên kết
              </Button>
            </div>

            <Alert variant="warning">
              <ShieldQuestion />
              <AlertDescription>
                Chỉ dùng các kênh hỗ trợ chính thức đăng trên trang này. Không cung cấp mật khẩu hoặc
                mã OTP cho bất kỳ ai.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Câu hỏi thường gặp</CardTitle>
            <CardDescription>Ba câu hỏi người chơi hay gặp trong bản xem trước.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion>
              {FAQ.map((item) => (
                <AccordionItem key={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
