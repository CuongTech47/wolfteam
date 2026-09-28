# reference-original — bản gốc X3W.VN (nguồn đối chiếu)

Thư mục này giữ **nguyên bản** prototype HTML/JS/CSS đã tải về, dùng làm **nguồn đối chiếu hành vi**
(luồng đăng ký → đăng nhập → OTP → cổng nạp, hạn mức, điều hướng hash) cho bản Next.js trong repo này
(thư mục `app/`, `components/`, `lib/`).

Giao diện của bản Next.js hiện đã được **thiết kế lại bằng Tailwind CSS v4 + shadcn/ui**, nên thư mục
này **không còn là mốc so sánh pixel** — chỉ dùng để chạy bộ E2E hành vi trên bản gốc và đối chiếu
thông điệp/nghiệp vụ.

| Tệp | Vai trò |
| --- | --- |
| `index.html` | Trang gốc đầy đủ (markup + CSS inline + script nghiệp vụ) |
| `x3w.css` | Biểu định kiểu gốc (được `index.html` tham chiếu) |
| `x3w-content.js` | Script nghiệp vụ gốc đã tách khỏi `index.html` |
| `x3w-hero.png` | Ảnh hero gốc (bản Next.js dùng `public/x3w-hero.png`, cùng nội dung) |

## Cách chạy để đối chiếu

```bash
# 1) Bản gốc — máy chủ tĩnh ở cổng 3457 (script nằm ở f:\_e2e\orig-server.js)
node f:\_e2e\orig-server.js

# 2) Bản Next.js — cổng 3456
cd f:\wolfteam && npm run build && npx next start -p 3456
```

Bộ E2E dùng chung một kịch bản cho cả hai bản (xem `f:\_e2e\test.js`):

```bash
cd f:\_e2e && TARGET=next node test.js                                            # 72/72 PASS
cd f:\_e2e && BASE=http://localhost:3457/ TARGET=orig EXPECT_HASH=0 node test.js   # 62/62 PASS + 1 NOTE
```

Các kiểm tra giao diện Tailwind/shadcn chỉ áp dụng cho bản Next.js; khi chạy trên bản gốc, `test.js`
tự bỏ qua nhóm kiểm tra đó và dùng nhánh kiểm tra tương ứng của bản gốc (ví dụ `class="active"` thay
cho `aria-current="page"`).

## Khác biệt đã biết giữa bản gốc và bản dựng lại

1. **Bảng lịch sử sau khi đăng xuất.** Bản gốc dọn dữ liệu (`history = []`) nhưng không gọi lại
   hàm render nên `#historyBody` còn hiện các dòng cũ (DOM cũ). Bản Next.js render theo state nên
   bảng trở về trạng thái “Chưa có giao dịch minh họa.” ngay. Dữ liệu thì giống nhau.
2. **Ghi hash trên URL.** Bản gốc chỉ *đọc* hash lúc tải (không ghi), bản Next.js *đọc và ghi*
   hash để deep-link và nút Back/Forward hoạt động. Vì vậy các kiểm tra hash chỉ áp dụng cho bản Next.js.
3. **Script Cloudflare.** `index.html` gốc còn tham chiếu `cdn-cgi/challenge-platform/...` (do
   Cloudflare chèn khi tải trang) nên khi chạy offline sẽ 404; bộ test bỏ qua request này cùng `favicon.ico`.
