import React from 'react';
import { X, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { ConversionCalculation, formatCurrencyAmount } from '../data/mockRates';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  calculation?: ConversionCalculation | null;
  mode?: 'transfer' | 'login' | 'signup' | 'action';
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  title = 'Practice Demo Confirmation',
  calculation,
  mode = 'transfer',
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
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-neutral-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Practice Notice Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#9FE870]/20 flex items-center justify-center text-[#163300]">
            <CheckCircle2 className="w-6 h-6 text-[#163300]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
            <p className="text-xs text-neutral-500">
              Frontend Development Practice Project
            </p>
          </div>
        </div>

        {/* Transfer summary if in transfer mode */}
        {mode === 'transfer' && calculation && (
          <div className="bg-[#F8F9FA] rounded-2xl p-5 mb-6 border border-neutral-200/80">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Simulated Transfer Summary
            </div>
            <div className="flex items-center justify-between py-2 border-b border-neutral-200">
              <span className="text-sm text-neutral-600">You simulated sending</span>
              <span className="text-sm font-bold text-neutral-900">
                {calculation.sourceCurrency.symbol}
                {formatCurrencyAmount(
                  calculation.sendAmount,
                  calculation.sourceCurrency.code
                )}{' '}
                {calculation.sourceCurrency.code}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-neutral-200">
              <span className="text-sm text-neutral-600">Simulated fee</span>
              <span className="text-sm font-semibold text-neutral-700">
                {calculation.sourceCurrency.symbol}
                {formatCurrencyAmount(
                  calculation.totalFee,
                  calculation.sourceCurrency.code
                )}{' '}
                {calculation.sourceCurrency.code}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-neutral-200">
              <span className="text-sm text-neutral-600">Demo exchange rate</span>
              <span className="text-xs font-mono font-medium text-neutral-700">
                1 {calculation.sourceCurrency.code} ={' '}
                {calculation.exchangeRate.toFixed(4)}{' '}
                {calculation.destinationCurrency.code}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <span className="text-sm font-medium text-neutral-900">
                Recipient simulated amount
              </span>
              <span className="text-base font-bold text-[#163300] bg-[#9FE870]/30 px-2.5 py-0.5 rounded-lg">
                {calculation.destinationCurrency.symbol}
                {formatCurrencyAmount(
                  calculation.recipientGets,
                  calculation.destinationCurrency.code
                )}{' '}
                {calculation.destinationCurrency.code}
              </span>
            </div>
          </div>
        )}

        {/* Disclaimer Card */}
        <div className="flex items-start gap-3 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl mb-6 text-amber-900">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-700 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <span className="font-semibold block mb-0.5">
              Notice: Non-functional practice demo
            </span>
            This interface is an educational frontend design practice project
            inspired by <strong>Wise</strong>. No actual financial
            services, banking connections, currency conversions, or payments
            exist. No real funds have been requested, stored, or processed.
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-5 text-sm font-bold bg-[#9FE870] hover:bg-[#8FE058] text-[#0E1500] rounded-xl transition-colors text-center inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            Got it, continue exploring
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
