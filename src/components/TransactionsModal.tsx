import React, { useState } from 'react';
import { X, Clock, ArrowDownLeft, ArrowUpRight, Search } from 'lucide-react';

export interface TransactionItem {
  id: string;
  title: string;
  category: string;
  amount: string;
  currency: string;
  isPositive: boolean;
  date: string;
  status: string;
}

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: TransactionItem[];
}

export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  isOpen,
  onClose,
  transactions,
}) => {
  const [filter, setFilter] = useState<'all' | 'in' | 'out'>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = transactions.filter((tx) => {
    if (filter === 'in' && !tx.isPositive) return false;
    if (filter === 'out' && tx.isPositive) return false;
    if (
      search &&
      !tx.title.toLowerCase().includes(search.toLowerCase()) &&
      !tx.category.toLowerCase().includes(search.toLowerCase()) &&
      !tx.date.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-200 overflow-hidden max-h-[88vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div>
            <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              All Transactions ({transactions.length})
            </h3>
            <p className="text-xs text-neutral-500">
              Foreign ad networks, campaign yields & settlements
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="pt-3">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, foreign ad network, or date..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white border border-transparent focus:border-neutral-300 rounded-xl outline-none font-medium"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between pt-3 pb-2">
          <div className="flex p-1 bg-neutral-100 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500'
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setFilter('in')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'in'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500'
              }`}
            >
              Incoming (
              {transactions.filter((t) => t.isPositive).length})
            </button>
            <button
              onClick={() => setFilter('out')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'out'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500'
              }`}
            >
              Outgoing (
              {transactions.filter((t) => !t.isPositive).length})
            </button>
          </div>

          <span className="text-[11px] text-neutral-400 font-medium">
            Sep 8 – Oct 24
          </span>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 py-2 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-sm flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-neutral-300 stroke-[1.5]" />
              <span>No matching transactions found</span>
            </div>
          ) : (
            filtered.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 bg-neutral-50 hover:bg-neutral-100/70 rounded-2xl transition-colors text-sm"
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
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-neutral-900 text-xs sm:text-sm">
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};
