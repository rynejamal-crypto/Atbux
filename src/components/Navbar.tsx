interface NavbarProps {
  onStartOrder: () => void;
}

export function Navbar({ onStartOrder }: NavbarProps) {
  return (
    <header className="border-b border-white/[0.08] bg-[#090914]/90 backdrop-blur-md">
      <div className="mx-auto flex w-[min(1120px,92%)] items-center justify-between gap-8 py-4">
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-[0.06em] text-[#f7f5ff] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3] rounded-sm"
        >
          AT<span className="text-[#ff4fa3]">BUX</span>STORE
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#b4b1cc]"
        >
          <a
            href="#harga"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#f7f5ff] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3] rounded-sm"
          >
            Daftar Harga
          </a>
          <a
            href="#pesan"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#f7f5ff] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3] rounded-sm"
          >
            Pesan Sekarang
          </a>
          <a
            href="#cara-order"
            className="whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#f7f5ff] hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3] rounded-sm"
          >
            Cara Order
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onStartOrder}
            className="min-h-[42px] whitespace-nowrap shrink-0 rounded-xl bg-gradient-to-r from-[#ff4fa3] to-[#9b6cff] px-4 py-2 text-sm font-semibold text-white transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4fa3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090914]"
          >
            Pesan Robux
          </button>
        </div>
      </div>
    </header>
  );
}
