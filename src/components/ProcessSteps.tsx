const STEPS = [
  {
    number: '01',
    title: 'Proses pemesanan',
    description:
      'Pilih nominal, isi username Roblox, lalu kirim detail order ke admin.',
  },
  {
    number: '02',
    title: 'Konfirmasi admin',
    description:
      'Admin akan membantu konfirmasi pesanan dan metode transaksi.',
  },
  {
    number: '03',
    title: 'Periksa detail',
    description:
      'Pastikan nominal dan username sudah sesuai sebelum menyelesaikan pembayaran.',
  },
];

export function ProcessSteps() {
  return (
    <section id="cara-order" className="mx-auto w-[min(1120px,92%)] pb-14 pt-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <article
            key={step.number}
            className="rounded-2xl border border-[#302d49] bg-[#111121] p-5"
          >
            <div className="font-mono text-xs font-bold tabular-nums text-[#ff8dc3]">
              {step.number}
            </div>
            <h3 className="font-display mt-2 text-base font-bold text-[#f7f5ff]">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#aaa8c2]">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
