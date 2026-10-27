import React, { useState } from 'react';
import { X, Plus, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_CURRENCIES, Currency } from '../data/currencies';

interface OpenBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBalance: (currency: Currency) => void;
}

export const OpenBalanceModal: React.FC<OpenBalanceModalProps> = ({
  isOpen,
  onClose,
  onOpenBalance,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200 overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#9FE870]/25 text-[#163300] flex items-center justify-center mb-4 shrink-0">
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight mb-1">
          Open a balance or jar
        </h3>
        <p className="text-xs text-neutral-500 mb-4">
          Choose a currency to hold and receive funds with local bank coordinates.
        </p>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {SUPPORTED_CURRENCIES.map((curr) => (
            <button
              key={curr.code}
              onClick={() => {
                onOpenBalance(curr);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3.5 bg-neutral-50 hover:bg-neutral-100 rounded-2xl border border-neutral-200/60 transition-colors text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none select-none">
                  {curr.flag}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900">
                      {curr.code}
                    </span>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs text-neutral-500">
                      {curr.symbol}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {curr.name} ({curr.country})
                  </div>
                </div>
              </div>

              <div className="px-3 py-1 bg-white group-hover:bg-[#9FE870] group-hover:text-[#0E1500] text-neutral-700 text-xs font-bold rounded-xl border border-neutral-200 transition-colors">
                Open
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
