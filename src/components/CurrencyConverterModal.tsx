import React from 'react';
import { X } from 'lucide-react';
import { CurrencyConverter } from './CurrencyConverter';

interface CurrencyConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencyConverterModal: React.FC<CurrencyConverterModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close currency converter"
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pr-10">
          <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
            Send & Convert Money
          </h3>
          <p className="text-xs text-neutral-500">
            Real-time illustrative currency conversion with transparent fees.
          </p>
        </div>

        <CurrencyConverter className="border-0 shadow-none p-0" />
      </div>
    </div>
  );
};
