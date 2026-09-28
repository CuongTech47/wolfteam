# X3W.VN — Next.js + Tailwind CSS v4 + shadcn/ui

Prototype X3W.VN (một trang HTML + JS thuần, hash-router SPA) được dựng lại bằng **Next.js 16 (App Router)
+ TypeScript + React 19**, giữ nguyên toàn bộ hành vi nghiệp vụ minh họa và **thiết kế lại giao diện**
bằng **Tailwind CSS v4** và **shadcn/ui** (kèm `lucide-react`).

> Giao diện hiện tại là bản thiết kế mới, **không còn đối chiếu pixel 1-1** với bản gốc HTML/CSS.
> Bản gốc vẫn được giữ trong `reference-original/` làm nguồn đối chiếu hành vi (xem
> `f:\_e2e\README.md`).

## Cấu trúc

| Đường dẫn | Vai trò |
| --- | --- |
| `app/layout.tsx` | Khung HTML, nạp `globals.css`, font Inter và favicon (`app/icon.svg`) |
| `app/globals.css` | Tailwind v4 (`@import "tailwindcss"`) + token màu X3W.VN + lớp `.shell`/`.brand-gradient` |
| `components.json` | Cấu hình shadcn/ui (để thêm component mới bằng `npx shadcn@latest add ...`) |
| `components/ui/*` | Component shadcn/ui: button, card, badge, input, label, field, alert, dialog, tabs, table, select, checkbox, radio, progress, separator, accordion, **input-otp** |
| `components/SiteShell.tsx` | Ghép topline + header + các trang + footer + hộp thoại xác nhận |
| `components/SiteHeader.tsx`, `SiteFooter.tsx`, `PageHeader.tsx` | Điều hướng, chân trang và đầu trang dùng chung |
| `components/PageSlot.tsx` | Hiện/ẩn từng trang theo route (giữ hợp đồng DOM `#id` + `.page.active` như bản gốc) |
| `components/PaymentModal.tsx` | Hộp thoại xác nhận giao dịch (shadcn `Dialog`/Radix) |
| `components/pages/*` | 8 trang: trang chủ, công ty, game, thông báo, tài khoản, cổng nạp, chính sách, hỗ trợ |
| `lib/app-context.tsx` | State dùng chung + hash router + nghiệp vụ (đăng ký, OTP, nạp, hạn mức) — không đổi so với bản dựng lại đầu tiên |
| `lib/utils.ts` | `cn()` (clsx + tailwind-merge) theo chuẩn shadcn |
| `lib/motion.ts` | Lớp hiệu ứng GSAP dùng chung: `useMotion()`, `useReveal()`, `popIn`/`popScale`/`shake`, hằng số `MOTION`, `trackTween()` |
| `public/x3w-hero.png` | Ảnh hero (`#heroImage`) |
| `reference-original/` | **Bản gốc** để đối chiếu hành vi (xem README trong thư mục) |

## Chạy server

```bash
cd f:\wolfteam
npm install

# 1) Chế độ phát triển (tự nạp lại khi sửa mã) — http://localhost:3000
npm run dev

# 2) Chế độ phát triển ở cổng 3456 (đúng cổng bộ E2E đang dùng)
npm run dev:3456

# 3) Chế độ production (bắt buộc build trước khi start)
npm run build
npm run start:3456                 # http://localhost:3456
```

- Cổng mặc định của Next.js là **3000**; bộ E2E ở `f:\_e2e` gọi **3456** nên dùng `dev:3456`
  hoặc `start:3456` khi muốn chạy test.
- Sau mỗi lần `npm run build` phải **khởi động lại** tiến trình `next start` thì mới thấy mã mới.
- Dừng server: `Ctrl + C` tại cửa sổ terminal đang chạy, hoặc tìm tiến trình theo cổng rồi tắt:

```bash
netstat -ano | findstr ":3456" | findstr LISTENING      # lấy PID ở cột cuối
taskkill /PID <PID> /F
```

- Bản gốc để đối chiếu (cổng 3457): `cd f:\_e2e && npm run orig` (xem `f:\_e2e\README.md`).

## Ghi chú thiết kế

