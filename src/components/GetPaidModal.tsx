import React from 'react';
import {
  X,
  ArrowDownLeft,
  Building2,
  QrCode,
  Share2,
  Sparkles,
} from 'lucide-react';

interface GetPaidModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateReceive: (amountINR: number, amountUSD: number, title: string) => void;
  onViewAccountDetails: () => void;
}

export const GetPaidModal: React.FC<GetPaidModalProps> = ({
  isOpen,
  onClose,
  onSimulateReceive,
  onViewAccountDetails,
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
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-[#9FE870]/25 text-[#163300] flex items-center justify-center mb-4">
          <ArrowDownLeft className="w-6 h-6 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight mb-1">
          Receive payments with Wise
        </h3>
        <p className="text-xs text-neutral-500 mb-6">
          Get paid by clients, employers, and family with zero receiving fees.
        </p>

        <div className="space-y-3 mb-6">
          {/* Quick Simulation Button 1 */}
          <button
            onClick={() => {
              onSimulateReceive(41725, 500, 'US Tech Client Invoice Payout');
              onClose();
            }}
            className="w-full flex items-center justify-between p-4 bg-[#9FE870]/15 hover:bg-[#9FE870]/25 border border-[#9FE870]/40 rounded-2xl transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9FE870] text-[#0E1500] flex items-center justify-center font-bold text-xs shrink-0">
                ⚡
              </div>
              <div>
                <div className="font-bold text-sm text-[#0E1500]">
                  Simulate receiving $500 (₹41,725)
                </div>
                <div className="text-xs text-neutral-600">
                  Instant deposit into your main account
                </div>
              </div>
            </div>
          </button>

          {/* Quick Simulation Button 2 */}
          <button
            onClick={() => {
              onSimulateReceive(10000, 120, 'Freelance Project Advance');
              onClose();
            }}
            className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/80 rounded-2xl transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold text-xs shrink-0">
                ₹
              </div>
              <div>
                <div className="font-bold text-sm text-neutral-900">
                  Simulate receiving ₹10,000 INR
                </div>
                <div className="text-xs text-neutral-500">
                  Domestic inward transfer simulation
                </div>
              </div>
            </div>
          </button>

          {/* View Account Details */}
          <button
            onClick={() => {
              onClose();
              onViewAccountDetails();
            }}
            className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/80 rounded-2xl transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-200 text-neutral-800 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-neutral-900">
                  Share bank account details
                </div>
                <div className="text-xs text-neutral-500">
                  Routing & account number for ACH & wire
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
