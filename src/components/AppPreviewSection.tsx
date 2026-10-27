import React, { useState } from 'react';
import {
  Info,
  ChevronDown,
  ChevronRight,
  Plus,
  Landmark,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Coins,
} from 'lucide-react';
import { AccountDetailsModal } from './AccountDetailsModal';
import { DemoModal } from './DemoModal';

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: string;
  currency: string;
  isPositive: boolean;
  date: string;
  status: string;
}

export const AppPreviewSection: React.FC = () => {
  const [inrBalance, setInrBalance] = useState(0.0);
  const [usdBalance, setUsdBalance] = useState(0.0);
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSimulateReceive = () => {
    const addedUSD = 500;
    const addedINR = 41725;
    setUsdBalance((prev) => prev + addedUSD);
    setInrBalance((prev) => prev + addedINR);

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: 'Acme Global Client Payout',
      category: 'Inward remittance',
      amount: '+₹41,725.00',
      currency: 'INR',
      isPositive: true,
      date: 'Just now',
      status: 'Completed',
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast('Simulated receiving ₹41,725.00 ($500 USD equivalent)');
  };

  const handleSimulateSpend = () => {
    if (usdBalance < 4.5 && inrBalance < 375) {
      showToast('Simulate receiving funds first to test spending!');
      return;
    }

    setUsdBalance((prev) => Math.max(0, prev - 4.5));
    setInrBalance((prev) => Math.max(0, prev - 375));

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: 'Artisan Espresso Roasters',
      category: 'Digital Card Purchase',
      amount: '-₹375.00',
      currency: 'INR',
      isPositive: false,
      date: 'Just now',
      status: 'Settled',
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast('Simulated card payment of ₹375.00 ($4.50 USD)');
  };

  return (
    <section
      id="account-preview"
      className="py-16 lg:py-24 bg-[#F2F4F0]/60 border-y border-neutral-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-bold text-neutral-800 shadow-2xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#163300]" />
            <span>Interactive Account Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            How your borderless account feels in practice
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Inspired directly by modern multi-currency account interfaces. Click the buttons below to simulate receiving funds, spending, and inspecting local bank coordinates.
          </p>

          {/* Interactive controls */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleSimulateReceive}
              className="px-4 py-2 bg-[#9FE870] hover:bg-[#8FE058] text-[#0E1500] rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Simulate receive ₹41,725 ($500)</span>
            </button>
            <button
              onClick={handleSimulateSpend}
              className="px-4 py-2 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>Simulate card coffee -₹375</span>
            </button>
            <button
              onClick={() => {
                setInrBalance(0);
                setUsdBalance(0);
                setTransactions([]);
                showToast('Reset practice balances');
              }}
              className="px-3 py-2 text-neutral-500 hover:text-neutral-800 text-xs font-medium cursor-pointer"
            >
              Reset view
            </button>
          </div>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-neutral-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <CheckCircle2 className="w-4 h-4 text-[#9FE870]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* The Account Frame */}
        <div className="max-w-md mx-auto bg-white rounded-[2.5rem] p-6 sm:p-7 shadow-2xl border border-neutral-200/90 relative overflow-hidden">
          {/* Top Bar matching screenshot */}
          <div className="flex items-center justify-between pb-6">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700">
              <span className="font-bold text-sm">≡</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-3 py-1.5 bg-[#9FE870] hover:bg-[#8FE058] text-[#0E1500] rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Earn ₹9,000
              </button>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-full text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Open</span>
                <span>+</span>
              </button>

              <div className="flex items-center gap-1 pl-1 cursor-pointer" onClick={() => setIsDemoModalOpen(true)}>
                <div className="w-8 h-8 rounded-full bg-neutral-200 text-neutral-800 font-bold text-xs flex items-center justify-center">
                  DA
                </div>
                <span className="text-xs font-semibold text-neutral-900 hidden sm:inline">
                  Deeshan A
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>
          </div>

          {/* Section: Getting Started */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-3">
              Getting Started
            </h3>

            {/* Pastel Yellow Card matching screenshot */}
            <div
              onClick={() => setIsDemoModalOpen(true)}
              className="bg-[#FFE57F]/60 hover:bg-[#FFE57F]/80 transition-colors rounded-3xl p-5 cursor-pointer relative overflow-hidden min-h-[140px] flex flex-col justify-between border border-[#F6D860]/40"
            >
              <div className="max-w-[150px]">
                <h4 className="font-extrabold text-neutral-900 text-base leading-snug">
                  Start receiving payments
                </h4>
              </div>

              {/* Styled CSS/SVG Stack of Bills Illustration */}
              <div className="absolute right-4 bottom-3 w-24 h-24 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-10 bg-emerald-300 rounded-md shadow-md rotate-[-8deg] border border-emerald-400 flex items-center justify-center text-[10px] font-bold text-emerald-800">
                    ₹ 500
                  </div>
                  <div className="w-16 h-10 bg-emerald-400 rounded-md shadow-md rotate-[6deg] -mt-7 ml-2 border border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-900">
                    ₹ 500
                  </div>
                  <div className="w-16 h-10 bg-teal-300 rounded-md shadow-lg rotate-[-2deg] -mt-7 ml-1 border border-teal-400 flex items-center justify-center text-[10px] font-bold text-teal-900">
                    $ 100
                  </div>
                  <div className="absolute -left-2 top-0 text-amber-500">
                    <Coins className="w-5 h-5 fill-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Balance */}
          <div className="mb-6">
            <div className="text-xs text-neutral-500 font-medium mb-1">
              Total balance
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-extrabold text-neutral-900 font-mono">
                {inrBalance.toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{' '}
                INR
              </span>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                aria-label="Balance information"
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleSimulateReceive}
              className="px-4 py-2 bg-[#9FE870] hover:bg-[#8FE058] text-[#0E1500] rounded-full text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Get paid</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Side-by-side Accounts Cards matching screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Main account card */}
            <div className="bg-[#F4F5F7] rounded-3xl p-4 flex flex-col justify-between min-h-[170px] border border-neutral-200/60">
              <div>
                <div className="flex items-center justify-between cursor-pointer mb-2">
                  <div>
                    <h5 className="font-bold text-sm text-neutral-900">
                      Main account
                    </h5>
                    <div className="text-xs font-semibold text-neutral-600 font-mono">
                      ₹
                      {inrBalance.toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </div>

                <div className="flex items-center justify-between cursor-pointer pt-2 border-t border-neutral-200/50">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">🇺🇸</span>
                    <span className="text-xs font-semibold text-neutral-700 font-mono">
                      $
                      {usdBalance.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                </div>
              </div>

              {/* Account details button */}
              <button
                onClick={() => setIsAccountDetailsOpen(true)}
                className="w-full mt-3 py-2 px-3 bg-neutral-200/70 hover:bg-neutral-200 text-neutral-800 rounded-full text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Account details</span>
              </button>
            </div>

            {/* Do more with your money card */}
            <div className="bg-[#F4F5F7] rounded-3xl p-4 flex flex-col justify-between min-h-[170px] text-center border border-neutral-200/60 relative overflow-hidden">
              <div className="pt-2">
                <h5 className="font-bold text-sm text-neutral-900 mb-1">
                  Do more with your money
                </h5>
                <p className="text-[11px] text-neutral-500 leading-relaxed px-1">
                  Manage it, share it with others, and earn a return.
                </p>
              </div>

              <div className="flex justify-center pb-2">
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  aria-label="Add balance or jar"
                  className="w-10 h-10 rounded-full bg-[#9FE870] hover:bg-[#8FE058] text-[#0E1500] flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-xs"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>

          {/* Transactions Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-base text-neutral-900">
                Transactions
              </h4>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 underline cursor-pointer"
              >
                See all
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="flex items-center gap-3 py-4 text-neutral-400 text-xs">
                <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <Clock className="w-4 h-4" />
                </div>
                <span>No transactions yet</span>
              </div>
            ) : (
              <div className="space-y-2">
                {transactions.slice(0, 3).map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-2.5 bg-neutral-50 hover:bg-neutral-100/70 rounded-2xl transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${
                          tx.isPositive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {tx.isPositive ? (
                          <ArrowDownLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-neutral-800">
                          {tx.title}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          {tx.category} · {tx.date}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-mono font-bold ${
                        tx.isPositive ? 'text-emerald-700' : 'text-neutral-900'
                      }`}
                    >
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Details Modal */}
      <AccountDetailsModal
        isOpen={isAccountDetailsOpen}
        onClose={() => setIsAccountDetailsOpen(false)}
      />

      {/* Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Simulated Account Action"
        mode="action"
      />
    </section>
  );
};
