export interface ToastModel {
  severity: 'success' | 'info' | 'warn' | 'error';
  message: string;
  duration?: number;
}
