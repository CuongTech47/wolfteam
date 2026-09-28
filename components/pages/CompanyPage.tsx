import { Compass, FileSignature, Hammer, Quote } from 'lucide-react';

import { PageHeader } from '@/components/PageHeader';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLUMNS = [
  {
    icon: Hammer,
    title: 'Chúng tôi đang làm gì?',
    body: 'Phát triển và chuẩn bị phát hành game. Sản phẩm, hình ảnh và các thông tin dịch vụ sẽ được công bố theo tiến độ thực tế.',
  },
  {
    icon: Compass,
    title: 'Chúng tôi chọn cách làm nào?',
    body: 'Đặt chất lượng sản phẩm và phản hồi người chơi vào quá trình phát triển, kiểm tra và cải thiện liên tục.',
  },
];

export function CompanyPage() {
  return (
    <div className="shell py-12 pb-20 sm:py-16">
      <PageHeader
        eyebrow="Về X3W.VN"
        title="Đi cùng nhau, làm tốt việc trước mắt."
        description="X3W.VN đang phát triển sản phẩm game đầu tiên. Đây là nơi chúng tôi giới thiệu cách mình nghĩ về sản phẩm và con đường phía trước."
        className="border-b border-border/60"
      />

      <div data-reveal-group="0.1" className="grid gap-6">
        <Card className="gap-4 p-7 sm:p-9">
          <Badge variant="secondary" className="w-fit">
            X3W → WWW
          </Badge>
          <h2 className="max-w-3xl text-2xl font-extrabold tracking-tight text-navy-soft sm:text-3xl">
            X3W.VN — We Will Win
          </h2>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            Với chúng tôi, “win” bắt đầu từ việc làm ra một sản phẩm xứng đáng với thời gian và sự tin
            tưởng của người chơi. Chúng tôi sẽ lắng nghe phản hồi và liên tục hoàn thiện sản phẩm của
            mình.
          </p>
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            “We Will Win” còn là niềm tin dành cho mỗi người trong cộng đồng: không phải ai cũng chọn
            cùng một con đường hay định nghĩa thành công giống nhau. Nhưng khi nghiêm túc với điều
            mình chọn và bền bỉ tiến lên, chúng ta có thể đến gần hơn với mục tiêu của mình.
          </p>
        </Card>

        <div className="brand-gradient relative overflow-hidden rounded-xl px-7 py-8 text-white sm:px-9">
          <Quote aria-hidden className="absolute top-5 right-6 size-10 text-white/20" />
          <p className="max-w-3xl text-lg leading-relaxed font-medium sm:text-xl">
            Chúng ta sẽ đạt được những điều mình hướng đến — bằng việc nghiêm túc với từng bước đi hôm
            nay.
          </p>
        </div>

        <div data-reveal-group="0.08" className="grid gap-6 md:grid-cols-2">
          {COLUMNS.map((column) => (
            <Card key={column.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <column.icon className="size-5" />
                  </span>
                  <CardTitle>{column.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{column.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert variant="default">
          <FileSignature />
          <AlertDescription>
            X3W.VN là tên thương hiệu được dùng trong bản giới thiệu này. Tên pháp nhân, địa chỉ, liên
            hệ và thông tin giấy phép sẽ được cập nhật theo giấy tờ chính thức.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
