/** Hạn mức nạp dự kiến cho mỗi tài khoản trong một ngày. */
export const DAILY_LIMIT = 5_000_000;

/** Mã OTP minh họa: bản xem trước không gửi SMS. */
export const DEMO_OTP = '123456';

/** Định dạng tiền theo kiểu Việt Nam: 5000000 -> "5.000.000đ". */
export function money(value?: number | null): string {
  return Number(value || 0).toLocaleString('vi-VN') + 'đ';
}

/** Số điện thoại Việt Nam: 10 chữ số, bắt đầu bằng 0. */
export function validatePhone(value: string): boolean {
  return /^0\d{9}$/.test(value.trim());
}

/** Người chưa đủ 18 tuổi theo ngày sinh khai báo sẽ không được tiếp tục. */
export function isAdult(birthDate: string): boolean {
  if (!birthDate) return false;
  const birth = new Date(birthDate + 'T00:00:00');
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 18;
}
