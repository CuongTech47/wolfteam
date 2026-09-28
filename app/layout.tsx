import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'X3W.VN — We Will Win',
  description:
    'X3W.VN phát triển game với mục tiêu tạo ra sản phẩm tốt cho người chơi. We Will Win — cùng tiến về phía trước trên con đường đã chọn.',
};

export const viewport: Viewport = {
  themeColor: '#061c32',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        {/* Nạp Inter ngay trong HTML (không dùng next/font) để bản dựng không phụ thuộc mạng lúc build. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
