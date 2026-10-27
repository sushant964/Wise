import React, { useState } from 'react';
import { X, Copy, Check, Building2, ShieldCheck } from 'lucide-react';

interface AccountDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountDetailsModal: React.FC<AccountDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const details = [
    { label: 'Account holder', value: 'Deeshan A. (Demo User)', key: 'holder' },
    { label: 'Account type', value: 'Checking', key: 'type' },
    { label: 'Routing number (ACH)', value: '026073150', key: 'ach' },
    { label: 'Wire routing number', value: '026073150', key: 'wire' },
    { label: 'Account number', value: '984021876534', key: 'account' },
    {
      label: 'Bank name & address',
      value: 'Wise Partner Bank, 30 Wall St, New York, NY 10005',
      key: 'bank',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-neutral-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#9FE870]/20 flex items-center justify-center text-[#163300]">
            <Building2 className="w-6 h-6 text-[#163300]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-neutral-900">
                USD Account Details
              </span>
              <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full font-medium">
                Simulated
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Mock bank details for domestic and international wire transfers
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {details.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-3.5 bg-neutral-50 hover:bg-neutral-100/80 rounded-2xl border border-neutral-200/70 transition-colors"
            >
              <div className="overflow-hidden pr-3">
                <span className="text-xs text-neutral-500 block mb-0.5">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-neutral-900 font-mono select-all">
                  {item.value}
                </span>
              </div>
              <button
                onClick={() => handleCopy(item.key, item.value)}
                className="shrink-0 p-2 text-neutral-500 hover:text-[#163300] hover:bg-[#9FE870]/30 rounded-xl transition-all cursor-pointer"
                title="Copy to clipboard"
              >
                {copiedField === item.key ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="p-3.5 bg-neutral-100/80 rounded-2xl border border-neutral-200 text-neutral-600 text-xs flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            These are mock banking identifiers intended only for frontend visual
            simulation.
          </span>
        </div>
      </div>
    </div>
  );
};
