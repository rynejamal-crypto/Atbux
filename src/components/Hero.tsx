import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { formatRobux, formatRupiah, RATE_PER_ROBUX } from '../data/packages';

interface HeroProps {
  selectedAmount: number;
  onQuickOrder: () => void;
}

export function Hero({ selectedAmount, onQuickOrder }: HeroProps) {
  const selectedPrice = selectedAmount * RATE_PER_ROBUX;

  return (
    <section
      id="top"
      className="mx-auto w-[min(1120px,92%)] pt-10 pb-10 md:pt-14 md:pb-12"
    >
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-[0.14em] text-[#ff8dc3] uppercase">
            <span>Welcome to ATBUXSTORE</span>
            <span aria-hidden="true" className="text-[#6d698c]">
              ·
            </span>
            <span className="text-[#d6c9f7]">WTS Robux · Visend R150</span>
          </div>

          <h1
            className="font-display mt-4 text-[clamp(2.35rem,4.8vw,3.9rem)] font-extrabold leading-[1.06] tracking-tight text-[#f7f5ff]"
            style={{ textWrap: 'balance' }}
          >
            Top Up Robux{' '}
            <span className="bg-gradient-to-r from-[#ff4fa3] to-[#b28aff] bg-clip-text text-transparent">
              Mudah &amp; Aman
            </span>
          </h1>

          <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-[#b2afc9]">
            Butuh Robux untuk avatar, item, atau game favoritmu? Pilih paket
            Robux yang kamu mau dan lakukan pemesanan langsung melalui
            WhatsApp dengan format otomatis.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href="#harga"
              className="inline-flex min-h-[46px] items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#ff4fa3] to-[#9b6cff] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_28px_rgba(192,60,151,0.28)] transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090914]"
            >
              <span>Lihat Daftar Harga</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={onQuickOrder}
              className="inline-flex min-h-[46px] items-center gap-2 whitespace-nowrap rounded-xl border border-white/[0.12] bg-[#141426] px-5 py-3 text-sm font-semibold text-[#e8e5f8] transition-colors duration-150 hover:border-[#ff4fa3]/60 hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3]"
            >
              <span>Langsung Isi Form</span>
              <ArrowUpRight className="h-4 w-4 text-[#ff8dc3]" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#211c39] to-[#131224] p-7 text-center shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between text-xs text-[#aaa8c2]">
              <span>Visend via Username</span>
              <span className="font-mono tabular-nums text-[#e6dcff]">
                Rate Rp{RATE_PER_ROBUX} / R$
              </span>
            </div>

            <div className="my-6 flex flex-col items-center">
              <div
                aria-hidden="true"
                className="relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-[#ffe8a8] via-[#f0b14d] to-[#d47f24] shadow-[inset_0_0_0_7px_rgba(255,255,255,0.28),0_14px_38px_rgba(233,155,57,0.38)]"
              >
                <div className="grid h-24 w-24 place-items-center rounded-full border border-[#744015]/25 bg-gradient-to-b from-[#fff2c7]/40 to-transparent">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-[#6d3910]">
                    R$
                  </span>
                </div>
              </div>

              <h2 className="font-display mt-5 text-2xl font-bold tracking-tight text-[#f7f5ff]">
                WTS VISEND R150
              </h2>
              <p className="mt-1.5 text-xs text-[#b2afc9]">
                Harga jelas · Pilih paket · Pesan via WhatsApp
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 text-left">
              <div>
                <div className="text-xs text-[#9c99b8]">Paket aktif</div>
                <div className="font-mono text-sm font-semibold tabular-nums text-[#f7f5ff]">
                  {formatRobux(selectedAmount)} Robux
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#9c99b8]">Estimasi bayar</div>
                <div className="font-mono text-base font-bold tabular-nums text-[#ff8dc3]">
                  {formatRupiah(selectedPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
