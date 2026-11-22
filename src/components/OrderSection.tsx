import { useEffect, useState, type RefObject, type MouseEvent } from 'react';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import {
  RATE_PER_ROBUX,
  ROBUX_PACKAGES,
  buildOrderPlainText,
  buildWhatsAppUrl,
  formatRobux,
  formatRupiah,
  sanitizePhoneDigits,
} from '../data/packages';
import type {
  OrderValidationErrors,
  SubmittedOrderSummary,
} from '../types/store';

const STORAGE_WA_KEY = 'atbuxstore_admin_wa';

interface OrderSectionProps {
  selectedAmount: number;
  onChangeAmount: (amount: number) => void;
  usernameInputRef: RefObject<HTMLInputElement | null>;
}

export function OrderSection({
  selectedAmount,
  onChangeAmount,
  usernameInputRef,
}: OrderSectionProps) {
  const [robloxUsername, setRobloxUsername] = useState('');
  const [whatsappInput, setWhatsappInput] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_WA_KEY) ?? '';
    } catch {
      return '';
    }
  });
  const [buyerName, setBuyerName] = useState('');
  const [errors, setErrors] = useState<OrderValidationErrors>({});
  const [copied, setCopied] = useState(false);
  const [lastSubmitted, setLastSubmitted] =
    useState<SubmittedOrderSummary | null>(null);

  const phoneDigits = sanitizePhoneDigits(whatsappInput);
  const totalIdr = selectedAmount * RATE_PER_ROBUX;

  const plainMessage = buildOrderPlainText({
    buyerName,
    robloxUsername,
    amount: selectedAmount,
    totalIdr,
  });

  const isFormValid =
    robloxUsername.trim().length > 0 && phoneDigits.length >= 9;

  const waUrl = isFormValid
    ? buildWhatsAppUrl({
        phoneDigits,
        buyerName,
        robloxUsername,
        amount: selectedAmount,
        totalIdr,
      })
    : '#pesan';

  useEffect(() => {
    try {
      if (phoneDigits) {
        localStorage.setItem(STORAGE_WA_KEY, phoneDigits);
      } else {
        localStorage.removeItem(STORAGE_WA_KEY);
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [phoneDigits]);

  function validateFields(): OrderValidationErrors {
    const nextErrors: OrderValidationErrors = {};
    if (!robloxUsername.trim()) {
      nextErrors.robloxUsername = 'Masukkan username Roblox terlebih dahulu.';
    }
    if (!phoneDigits || phoneDigits.length < 9) {
      nextErrors.whatsappNumber =
        'Masukkan nomor WhatsApp admin yang valid (minimal 9 digit angka).';
    }
    return nextErrors;
  }

  function handleWhatsAppClick(event: MouseEvent<HTMLAnchorElement>) {
    const validationErrors = validateFields();
    if (
      validationErrors.robloxUsername ||
      validationErrors.whatsappNumber
    ) {
      event.preventDefault();
      setErrors(validationErrors);
      if (validationErrors.robloxUsername) {
        usernameInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
    const orderCode = `ATB-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastSubmitted({
      orderCode,
      robloxUsername: robloxUsername.trim(),
      buyerName: buyerName.trim() || '-',
      amount: selectedAmount,
      totalIdr,
      whatsappNumber: phoneDigits,
      waUrl,
      plainMessage,
      createdAt: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }

  async function handleCopyFormat() {
    const validationErrors = validateFields();
    if (validationErrors.robloxUsername) {
      setErrors((prev) => ({
        ...prev,
        robloxUsername: validationErrors.robloxUsername,
      }));
      usernameInputRef.current?.focus();
      return;
    }

    try {
      await navigator.clipboard.writeText(plainMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="pesan" className="mx-auto w-[min(1120px,92%)] py-10">
      <div className="rounded-3xl border border-[#4c3c66] bg-gradient-to-br from-[#1f1935] to-[#131223] p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#f7f5ff] sm:text-3xl">
              Pesan Robux sekarang
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#aaa8c2]">
              Isi detail pesanan. Tombol pesan akan membuka WhatsApp dengan
              format order otomatis.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="roblox"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-[#d9d3ec]"
                >
                  Username Roblox
                </label>
                <input
                  ref={usernameInputRef}
                  id="roblox"
                  type="text"
                  autoComplete="off"
                  value={robloxUsername}
                  onChange={(e) => {
                    setRobloxUsername(e.target.value);
                    if (errors.robloxUsername) {
                      setErrors((prev) => ({
                        ...prev,
                        robloxUsername: undefined,
                      }));
                    }
                  }}
                  placeholder="Masukkan username Roblox"
                  aria-invalid={Boolean(errors.robloxUsername)}
                  aria-describedby={
                    errors.robloxUsername ? 'roblox-error' : undefined
                  }
                  className={`min-h-[46px] w-full rounded-xl border bg-[#0d0c19] px-3.5 py-3 text-sm text-white placeholder-[#696585] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ff4fa3] ${
                    errors.robloxUsername
                      ? 'border-rose-400'
                      : 'border-[#3d3856] focus:border-[#ff4fa3]'
                  }`}
                />
                {errors.robloxUsername && (
                  <p
                    id="roblox-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-300"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.robloxUsername}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="package"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-[#d9d3ec]"
                >
                  Pilih paket Robux
                </label>
                <select
                  id="package"
                  value={selectedAmount}
                  onChange={(e) => onChangeAmount(Number(e.target.value))}
                  className="min-h-[46px] w-full rounded-xl border border-[#3d3856] bg-[#0d0c19] px-3.5 py-3 text-sm text-white outline-none transition-colors focus:border-[#ff4fa3] focus-visible:ring-2 focus-visible:ring-[#ff4fa3]"
                >
                  {ROBUX_PACKAGES.map((pkg) => (
                    <option key={pkg.amount} value={pkg.amount}>
                      {formatRobux(pkg.amount)} Robux —{' '}
                      {formatRupiah(pkg.priceIdr)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="wa"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-[#d9d3ec]"
                >
                  Nomor WhatsApp ATBUXSTORE
                </label>
                <input
                  id="wa"
                  type="tel"
                  inputMode="numeric"
                  value={whatsappInput}
                  onChange={(e) => {
                    const onlyDigits = sanitizePhoneDigits(e.target.value);
                    setWhatsappInput(onlyDigits);
                    if (errors.whatsappNumber) {
                      setErrors((prev) => ({
                        ...prev,
                        whatsappNumber: undefined,
                      }));
                    }
                  }}
                  placeholder="Contoh: 6281234567890"
                  aria-invalid={Boolean(errors.whatsappNumber)}
                  aria-describedby={errors.whatsappNumber ? 'wa-error' : undefined}
                  className={`font-mono min-h-[46px] w-full rounded-xl border bg-[#0d0c19] px-3.5 py-3 text-sm tabular-nums text-white placeholder-[#696585] placeholder:font-sans outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#ff4fa3] ${
                    errors.whatsappNumber
                      ? 'border-rose-400'
                      : 'border-[#3d3856] focus:border-[#ff4fa3]'
                  }`}
                />
                {errors.whatsappNumber && (
                  <p
                    id="wa-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-300"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.whatsappNumber}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="buyer"
                  className="mb-1.5 block text-xs font-semibold tracking-wide text-[#d9d3ec]"
                >
                  Nama pembeli (opsional)
                </label>
                <input
                  id="buyer"
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Nama kamu"
                  className="min-h-[46px] w-full rounded-xl border border-[#3d3856] bg-[#0d0c19] px-3.5 py-3 text-sm text-white placeholder-[#696585] outline-none transition-colors focus:border-[#ff4fa3] focus-visible:ring-2 focus-visible:ring-[#ff4fa3]"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={waUrl}
                target={isFormValid ? '_blank' : undefined}
                rel={isFormValid ? 'noopener noreferrer' : undefined}
                onClick={handleWhatsAppClick}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#18b96c] to-[#0c9b63] px-5 py-3 text-sm font-extrabold tracking-wide text-white shadow-[0_10px_24px_rgba(24,185,108,0.22)] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18b96c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#131223]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>PESAN VIA WHATSAPP</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={handleCopyFormat}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#3d3856] bg-[#0e0d1a] px-4 py-3 text-sm font-semibold text-[#e6e1f7] transition-colors duration-150 hover:border-[#ff4fa3]/70 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
                    <span className="text-emerald-300">Format Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[#b2afc9]" aria-hidden="true" />
                    <span>Salin Format Order</span>
                  </>
                )}
              </button>
            </div>

            <p className="mt-3.5 text-xs leading-relaxed text-[#9f9cba]">
              *Masukkan nomor WhatsApp admin dengan kode negara, tanpa tanda +
              atau spasi. Pastikan username Roblox sudah benar.
            </p>
          </div>

          <div className="flex flex-col justify-between border-t border-white/[0.08] pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <div>
              <div className="flex items-center justify-between text-xs text-[#9c99b8]">
                <span className="font-semibold uppercase tracking-wider text-[#d6c9f7]">
                  Ringkasan Pesanan
                </span>
                <span className="font-mono tabular-nums">
                  Rate Rp{RATE_PER_ROBUX}
                </span>
              </div>

              <dl className="mt-4 space-y-2.5 border-b border-white/[0.08] pb-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#aaa8c2]">Username Roblox</dt>
                  <dd className="truncate font-semibold text-[#f7f5ff]">
                    {robloxUsername.trim() || 'Belum diisi'}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#aaa8c2]">Paket Dipilih</dt>
                  <dd className="font-mono font-semibold tabular-nums text-[#f7f5ff]">
                    {formatRobux(selectedAmount)} Robux
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[#aaa8c2]">Admin WhatsApp</dt>
                  <dd className="font-mono tabular-nums text-[#d6c9f7]">
                    {phoneDigits ? `+${phoneDigits}` : 'Belum diisi'}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-2 border-t border-white/[0.06]">
                  <dt className="font-semibold text-[#f7f5ff]">Total Bayar</dt>
                  <dd className="font-mono text-xl font-bold tabular-nums text-[#ff8dc3]">
                    {formatRupiah(totalIdr)}
                  </dd>
                </div>
              </dl>

              <div className="mt-4">
                <div className="mb-2 text-xs font-semibold text-[#aaa8c2]">
                  Pratinjau pesan WhatsApp
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-xl border border-white/[0.07] bg-[#0b0a15] p-3.5 font-sans text-xs leading-relaxed text-[#d9d5eb]">
                  {plainMessage}
                </pre>
              </div>
            </div>

            {lastSubmitted && (
              <div
                role="status"
                className="mt-4 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3.5 text-xs text-emerald-100"
              >
                <div className="flex items-center gap-2 font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    Pesanan {lastSubmitted.orderCode} disiapkan ({lastSubmitted.createdAt})
                  </span>
                </div>
                <p className="mt-1 leading-relaxed text-emerald-100/85">
                  {formatRobux(lastSubmitted.amount)} Robux untuk{' '}
                  <strong className="text-white">
                    {lastSubmitted.robloxUsername}
                  </strong>{' '}
                  ({formatRupiah(lastSubmitted.totalIdr)}). Jika tab WhatsApp
                  tidak terbuka otomatis, gunakan tombol{' '}
                  <a
                    href={lastSubmitted.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold text-white"
                  >
                    Buka WhatsApp
                  </a>{' '}
                  atau Salin Format Order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
