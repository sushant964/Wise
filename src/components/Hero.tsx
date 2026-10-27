import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { CurrencyConverter } from './CurrencyConverter';

interface HeroProps {
  currentTab: 'personal' | 'business';
  onExploreAccount: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentTab,
  onExploreAccount,
}) => {
  return (
    <section
      id="converter"
      className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F7F9F6] via-[#F8F9FA] to-white"
    >
      {/* Subtle background ambient graphic accents */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#9FE870]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Bold Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mode Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200/80 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#163300]" />
              <span className="text-xs font-bold text-neutral-800 tracking-wide">
                {currentTab === 'personal'
                  ? 'Wise Personal'
                  : 'Wise Business'}
              </span>
              <span className="text-neutral-300">·</span>
              <span className="text-xs text-neutral-500 font-medium">
                Live interactive showcase
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 tracking-tight leading-[1.08] text-balance">
              {currentTab === 'personal' ? (
                <>
                  Money for{' '}
                  <span className="text-[#163300] underline decoration-[#9FE870] decoration-wavy decoration-2">
                    here, there
                  </span>
                  , and everywhere.
                </>
              ) : (
                <>
                  The global account built for{' '}
                  <span className="text-[#163300] underline decoration-[#9FE870] decoration-wavy decoration-2">
                    international business
                  </span>
                  .
                </>
              )}
            </h1>

            {/* Supporting Prose */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl leading-relaxed">
              {currentTab === 'personal'
                ? 'Send money abroad up to 8x cheaper than traditional banks. Experience transparent exchange rates, zero hidden conversion markups, and multi-currency accounts built for international life.'
                : 'Pay overseas suppliers, receive client funds in 9+ currencies without local entities, and automate batch payroll worldwide with ultra-low transparent fees.'}
            </p>

            {/* Human Editorial Proof Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white/80 border border-neutral-200/60 p-2.5 rounded-xl shadow-2xs">
                <Globe className="w-4 h-4 text-[#163300] shrink-0" />
                <span>40+ currencies supported</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white/80 border border-neutral-200/60 p-2.5 rounded-xl shadow-2xs">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent mid-market rates</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800 bg-white/80 border border-neutral-200/60 p-2.5 rounded-xl shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-neutral-900 shrink-0" />
                <span>Zero hidden markup fees</span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                onClick={onExploreAccount}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm transition-all shadow-sm cursor-pointer"
              >
                <span>Explore simulated account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#comparison"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-neutral-300 hover:border-neutral-400 bg-white text-neutral-700 font-semibold text-sm transition-colors cursor-pointer"
              >
                See fee comparison
              </a>
            </div>

            {/* Small reassurance note */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 pt-2">
              <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                ✓
              </span>
              <span>
                Demonstration platform • Over 160 countries simulated • Instant calculations
              </span>
            </div>
          </div>

          {/* Right Column: Currency Converter Component */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </section>
  );
};
