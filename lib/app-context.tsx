'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DAILY_LIMIT, DEMO_OTP, isAdult, validatePhone } from '@/lib/format';
import {
  isRoute,
  type AccountTab,
  type AuthResult,
  type PendingPayment,
  type PlayerAccount,
  type Route,
  type Transaction,
} from '@/lib/types';

export type RegisterInput = {
  name: string;
  birth: string;
  phone: string;
  pass: string;
};

type AppContextValue = {
  /* Điều hướng */
  route: Route;
  navigate: (name: string) => void;
  navOpen: boolean;
  toggleNav: () => void;

  /* Tài khoản người chơi */
  user: PlayerAccount | null;
  verified: boolean;
  accountLabel: string;
  accountTab: AccountTab | null;
  accountHeading: string;
  accountStateVisible: boolean;
  verifyPhone: string;
  openRegister: () => void;
  selectAccountTab: (tab: AccountTab) => void;
  createAccount: (input: RegisterInput) => AuthResult;
  signIn: (phone: string, pass: string) => AuthResult;
  verifyOtp: (code: string) => AuthResult;
  signOut: () => void;

  /* Cổng nạp minh họa */
  amount: number;
  setAmount: (value: number) => void;
  spent: number;
  history: Transaction[];
  limit: number;
  payError: string;
  setPayError: (value: string) => void;
  pendingPayment: PendingPayment | null;
  requestPayment: (payment: PendingPayment) => void;
  cancelPayment: () => void;
  confirmPayment: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const ACCOUNT_TAB_HEADINGS: Record<AccountTab, string> = {
  login: 'Đăng nhập',
  register: 'Đăng ký tài khoản',
  verify: 'Xác thực số điện thoại',
};

/**
 * Trạng thái dùng chung của bản nguyên mẫu.
 * Giữ nguyên luồng của bản gốc: đăng ký -> đăng nhập -> OTP minh họa -> cổng nạp.
 * Mọi dữ liệu chỉ nằm trong phiên trình duyệt, không gửi đi đâu.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>('home');
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState<PlayerAccount | null>(null);
  const [verified, setVerified] = useState(false);
  const [accountTab, setAccountTab] = useState<AccountTab | null>('login');
  const [accountStateVisible, setAccountStateVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [spent, setSpent] = useState(0);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [payError, setPayError] = useState('');
  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(null);

  /* Hash trên URL là nguồn sự thật của "trang" đang xem (#home, #payment, ...). */
  useEffect(() => {
    const syncFromHash = () => {
      const name = window.location.hash.slice(1);
      setRoute(isRoute(name) ? name : 'home');
      setNavOpen(false);
      window.scrollTo(0, 0);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const goTo = useCallback((target: Route) => {
    setNavOpen(false);
    if (window.location.hash === `#${target}`) {
      setRoute(target);
    } else {
      window.location.hash = target;
    }
    window.scrollTo(0, 0);
  }, []);

  const selectAccountTab = useCallback((tab: AccountTab) => {
    setAccountTab(tab);
    setAccountStateVisible(false);
  }, []);

  const openAccountPage = useCallback(() => {
    if (user && verified) {
      setAccountTab(null);
      setAccountStateVisible(true);
    } else {
      selectAccountTab(user ? 'verify' : 'login');
    }
  }, [selectAccountTab, user, verified]);

  /**
   * Nút "Đăng ký" ngoài header: mở trang tài khoản rồi chọn sẵn tab đăng ký.
   * Không dùng `navigate('account')` vì hàm đó luôn đưa về tab đăng nhập như nút tài khoản.
   */
  const openRegister = useCallback(() => {
    goTo('account');
    selectAccountTab('register');
  }, [goTo, selectAccountTab]);

  const navigate = useCallback(
    (name: string) => {
      const target: Route = isRoute(name) ? name : 'home';
      goTo(target);
      if (target === 'account') openAccountPage();
    },
    [goTo, openAccountPage],
  );

  const toggleNav = useCallback(() => setNavOpen((open) => !open), []);

  const createAccount = useCallback(
    ({ name, birth, phone, pass }: RegisterInput): AuthResult => {
      const cleanName = name.trim();
      const cleanPhone = phone.trim();
      if (!cleanName || !validatePhone(cleanPhone) || pass.length < 8) {
        return {
          ok: false,
          message: 'Kiểm tra họ tên, số điện thoại 10 chữ số và mật khẩu ít nhất 8 ký tự.',
        };
      }
      if (!isAdult(birth)) {
        return {
          ok: false,
          message: 'Theo mức tuổi dự kiến 18+, tài khoản này chưa được tiếp tục.',
        };
      }
      setUser({ name: cleanName, phone: cleanPhone, birth, pass });
      setVerified(false);
      selectAccountTab('login');
      return { ok: true };
    },
    [selectAccountTab],
  );

  const signIn = useCallback(
    (phone: string, pass: string): AuthResult => {
      if (!user || user.phone !== phone.trim() || user.pass !== pass) {
        return {
          ok: false,
          message: 'Thông tin đăng nhập không khớp tài khoản vừa tạo trong phiên xem trước.',
        };
      }
      if (!verified) {
        selectAccountTab('verify');
      } else {
        setAccountStateVisible(true);
      }
      return { ok: true };
    },
    [selectAccountTab, user, verified],
  );

  const verifyOtp = useCallback(
    (code: string): AuthResult => {
      if (!user) {
        return { ok: false, message: 'Vui lòng đăng ký và đăng nhập trước.' };
      }
      if (code.trim() !== DEMO_OTP) {
        return { ok: false, message: `Mã minh họa chưa đúng. Dùng ${DEMO_OTP}.` };
      }
      setVerified(true);
      setAccountStateVisible(true);
      return { ok: true };
    },
    [user],
  );

  const signOut = useCallback(() => {
    setUser(null);
    setVerified(false);
    setAmount(0);
    setSpent(0);
    setHistory([]);
    setPayError('');
    setPendingPayment(null);
    selectAccountTab('login');
    goTo('home');
  }, [goTo, selectAccountTab]);

  const requestPayment = useCallback((payment: PendingPayment) => {
    setPendingPayment(payment);
  }, []);

  const cancelPayment = useCallback(() => setPendingPayment(null), []);

  const confirmPayment = useCallback(() => {
    if (!pendingPayment) return;
    const { character } = pendingPayment;
    setSpent((previous) => previous + amount);
    setHistory((previous) => [
      {
        id: 'DEMO-' + String(previous.length + 1).padStart(3, '0'),
        time: new Date().toLocaleString('vi-VN'),
        char: character,
        amount,
      },
      ...previous,
    ]);
    setPendingPayment(null);
    setAmount(0);
    setPayError('Đã tạo giao dịch minh họa; không có tiền được thu.');
  }, [amount, pendingPayment]);

  const value = useMemo<AppContextValue>(
    () => ({
      route,
      navigate,
      navOpen,
      toggleNav,
      user,
      verified,
      accountLabel: user ? (verified ? 'Tài khoản' : 'Xác thực SĐT') : 'Đăng nhập',
      accountTab,
      accountHeading: accountStateVisible
        ? 'Tài khoản đã xác thực'
        : accountTab
          ? ACCOUNT_TAB_HEADINGS[accountTab]
          : 'Đăng nhập',
      accountStateVisible,
      verifyPhone: user?.phone || 'Chưa có tài khoản',
      openRegister,
      selectAccountTab,
      createAccount,
      signIn,
      verifyOtp,
      signOut,
      amount,
      setAmount,
      spent,
      history,
      limit: DAILY_LIMIT,
      payError,
      setPayError,
      pendingPayment,
      requestPayment,
      cancelPayment,
      confirmPayment,
    }),
    [
      accountStateVisible,
      accountTab,
      amount,
      cancelPayment,
      confirmPayment,
      createAccount,
      history,
      navigate,
      navOpen,
      openRegister,
      payError,
      pendingPayment,
      requestPayment,
      route,
      selectAccountTab,
      signIn,
      signOut,
      spent,
      toggleNav,
      user,
      verified,
      verifyOtp,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp phải được dùng bên trong <AppProvider>.');
  }
  return context;
}
