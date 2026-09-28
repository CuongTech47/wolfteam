/** Các kiểu dữ liệu dùng chung cho bản nguyên mẫu X3W.VN. */

/** Các "trang" trong SPA, tương ứng thuộc tính data-route của bản gốc. */
export type Route =
  | 'home'
  | 'company'
  | 'game'
  | 'notice'
  | 'account'
  | 'payment'
  | 'policies'
  | 'help';

export const ROUTES: Route[] = [
  'home',
  'company',
  'game',
  'notice',
  'account',
  'payment',
  'policies',
  'help',
];

export function isRoute(value: string): value is Route {
  return (ROUTES as string[]).includes(value);
}

/** Tab trong trang tài khoản người chơi. */
export type AccountTab = 'login' | 'register' | 'verify';

/** Tài khoản minh họa lưu trong phiên xem trước. */
export type PlayerAccount = {
  name: string;
  phone: string;
  birth: string;
  pass: string;
};

/** Một dòng lịch sử giao dịch minh họa. */
export type Transaction = {
  id: string;
  time: string;
  char: string;
  amount: number;
};

/** Yêu cầu xác nhận đang chờ trong modal. */
export type PendingPayment = {
  details: string;
  character: string;
};

/** Khóa của các mục trong trung tâm chính sách. */
export type PolicyKey = 'terms' | 'privacy' | 'payment' | 'complaint' | 'game';

/** Kết quả trả về của các hành động liên quan tới tài khoản. */
export type AuthResult = {
  ok: boolean;
  message?: string;
};
