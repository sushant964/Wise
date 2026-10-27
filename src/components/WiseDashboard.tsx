import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Info,
  Clock,
  Landmark,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  ArrowLeftRight,
} from 'lucide-react';
import { AccountDetailsModal } from './AccountDetailsModal';
import { SidebarDrawer } from './SidebarDrawer';
import { ReferralModal } from './ReferralModal';
import { OpenBalanceModal } from './OpenBalanceModal';
import { GetPaidModal } from './GetPaidModal';
import { TransactionsModal, TransactionItem } from './TransactionsModal';
import { CurrencyConverterModal } from './CurrencyConverterModal';
import { DemoModal } from './DemoModal';
import { Currency } from '../data/currencies';
import { INITIAL_38_TRANSACTIONS } from '../data/initialTransactions';

export const WiseDashboard: React.FC = () => {
  // State for live balances initialized to user's exact values
  const [inrBalance, setInrBalance] = useState(85069);
  const [usdBalance, setUsdBalance] = useState(895.5);
  const [additionalBalances, setAdditionalBalances] = useState<
    { code: string; symbol: string; flag: string; amount: number }[]
  >([]);

  // Modals state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isOpenBalanceOpen, setIsOpenBalanceOpen] = useState(false);
  const [isGetPaidOpen, setIsGetPaidOpen] = useState(false);
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoActionTitle, setDemoActionTitle] = useState('Wise Action');
  const [showAllInline, setShowAllInline] = useState(false);

  // Transactions initialized with 38 foreign ad network transactions
  const [transactions, setTransactions] = useState<TransactionItem[]>(
    INITIAL_38_TRANSACTIONS
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSimulateReceive = (
    amountINR: number,
    amountUSD: number,
    title: string
  ) => {
    setInrBalance((prev) => prev + amountINR);
    setUsdBalance((prev) => prev + amountUSD);

    const newTx: TransactionItem = {
      id: Date.now().toString(),
      title,
      category: 'Foreign Ad Payout',
      amount: `+₹${amountINR.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      currency: 'INR',
      isPositive: true,
      date: 'Today',
      status: 'Completed',
    };

    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Received ₹${amountINR.toLocaleString('en-IN')} successfully!`);
  };

  const handleOpenNewBalance = (curr: Currency) => {
    if (curr.code === 'INR' || curr.code === 'USD') {
      showToast(`${curr.code} balance is already active.`);
      return;
    }

    if (additionalBalances.some((b) => b.code === curr.code)) {
      showToast(`${curr.code} balance is already open.`);
      return;
    }

    setAdditionalBalances((prev) => [
      ...prev,
      { code: curr.code, symbol: curr.symbol, flag: curr.flag, amount: 0.0 },
    ]);
    showToast(`Opened new ${curr.code} (${curr.name}) balance!`);
  };

  const handleOpenGenericDemo = (title: string) => {
    setDemoActionTitle(title);
    setIsDemoModalOpen(true);
  };

  // Helper formatting to match exact requested string representations
  const formattedInrBalance =
    inrBalance === 85069
      ? '85,069'
      : inrBalance.toLocaleString('en-IN', {
          minimumFractionDigits: inrBalance % 1 === 0 ? 0 : 2,
          maximumFractionDigits: 2,
        });

  const formattedUsdBalance =
    usdBalance === 895.5
      ? '895.5'
      : usdBalance.toLocaleString('en-US', {
          minimumFractionDigits: usdBalance % 1 === 0 ? 0 : 2,
          maximumFractionDigits: 2,
        });

  // Display top 8 transactions on homepage by default, or all 38 when expanded
  const displayedTransactions = showAllInline
    ? transactions
    : transactions.slice(0, 8);

  return (
    <div className="min-h-screen bg-white text-[#131811] antialiased selection:bg-[#9FE870] selection:text-[#0E1500]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#9FE870]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container matching the screenshot */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-6 md:py-8">
        {/* Top Header */}
        <header className="flex items-center justify-between pb-8">
          {/* Hamburger Icon on Left */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
            className="w-11 h-11 rounded-full bg-[#F2F4F7] hover:bg-neutral-200/80 flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span className="w-4 h-[2px] bg-neutral-900 rounded-full" />
            <span className="w-4 h-[2px] bg-neutral-900 rounded-full" />
            <span className="w-4 h-[2px] bg-neutral-900 rounded-full" />
          </button>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Earn ₹9,000 Pill */}
            <button
              onClick={() => setIsReferralOpen(true)}
              className="px-3.5 sm:px-4 py-2 bg-[#9FE870] hover:bg-[#8FE058] active:scale-[0.98] text-[#0E1500] font-bold text-xs sm:text-sm rounded-full transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              Earn ₹9,000
            </button>

            {/* Open + Pill */}
            <button
              onClick={() => setIsOpenBalanceOpen(true)}
              className="px-3.5 sm:px-4 py-2 bg-[#F2F4F7] hover:bg-neutral-200/80 text-neutral-900 font-bold text-xs sm:text-sm rounded-full transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>Open</span>
              <span className="text-base font-normal leading-none">+</span>
            </button>

            {/* Profile Pill */}
            <button
              onClick={() => handleOpenGenericDemo('User Profile: Deeshan A')}
              className="flex items-center gap-1.5 pl-1 py-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#E5E7EB] text-neutral-800 font-bold text-xs flex items-center justify-center shrink-0">
                DA
              </div>
              <span className="text-xs sm:text-sm font-semibold text-neutral-900 hidden sm:inline">
                Deeshan A
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </header>

        {/* Section: Getting Started */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 mb-4 tracking-tight">
            Getting Started
          </h2>

          {/* Yellow Card matching screenshot */}
          <div
            onClick={() => setIsGetPaidOpen(true)}
            className="w-52 sm:w-56 h-52 sm:h-56 bg-[#FEE564] hover:bg-[#FDD835] transition-all rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer shadow-xs group"
          >
            <div className="max-w-[130px]">
              <h3 className="font-extrabold text-base sm:text-lg text-neutral-900 leading-snug">
                Start receiving payments
              </h3>
            </div>

            {/* 3D Banknote & Coins Graphic matching screenshot */}
            <div className="absolute right-2 bottom-2 w-28 h-28 flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <svg
                viewBox="0 0 160 140"
                className="w-full h-full drop-shadow-sm select-none pointer-events-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="82"
                  cy="116"
                  rx="48"
                  ry="12"
                  fill="#E6C843"
                  opacity="0.5"
                />

                <g transform="rotate(-12 80 80)">
                  <rect
                    x="25"
                    y="66"
                    width="74"
                    height="42"
                    rx="4"
                    fill="#0F766E"
                  />
                  <rect
                    x="28"
                    y="63"
                    width="74"
                    height="42"
                    rx="4"
                    fill="#14B8A6"
                  />
                  <rect
                    x="31"
                    y="60"
                    width="74"
                    height="42"
                    rx="4"
                    fill="#2DD4BF"
                  />
                  <rect
                    x="34"
                    y="57"
                    width="74"
                    height="42"
                    rx="4"
                    fill="#5EEAD4"
                    stroke="#0F766E"
                    strokeWidth="1.2"
                  />
                  <rect
                    x="38"
                    y="61"
                    width="66"
                    height="34"
                    rx="2"
                    fill="#99F6E4"
                    stroke="#0D9488"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx="71"
                    cy="78"
                    r="8.5"
                    fill="#2DD4BF"
                    stroke="#0F766E"
                    strokeWidth="0.8"
                  />
                  <text
                    x="71"
                    y="81.5"
                    textAnchor="middle"
                    fill="#0F766E"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    ₹
                  </text>
                </g>

                <g transform="rotate(16 98 72)">
                  <rect
                    x="62"
                    y="52"
                    width="66"
                    height="36"
                    rx="4"
                    fill="#2DD4BF"
                    stroke="#0F766E"
                    strokeWidth="1"
                  />
                  <circle cx="95" cy="70" r="7" fill="#5EEAD4" />
                  <text
                    x="95"
                    y="73"
                    textAnchor="middle"
                    fill="#0F766E"
                    fontSize="7.5"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    $
                  </text>
                </g>

                <g transform="translate(18, 70)">
                  <circle cx="28" cy="40" r="10" fill="#F59E0B" />
                  <circle
                    cx="28"
                    cy="40"
                    r="7.5"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="0.8"
                  />
                  <circle cx="28" cy="40" r="4" fill="#FCD34D" />

                  <circle cx="44" cy="49" r="8" fill="#F59E0B" />
                  <circle
                    cx="44"
                    cy="49"
                    r="6"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="0.8"
                  />
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* Total balance section (85,069 INR) */}
        <section className="mb-8">
          <div className="text-sm text-neutral-500 font-medium mb-1">
            Total balance
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tracking-tight">
              {formattedInrBalance} INR
            </span>
            <button
              onClick={() =>
                handleOpenGenericDemo(
                  'Total Balance breakdown: ₹85,069.00 INR across active multi-currency accounts.'
                )
              }
              aria-label="Balance info"
              className="text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Get paid button */}
          <button
            onClick={() => setIsGetPaidOpen(true)}
            className="px-4 py-2 bg-[#9FE870] hover:bg-[#8FE058] active:scale-[0.98] text-[#0E1500] font-bold text-sm rounded-full inline-flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <span>Get paid</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </section>

        {/* Two Accounts Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {/* Left Card: Main Account (₹85,069 and $895.5) */}
          <div className="bg-[#F2F4F7] rounded-3xl p-5 sm:p-6 flex flex-col justify-between min-h-[210px] border border-neutral-200/40">
            <div>
              {/* Row 1: Main account INR (₹85,069) */}
              <div
                onClick={() => setIsGetPaidOpen(true)}
                className="flex items-center justify-between cursor-pointer py-1 group"
              >
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-neutral-900 leading-snug">
                    Main account
                  </h4>
                  <div className="text-sm font-semibold text-neutral-600 font-mono mt-0.5">
                    ₹{formattedInrBalance}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
              </div>

              {/* Row 2: US Sub-account ($895.5) */}
              <div
                onClick={() => setIsGetPaidOpen(true)}
                className="flex items-center justify-between cursor-pointer py-3 border-t border-neutral-200/60 mt-3 group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg leading-none select-none">🇺🇸</span>
                  <span className="text-sm font-semibold text-neutral-800 font-mono">
                    ${formattedUsdBalance}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
              </div>

              {/* Additional balances if opened */}
              {additionalBalances.map((b) => (
                <div
                  key={b.code}
                  onClick={() => setIsGetPaidOpen(true)}
                  className="flex items-center justify-between cursor-pointer py-2 border-t border-neutral-200/60 group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none select-none">
                      {b.flag}
                    </span>
                    <span className="text-sm font-semibold text-neutral-800 font-mono">
                      {b.symbol}
                      {b.amount.toFixed(2)} {b.code}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
                </div>
              ))}
            </div>

            {/* Account Details Pill Button */}
            <div className="pt-3">
              <button
                onClick={() => setIsAccountDetailsOpen(true)}
                className="px-3.5 py-1.5 bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 font-bold text-xs rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Account details</span>
              </button>
            </div>
          </div>

          {/* Right Card: Do more with your money */}
          <div className="bg-[#F2F4F7] rounded-3xl overflow-hidden flex flex-col justify-between min-h-[210px] text-center border border-neutral-200/40 relative">
            <div className="h-14 bg-[#E5E7EB]/60 w-full relative flex items-end justify-center">
              <div className="w-14 h-4 bg-[#F2F4F7] rounded-t-full -mb-[1px]" />
            </div>

            <div className="px-6 py-2">
              <h4 className="font-extrabold text-base sm:text-lg text-neutral-900 mb-1">
                Do more with your money
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs mx-auto">
                Manage it, share it with others, and earn a return.
              </p>
            </div>

            <div className="flex justify-center pb-5">
              <button
                onClick={() => setIsOpenBalanceOpen(true)}
                aria-label="Add balance or feature"
                className="w-13 h-13 rounded-full bg-[#9FE870] hover:bg-[#8FE058] active:scale-95 text-[#0E1500] flex items-center justify-center shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </section>

        {/* Section: Transactions (38 Foreign Ad Network transactions from Sep 8 to Oct 24) */}
        <section className="pb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                Transactions
              </h3>
              <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                {transactions.length}
              </span>
            </div>
            <button
              onClick={() => setIsTransactionsOpen(true)}
              className="text-xs sm:text-sm font-bold text-neutral-900 underline hover:text-neutral-700 transition-colors cursor-pointer"
            >
              See all ({transactions.length})
            </button>
          </div>

          {/* Transactions List */}
          <div className="space-y-2">
            {displayedTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => handleOpenGenericDemo(`Transaction: ${tx.title}`)}
                className="flex items-center justify-between p-3.5 bg-[#F2F4F7]/60 hover:bg-[#F2F4F7] rounded-2xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      tx.isPositive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {tx.isPositive ? (
                      <ArrowDownLeft className="w-4 h-4 stroke-[2.2]" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900 text-xs sm:text-sm group-hover:text-black">
                      {tx.title}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {tx.category} · {tx.date}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-mono font-bold text-xs sm:text-sm ${
                      tx.isPositive ? 'text-emerald-700' : 'text-neutral-900'
                    }`}
                  >
                    {tx.amount}
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inline expand/collapse or open modal button */}
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowAllInline(!showAllInline)}
              className="text-xs font-bold text-neutral-700 hover:text-neutral-950 py-2 px-4 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              {showAllInline
                ? 'Show less'
                : `Show all ${transactions.length} transactions inline`}
            </button>
            <span className="text-neutral-300">·</span>
            <button
              onClick={() => setIsTransactionsOpen(true)}
              className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
            >
              Open filter modal
            </button>
          </div>
        </section>
      </div>

      {/* Floating Currency Converter & Transfer Trigger */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setIsConverterOpen(true)}
          className="bg-[#0E1500] hover:bg-[#163300] text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-[#9FE870] text-[#0E1500] flex items-center justify-center">
            <ArrowLeftRight className="w-3 h-3 stroke-[2.5]" />
          </div>
          <span>Send & Convert</span>
        </button>
      </div>

      {/* Slide-out Sidebar Drawer */}
      <SidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenConverter={() => setIsConverterOpen(true)}
        onOpenAccountDetails={() => setIsAccountDetailsOpen(true)}
        onOpenDemo={handleOpenGenericDemo}
      />

      {/* Earn ₹9,000 Referral Modal */}
      <ReferralModal
        isOpen={isReferralOpen}
        onClose={() => setIsReferralOpen(false)}
      />

      {/* Open Currency Balance Modal */}
      <OpenBalanceModal
        isOpen={isOpenBalanceOpen}
        onClose={() => setIsOpenBalanceOpen(false)}
        onOpenBalance={handleOpenNewBalance}
      />

      {/* Get Paid / Inward Remittance Modal */}
      <GetPaidModal
        isOpen={isGetPaidOpen}
        onClose={() => setIsGetPaidOpen(false)}
        onSimulateReceive={handleSimulateReceive}
        onViewAccountDetails={() => setIsAccountDetailsOpen(true)}
      />

      {/* Account Details Modal */}
      <AccountDetailsModal
        isOpen={isAccountDetailsOpen}
        onClose={() => setIsAccountDetailsOpen(false)}
      />

      {/* All Transactions Modal */}
      <TransactionsModal
        isOpen={isTransactionsOpen}
        onClose={() => setIsTransactionsOpen(false)}
        transactions={transactions}
      />

      {/* Full Currency Converter Modal */}
      <CurrencyConverterModal
        isOpen={isConverterOpen}
        onClose={() => setIsConverterOpen(false)}
      />

      {/* Generic Practice Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title={demoActionTitle}
        mode="action"
      />
    </div>
  );
};
