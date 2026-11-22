import { Check } from 'lucide-react';
import {
  ROBUX_PACKAGES,
  RATE_PER_ROBUX,
  formatRobux,
  formatRupiah,
} from '../data/packages';

interface PriceGridProps {
  selectedAmount: number;
  onSelectPackage: (amount: number) => void;
}

export function PriceGrid({ selectedAmount, onSelectPackage }: PriceGridProps) {
  return (
    <section id="harga" className="mx-auto w-[min(1120px,92%)] py-6">
      <div className="mb-5 flex flex-col justify-between gap-2 border-b border-white/[0.07] pb-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#f7f5ff] sm:text-3xl">
            Daftar Harga Robux
          </h2>
        </div>
        <p className="text-xs text-[#aaa8c2] sm:text-sm">
          Rate <span className="font-mono tabular-nums text-[#e6dcff]">{RATE_PER_ROBUX}</span> · Harga dalam Rupiah (IDR)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5">
        {ROBUX_PACKAGES.map((pkg) => {
          const isSelected = pkg.amount === selectedAmount;
          return (
            <article
              key={pkg.amount}
              className={`group flex flex-col justify-between rounded-2xl border p-4 transition-all duration-150 ${
                isSelected
                  ? 'border-[#ff4fa3] bg-gradient-to-b from-[#251b3b] to-[#17162b] shadow-[0_10px_28px_rgba(255,79,163,0.16)]'
                  : 'border-[#302d49] bg-gradient-to-b from-[#1b1b32] to-[#141426] hover:-translate-y-0.5 hover:border-[#ff4fa3]/70'
              }`}
            >
              <div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-2xl font-bold tabular-nums text-[#f7f5ff]">
                    {formatRobux(pkg.amount)}
                  </span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff8dc3]">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Dipilih
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-xs font-medium tracking-wider text-[#9c99b8]">
                  ROBUX
                </div>
                <div className="font-mono my-3.5 text-lg font-bold tabular-nums text-[#ff8dc3]">
                  {formatRupiah(pkg.priceIdr)}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPackage(pkg.amount)}
                aria-pressed={isSelected}
                className={`min-h-[40px] w-full whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3] ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#ff4fa3] to-[#9b6cff] text-white'
                    : 'bg-[#2c2340] text-[#f3effc] group-hover:bg-gradient-to-r group-hover:from-[#ff4fa3] group-hover:to-[#9b6cff] group-hover:text-white'
                }`}
              >
                {isSelected ? 'Lanjut Pesan' : 'Pilih Paket'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
