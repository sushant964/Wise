import React, { useState, useMemo } from 'react';
import { X, Search, Check } from 'lucide-react';
import { Currency, SUPPORTED_CURRENCIES } from '../data/currencies';

interface CurrencyPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  selectedCode: string;
  title?: string;
}

export const CurrencyPickerModal: React.FC<CurrencyPickerModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedCode,
  title = 'Select currency',
}) => {
  const [search, setSearch] = useState('');

  const filteredCurrencies = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return SUPPORTED_CURRENCIES;
    return SUPPORTED_CURRENCIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
    );
  }, [search]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close currency picker"
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search bar */}
        <div className="pt-4 pb-2">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by currency code or country (e.g. EUR, USD, Yen)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-100/80 hover:bg-neutral-100 focus:bg-white border border-transparent focus:border-neutral-300 rounded-2xl outline-none transition-all placeholder:text-neutral-400 font-medium"
              autoFocus
            />
          </div>
        </div>

        {/* Currency List */}
        <div className="flex-1 overflow-y-auto py-2 space-y-1 divide-y divide-neutral-100/60">
          {filteredCurrencies.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-sm">
              No currencies match &quot;{search}&quot;
            </div>
          ) : (
            filteredCurrencies.map((c) => {
              const isSelected = c.code === selectedCode;
              return (
                <button
                  key={c.code}
                  onClick={() => {
                    onSelect(c);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#9FE870]/25 text-[#163300] font-semibold'
                      : 'hover:bg-neutral-50 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none select-none">
                      {c.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm tracking-wide">
                          {c.code}
                        </span>
                        <span className="text-xs text-neutral-400">·</span>
                        <span className="text-xs text-neutral-500 font-medium">
                          {c.symbol}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-500">
                        {c.name} ({c.country})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {c.popular && !isSelected && (
                      <span className="text-[11px] text-neutral-400 font-medium hidden sm:inline">
                        Popular
                      </span>
                    )}
                    {isSelected && (
                      <Check className="w-5 h-5 text-[#163300] stroke-[2.5]" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="pt-3 border-t border-neutral-100 text-center">
          <span className="text-[11px] text-neutral-400">
            Illustrative demo currencies and exchange benchmarks
          </span>
        </div>
      </div>
    </div>
  );
};