- **Bảng màu** giữ tinh thần thương hiệu: navy `#061c32`, xanh biển `#08689e`, aqua `#83d9ff`; token
  ngữ nghĩa của shadcn (`--primary`, `--card`, `--border`, ...) được ánh xạ trong `app/globals.css`.
- **Có chủ ý dùng phần tử gốc của trình duyệt** ở vài chỗ để bảo toàn hành vi form và hợp đồng E2E:
  `<select>` cho `#payGame`/`#payServer` (`Select`), `<input type="checkbox">` cho `#acceptTerms`
  (`Checkbox`), `<input type="radio">` cho `name="method"` (`Radio`).
- **Dialog chỉ có hiệu ứng mở** (không `animate-out`) để lớp phủ không chặn thao tác ngay sau khi đóng.
- **Ô OTP dùng `InputOTP` của shadcn/ui** (thư viện `input-otp`): 6 ô chia hai nhóm 3–3 có dấu ngăn
  cách. Thư viện vẫn render một `<input>` thật mang `id="otpCode"` nằm dưới các ô, nên `<label htmlFor>`
  và bộ E2E hoạt động như trước; ô chỉ nhận chữ số (`REGEXP_ONLY_DIGITS`), hỗ trợ dán cả mã, và báo lỗi
  bằng `aria-invalid` trên từng ô (`app/globals.css` có thêm `--animate-caret-blink` cho con trỏ giả).
- **Hiệu ứng chuyển động dùng GSAP** (`gsap` + `@gsap/react`, tập trung ở `lib/motion.ts`): chuyển trang
  (fade + trượt nhẹ trong `PageSlot`), xuất hiện khi cuộn (`data-reveal`, `data-reveal-group`), timeline
  cho hero (`data-hero-item`) kèm parallax nhẹ cho `#heroImage`, và các phản hồi nhỏ (`popIn`, `popScale`,
  `shake`) cho thông báo lỗi, ô OTP, nút số tiền đang chọn, dòng lịch sử mới và nav mobile.
  - Trạng thái "ẩn để chờ hiện" chỉ do JS đặt (không có trong CSS) và mọi tween đều `clearProps`, nên
    hợp đồng DOM/E2E không đổi và ảnh `fullPage` luôn đủ nội dung sau khi cuộn.
  - `prefers-reduced-motion: reduce` được tôn trọng hoàn toàn: bỏ mọi hiệu ứng, nội dung hiện ngay.
  - Hook để kiểm tra tự động: `html[data-motion="full" | "reduced"]` và `window.__x3wMotion = { gsap, reduce, tweens }`.
- Ẩn/hiện form tài khoản và khu vực nạp vẫn dùng thuộc tính `hidden` như bản gốc.

## Kiểm thử

Bộ E2E nằm ngoài repo tại `f:\_e2e` (`playwright-core` dùng Chrome có sẵn trên máy):

```bash
cd f:\_e2e
TARGET=next node test.js                                            # 91/91 PASS -> result-next.txt
BASE=http://localhost:3457/ TARGET=orig EXPECT_HASH=0 node test.js   # 62/62 PASS + 1 NOTE -> result-orig.txt
```

Chi tiết cách chạy, ý nghĩa từng kiểm tra và ảnh chụp: `f:\_e2e\README.md`.

## Khác biệt đã biết so với bản gốc

1. **Giao diện** — thiết kế lại bằng Tailwind + shadcn/ui nên không còn giống pixel với `x3w.css`.
2. **Bảng lịch sử sau khi đăng xuất** — bản gốc dọn dữ liệu (`history = []`) nhưng không render lại
   `#historyBody` nên bảng còn dòng cũ; bản Next.js render theo state nên bảng trống ngay.
3. **Ghi hash lên URL** — bản gốc chỉ đọc hash lúc tải, bản Next.js đọc *và ghi* hash để deep-link,
   nút Back/Forward và tải lại trang hoạt động đúng.
4. **Script Cloudflare** — trong `reference-original/index.html` còn tham chiếu script thử thách
   Cloudflare nên khi chạy offline sẽ 404; đây không phải tài nguyên của ứng dụng.
