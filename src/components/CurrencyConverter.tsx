import React, { useState, useId } from 'react';
import {
  ArrowUpDown,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Currency, getCurrencyByCode } from '../data/currencies';
import {
  calculateConversion,
  PAYMENT_METHODS,
  formatCurrencyAmount,
} from '../data/mockRates';
import { CurrencyPickerModal } from './CurrencyPickerModal';
import { DemoModal } from './DemoModal';

interface CurrencyConverterProps {
  initialSource?: string;
  initialDest?: string;
  initialAmount?: number;
  className?: string;
}

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  initialSource = 'USD',
  initialDest = 'INR',
  initialAmount = 1000,
  className = '',
}) => {
  const [sourceCode, setSourceCode] = useState(initialSource);
  const [destCode, setDestCode] = useState(initialDest);
  const [amountStr, setAmountStr] = useState(initialAmount.toString());
  const [selectedMethodId, setSelectedMethodId] = useState('bank-debit');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'source' | 'dest'>('source');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [showFeeDropdown, setShowFeeDropdown] = useState(false);
  const methodSelectId = useId();

  const numAmount = parseFloat(amountStr) || 0;
  const isInvalidAmount = isNaN(numAmount) || numAmount <= 0;

  const calculation = calculateConversion(
    numAmount,
    sourceCode,
    destCode,
    selectedMethodId
  );

  const sourceCurrency = calculation.sourceCurrency;
  const destCurrency = calculation.destinationCurrency;

  const handleSwap = () => {
    setSourceCode(destCode);
    setDestCode(sourceCode);
  };

  const handleOpenPicker = (target: 'source' | 'dest') => {
    setPickerTarget(target);
    setIsPickerOpen(true);
  };

  const handleCurrencySelect = (currency: Currency) => {
    if (pickerTarget === 'source') {
      if (currency.code === destCode) {
        setDestCode(sourceCode);
      }
      setSourceCode(currency.code);
    } else {
      if (currency.code === sourceCode) {
        setSourceCode(destCode);
      }
      setDestCode(currency.code);
    }
  };

  const handlePresetAmount = (preset: number) => {
    setAmountStr(preset.toString());
  };

  return (
    <div
      className={`bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-neutral-200/90 w-full max-w-lg transition-all ${className}`}
    >
      {/* Top Tab Bar (Send vs Receive/Multi-currency) */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
        <div className="flex items-center p-1 bg-neutral-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('send')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'send'
                ? 'bg-white text-neutral-900 shadow-xs font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Send money
          </button>
          <button
            onClick={() => setActiveTab('receive')}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'receive'
                ? 'bg-white text-neutral-900 shadow-xs font-bold'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Receive & Hold
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Demo rates</span>
        </div>
      </div>

      {/* 1. Source Amount Card */}
      <div className="relative rounded-2xl border border-neutral-200 focus-within:border-neutral-900 focus-within:ring-2 focus-within:ring-neutral-900/10 transition-all bg-[#F8F9FA] p-3.5">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
          <label htmlFor="source-amount-input" className="font-semibold text-neutral-600">
            {activeTab === 'send' ? 'You send exactly' : 'You deposit'}
          </label>
          <span className="text-[11px] text-neutral-400">
            Min {sourceCurrency.symbol}
            {sourceCurrency.minAmount}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <input
            id="source-amount-input"
            type="number"
            min="0"
            step="any"
            value={amountStr}
            onChange={(e) => setAmountStr(e.target.value)}
            placeholder="0.00"
            className="w-full text-2xl sm:text-3xl font-extrabold text-neutral-900 bg-transparent outline-none tracking-tight font-mono"
          />

          <button
            type="button"
            onClick={() => handleOpenPicker('source')}
            className="flex items-center gap-2 bg-white hover:bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-200 shadow-xs font-bold text-sm text-neutral-900 shrink-0 transition-colors cursor-pointer"
          >
            <span className="text-xl leading-none">{sourceCurrency.flag}</span>
            <span>{sourceCurrency.code}</span>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Preset Amount Chips */}
      <div className="flex items-center gap-2 mt-2.5 mb-3 px-1 overflow-x-auto text-xs">
        <span className="text-neutral-400 text-[11px] font-medium shrink-0">
          Quick:
        </span>
        {[250, 500, 1000, 5000].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePresetAmount(preset)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
              numAmount === preset
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
            }`}
          >
            {sourceCurrency.symbol}
            {preset.toLocaleString()}
          </button>
        ))}
      </div>

      {/* 2. Transparent Fee & Rate Breakdown with thread indicator */}
      <div className="relative pl-6 py-2 my-1 space-y-3.5 text-xs text-neutral-600">
        {/* Connected vertical line */}
        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-neutral-200" />

        {/* Node 1: Fee */}
        <div className="relative flex items-center justify-between">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-300 ring-4 ring-white" />
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-neutral-900 font-mono">
              {sourceCurrency.symbol}
              {formatCurrencyAmount(calculation.totalFee, sourceCurrency.code)}
            </span>
            <button
              type="button"
              onClick={() => setShowFeeDropdown(!showFeeDropdown)}
              className="text-neutral-600 hover:text-neutral-900 underline decoration-dotted transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Practice transfer fee</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
            Low & transparent
          </span>
        </div>

        {/* Expandable Payment Method Selection */}
        {showFeeDropdown && (
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2 animate-in fade-in duration-150">
            <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
              Pay via:
            </div>
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.id}
                htmlFor={`${methodSelectId}-${method.id}`}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedMethodId === method.id
                    ? 'bg-white border border-neutral-300 shadow-xs'
                    : 'hover:bg-neutral-100/70'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    id={`${methodSelectId}-${method.id}`}
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethodId === method.id}
                    onChange={() => setSelectedMethodId(method.id)}
                    className="accent-neutral-900"
                  />
                  <div>
                    <div className="font-bold text-neutral-800 text-xs">
                      {method.name}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {method.speedText}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}

        {/* Node 2: Amount to Convert */}
        <div className="relative flex items-center justify-between">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-300 ring-4 ring-white" />
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-neutral-900 font-mono">
              {sourceCurrency.symbol}
              {formatCurrencyAmount(
                calculation.amountToConvert,
                sourceCurrency.code
              )}
            </span>
            <span className="text-neutral-500">Amount we&apos;ll convert</span>
          </div>
        </div>

        {/* Node 3: Guaranteed Exchange Rate */}
        <div className="relative flex items-center justify-between">
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#163300] ring-4 ring-white" />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-neutral-900 font-mono">
              1 {sourceCurrency.code} = {calculation.exchangeRate.toFixed(4)}{' '}
              {destCurrency.code}
            </span>
          </div>
          <span className="text-[11px] text-neutral-500 font-medium inline-flex items-center gap-1">
            <Clock className="w-3 h-3 text-neutral-400" />
            Guaranteed rate
          </span>
        </div>

        {/* Swap button placed nicely */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap source and recipient currencies"
            aria-label="Swap currencies"
            className="p-2.5 bg-neutral-100 hover:bg-[#9FE870] hover:text-[#0E1500] text-neutral-700 rounded-full border border-neutral-200 shadow-sm transition-all transform hover:rotate-180 duration-300 cursor-pointer"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Destination Amount Card */}
      <div className="relative rounded-2xl border border-neutral-200 focus-within:border-neutral-900 transition-all bg-[#F8F9FA] p-3.5 mt-2">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
          <span className="font-semibold text-neutral-600">
            {activeTab === 'send' ? 'Recipient gets' : 'You receive'}
          </span>
          <span className="text-[11px] text-emerald-700 font-medium">
            No hidden markup
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <input
            type="text"
            readOnly
            value={formatCurrencyAmount(
              calculation.recipientGets,
              destCurrency.code
            )}
            className="w-full text-2xl sm:text-3xl font-extrabold text-neutral-900 bg-transparent outline-none tracking-tight font-mono select-all"
          />

          <button
            type="button"
            onClick={() => handleOpenPicker('dest')}
            className="flex items-center gap-2 bg-white hover:bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-200 shadow-xs font-bold text-sm text-neutral-900 shrink-0 transition-colors cursor-pointer"
          >
            <span className="text-xl leading-none">{destCurrency.flag}</span>
            <span>{destCurrency.code}</span>
            <ChevronDown className="w-4 h-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Savings & Speed Info Box */}
      <div className="mt-4 p-3 bg-[#9FE870]/15 rounded-2xl border border-[#9FE870]/30 flex items-center justify-between text-xs text-[#163300]">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#163300] shrink-0 fill-[#9FE870]" />
          <span className="font-medium">
            {calculation.paymentMethod.speedText}
          </span>
        </div>
        {calculation.estimatedSavings > 0 && (
          <span className="font-bold text-[11px] bg-white px-2 py-0.5 rounded-md border border-neutral-200/50">
            Save ~{sourceCurrency.symbol}
            {formatCurrencyAmount(
              calculation.estimatedSavings,
              sourceCurrency.code
            )}{' '}
            vs banks
          </span>
        )}
      </div>

      {/* Main Action Button */}
      <button
        type="button"
        disabled={isInvalidAmount}
        onClick={() => setIsDemoModalOpen(true)}
        className="w-full mt-5 py-3.5 px-6 rounded-2xl bg-[#9FE870] hover:bg-[#8FE058] active:scale-[0.99] text-[#0E1500] font-bold text-base transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Send demo</span>
        <Sparkles className="w-4 h-4 text-[#163300]" />
      </button>

      {/* Footer practice label */}
      <div className="flex items-center justify-center gap-1.5 mt-3 text-center text-[11px] text-neutral-400">
        <Info className="w-3.5 h-3.5 shrink-0" />
        <span>
          Practice calculation for frontend demonstration • No money processed
        </span>
      </div>

      {/* Currency Picker Modal */}
      <CurrencyPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleCurrencySelect}
        selectedCode={pickerTarget === 'source' ? sourceCode : destCode}
        title={
          pickerTarget === 'source'
            ? 'Select sending currency'
            : 'Select receiving currency'
        }
      />

      {/* Safe Demo Confirmation Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        calculation={calculation}
        title="Demo Transfer Simulated"
        mode="transfer"
      />
    </div>
  );
};
