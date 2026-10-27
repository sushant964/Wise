import React, { useState } from 'react';
import { X, Gift, Copy, Check, Users } from 'lucide-react';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralModal: React.FC<ReferralModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const referralLink = 'https://wise.com/invite/ihpc/deeshana-practice';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

        <div className="w-14 h-14 rounded-2xl bg-[#9FE870]/25 text-[#163300] flex items-center justify-center mb-5">
          <Gift className="w-7 h-7 stroke-[2]" />
        </div>

        <h3 className="text-2xl font-extrabold text-neutral-900 tracking-tight mb-2">
          Earn ₹9,000 for inviting 3 friends
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          Invite friends who transfer over ₹50,000 (or $600 USD) each. Once 3
          friends send money, you&apos;ll earn a reward of ₹9,000 credited directly to
          your Wise balance.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-100 text-xs text-neutral-700">
            <Users className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>0 of 3 friends invited have completed a qualifying transfer</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-neutral-100/80 rounded-2xl border border-neutral-200">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="w-full bg-transparent text-xs text-neutral-800 font-mono px-2 outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 bg-[#9FE870] hover:bg-[#8FE058] text-[#0E1500] font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
