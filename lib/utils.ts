import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Ghép class Tailwind theo chuẩn shadcn/ui: clsx xử lý điều kiện,
 * tailwind-merge loại bỏ các class xung đột khi component bị ghi đè.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
