import React from 'react';
import { Check, X, ArrowRight, Sparkles } from 'lucide-react';

export const FeatureComparison: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Exchange rate model',
      borderless: 'Real mid-market rate (Demo)',
      traditional: 'Hidden 3.5% to 6.0% markup',
      isHighlight: true,
    },
    {
      feature: 'Upfront fee transparency',
      borderless: '100% itemized upfront before sending',
      traditional: 'Vague fees + correspondent bank cuts',
    },
    {
      feature: 'Transfer completion speed',
      borderless: 'Instantly to under 2 hours',
      traditional: '2 to 5 business days',
    },
    {
      feature: 'Multi-currency holding',
      borderless: 'Hold 40+ currencies with $0 monthly fee',
      traditional: 'Single currency or monthly maintenance charges',
    },
    {
      feature: 'Local receiving account details',
      borderless: 'Local routing & IBANs in 9 currencies',
      traditional: 'Expensive foreign SWIFT wires only',
    },
    {
      feature: 'Mobile live status tracking',
      borderless: 'Instant push & timestamped progress',
      traditional: 'Requires phone inquiry to branch',
    },
  ];

  return (
    <section id="comparison" className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-bold text-neutral-800 shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#163300]" />
            <span>Transparent by Design</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
            See how the transparent approach compares
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600">
            Most institutions hide their real fees inside an unfavorable exchange rate. Here is what transparency means in numbers.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-neutral-200/90 overflow-hidden">
          <div className="grid grid-cols-12 bg-neutral-900 text-white p-5 sm:p-6 items-center">
            <div className="col-span-5 sm:col-span-5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Capability
            </div>
            <div className="col-span-4 sm:col-span-4 text-left">
              <span className="text-sm sm:text-base font-extrabold text-[#9FE870] block">
                Wise
              </span>
              <span className="text-[11px] text-neutral-400 hidden sm:inline">
                Modern transparent model
              </span>
            </div>
            <div className="col-span-3 sm:col-span-3 text-left">
              <span className="text-xs sm:text-sm font-bold text-neutral-300 block">
                Traditional Banks
              </span>
              <span className="text-[11px] text-neutral-500 hidden sm:inline">
                Legacy correspondent wires
              </span>
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {comparisonRows.map((row, idx) => (
              <div
                key={row.feature}
                className={`grid grid-cols-12 p-4 sm:p-5 items-center transition-colors hover:bg-neutral-50 ${
                  row.isHighlight ? 'bg-[#9FE870]/10' : ''
                }`}
              >
                <div className="col-span-5 sm:col-span-5 pr-2">
                  <div className="font-bold text-neutral-900 text-xs sm:text-sm">
                    {row.feature}
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-4 pr-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#163300] text-[#9FE870] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#163300]">
                      {row.borderless}
                    </span>
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-500 font-medium">
                      {row.traditional}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Bottom Callout */}
          <div className="p-6 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-600 max-w-lg text-center sm:text-left">
              Based on independent research comparing mid-market benchmark rates against major retail bank foreign exchange margins.
            </div>

            <a
              href="#converter"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9FE870] hover:bg-[#8FE058] text-[#0E1500] font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <span>Test with demo calculator</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
