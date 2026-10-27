import { Currency, getCurrencyByCode } from './currencies';

export interface PaymentMethodOption {
  id: string;
  name: string;
  description: string;
  variableFeePercent: number;
  fixedFeeUSD: number;
  speedText: string;
}

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'bank-debit',
    name: 'Connected Bank Debit (ACH / Faster Payments)',
    description: 'Lowest cost • Fast processing',
    variableFeePercent: 0.0032,
    fixedFeeUSD: 0.45,
    speedText: 'Should arrive in minutes',
  },
  {
    id: 'wire-transfer',
    name: 'Manual Wire / Bank Transfer',
    description: 'Good for larger amounts',
    variableFeePercent: 0.0028,
    fixedFeeUSD: 1.2,
    speedText: 'Should arrive by tomorrow',
  },
  {
    id: 'debit-card',
    name: 'Debit Card',
    description: 'Instant verification',
    variableFeePercent: 0.0075,
    fixedFeeUSD: 0.5,
    speedText: 'Arrives in seconds',
  },
  {
    id: 'credit-card',
    name: 'Credit Card',
    description: 'Instant processing',
    variableFeePercent: 0.016,
    fixedFeeUSD: 0.8,
    speedText: 'Arrives in seconds',
  },
];

export interface ConversionCalculation {
  sourceCurrency: Currency;
  destinationCurrency: Currency;
  sendAmount: number;
  paymentMethod: PaymentMethodOption;
  variableFee: number;
  fixedFee: number;
  totalFee: number;
  amountToConvert: number;
  exchangeRate: number;
  recipientGets: number;
  estimatedTraditionalBankFee: number;
  estimatedSavings: number;
  guaranteedTimeRemainingSec: number;
}

export function calculateConversion(
  amount: number,
  srcCode: string,
  destCode: string,
  methodId: string = 'bank-debit'
): ConversionCalculation {
  const source = getCurrencyByCode(srcCode);
  const destination = getCurrencyByCode(destCode);
  const method =
    PAYMENT_METHODS.find((m) => m.id === methodId) || PAYMENT_METHODS[0];

  const validAmount = isNaN(amount) || amount < 0 ? 0 : amount;

  const exchangeRate = destination.rateToUSD / source.rateToUSD;

  const fixedFeeInSource = method.fixedFeeUSD * source.rateToUSD;
  const variableFee = validAmount * method.variableFeePercent;
  const rawTotalFee = fixedFeeInSource + variableFee;

  const totalFee =
    validAmount > 0 ? Math.min(rawTotalFee, validAmount * 0.4) : 0;
  const amountToConvert = Math.max(0, validAmount - totalFee);

  const recipientGets = amountToConvert * exchangeRate;

  const traditionalMarkupPercent = 0.032;
  const traditionalFlatFee = 12 * source.rateToUSD;
  const estimatedTraditionalBankFee =
    validAmount > 0
      ? validAmount * traditionalMarkupPercent + traditionalFlatFee
      : 0;

  const estimatedSavings = Math.max(
    0,
    estimatedTraditionalBankFee - totalFee
  );

  return {
    sourceCurrency: source,
    destinationCurrency: destination,
    sendAmount: validAmount,
    paymentMethod: method,
    variableFee,
    fixedFee: fixedFeeInSource,
    totalFee,
    amountToConvert,
    exchangeRate,
    recipientGets,
    estimatedTraditionalBankFee,
    estimatedSavings,
    guaranteedTimeRemainingSec: 1800,
  };
}

export function formatCurrencyAmount(
  amount: number,
  currencyCode: string
): string {
  if (isNaN(amount)) return '0.00';
  const decimals = currencyCode === 'JPY' ? 0 : 2;

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}
