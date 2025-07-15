import axios, { AxiosError } from 'axios';

export function handleAxiosError(err: unknown, defaultMessage: string): string {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError;

    if (axiosError.code === 'ERR_NETWORK') {
      return 'Kesalahan jaringan: Tidak dapat terhubung ke server. Periksa koneksi internet atau pastikan server aktif.';
    }

    if (axiosError.code === 'ECONNABORTED') {
      return 'Waktu permintaan habis (timeout). Silakan coba lagi atau periksa jaringan Anda.';
    }

    if (axiosError.code === 'ERR_CANCELED') {
      return 'Permintaan dibatalkan sebelum selesai.';
    }

    if (axiosError.response) {
      const status = axiosError.response.status;
      const dataMessage =
        (axiosError.response.data as any)?.message ||
        (axiosError.response.data as any)?.error ||
        'Terjadi kesalahan dari server.';

      return `Kesalahan server ${status}: ${dataMessage}`;
    }

    if (axiosError.request) {
      return 'Permintaan terkirim tetapi tidak ada respon dari server.';
    }

    return axiosError.message || defaultMessage;
  }

  return defaultMessage || 'Terjadi kesalahan tak terduga.';
}
