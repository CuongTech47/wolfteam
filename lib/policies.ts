import type { PolicyKey } from '@/lib/types';

type Policy = {
  /** Nhãn trên thanh điều hướng chính sách. */
  label: string;
  title: string;
  body: string;
};

/**
 * Nội dung giữ chỗ cho trung tâm chính sách.
 * Văn bản chính thức cần được soạn theo doanh nghiệp, game và phương thức
 * thanh toán thực tế trước khi công bố.
 */
export const POLICIES: Record<PolicyKey, Policy> = {
  terms: {
    label: 'Điều khoản',
    title: 'Điều khoản sử dụng',
    body: 'Quy định tạo tài khoản, quyền và trách nhiệm người chơi, điều kiện sử dụng game. Nội dung pháp lý chính thức sẽ được hoàn thiện trước khi cung cấp dịch vụ.',
  },
  privacy: {
    label: 'Bảo mật',
    title: 'Chính sách bảo mật',
    body: 'Mục đích thu thập họ tên, ngày sinh, số điện thoại; thời gian lưu giữ; quyền của người dùng và cách liên hệ về dữ liệu cá nhân.',
  },
  payment: {
    label: 'Thanh toán',
    title: 'Chính sách thanh toán',
    body: 'Các phương thức thanh toán, cách đối soát, giới hạn nạp, xử lý giao dịch lỗi và điều kiện hoàn tiền phải thống nhất với cổng thanh toán thật.',
  },
  complaint: {
    label: 'Khiếu nại',
    title: 'Giải quyết khiếu nại',
    body: 'Kênh tiếp nhận live chat/Zalo, thông tin cần cung cấp và tiến trình xử lý sẽ được công bố khi vận hành.',
  },
  game: {
    label: 'Quy tắc game',
    title: 'Quy tắc game',
    body: 'Quy tắc tài khoản, trao đổi trong game và hành vi bị cấm sẽ được điều chỉnh theo nội dung game được phát hành.',
  },
};

export const POLICY_KEYS = Object.keys(POLICIES) as PolicyKey[];
