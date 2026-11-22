import { useRef, useState } from 'react';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { OrderSection } from './components/OrderSection';
import { PriceGrid } from './components/PriceGrid';
import { ProcessSteps } from './components/ProcessSteps';

export default function App() {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  function scrollToOrderAndFocus() {
    const orderSection = document.getElementById('pesan');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      usernameInputRef.current?.focus({ preventScroll: true });
    }, 350);
  }

  function handleSelectPackage(amount: number) {
    setSelectedAmount(amount);
    scrollToOrderAndFocus();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onStartOrder={scrollToOrderAndFocus} />

      <main className="flex-1">
        <Hero
          selectedAmount={selectedAmount}
          onQuickOrder={scrollToOrderAndFocus}
        />
        <PriceGrid
          selectedAmount={selectedAmount}
          onSelectPackage={handleSelectPackage}
        />
        <OrderSection
          selectedAmount={selectedAmount}
          onChangeAmount={setSelectedAmount}
          usernameInputRef={usernameInputRef}
        />
        <ProcessSteps />
      </main>

      <Footer />
    </div>
  );
}
