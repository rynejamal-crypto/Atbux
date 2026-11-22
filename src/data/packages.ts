import type { RobuxPackage } from '../types/store';

export const RATE_PER_ROBUX = 150;

export const ROBUX_AMOUNTS: readonly number[] = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
];

export const ROBUX_PACKAGES: readonly RobuxPackage[] = ROBUX_AMOUNTS.map((amount) => ({
  amount,
  priceIdr: amount * RATE_PER_ROBUX,
}));

export function formatRupiah(value: number): string {
  return `Rp${value.toLocaleString('id-ID')}`;
}

export function formatRobux(amount: number): string {
  return amount.toLocaleString('id-ID');
}

export function sanitizePhoneDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

export function buildOrderPlainText(params: {
  buyerName: string;
  robloxUsername: string;
  amount: number;
  totalIdr: number;
}): string {
  const buyer = params.buyerName.trim() || '-';
  const username = params.robloxUsername.trim() || '[Username Roblox]';
  return [
    'Halo ATBUXSTORE, saya ingin order Robux.',
    '',
    `Nama: ${buyer}`,
    `Username Roblox: ${username}`,
    `Paket: ${formatRobux(params.amount)} Robux`,
    `Total: ${formatRupiah(params.totalIdr)}`,
    '',
    'Mohon konfirmasi pesanan saya.',
  ].join('\n');
}

export function buildWhatsAppUrl(params: {
  phoneDigits: string;
  buyerName: string;
  robloxUsername: string;
  amount: number;
  totalIdr: number;
}): string {
  const plainText = buildOrderPlainText({
    buyerName: params.buyerName,
    robloxUsername: params.robloxUsername,
    amount: params.amount,
    totalIdr: params.totalIdr,
  });
  return `https://wa.me/${params.phoneDigits}?text=${encodeURIComponent(plainText)}`;
}
