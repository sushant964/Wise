export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string; // Country flag emoji or symbol
  country: string;
  rateToUSD: number; // Baseline conversion rate against 1 USD
  popular?: boolean;
  minAmount: number;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    country: 'United States',
    rateToUSD: 1.0,
    popular: true,
    minAmount: 1,
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    country: 'Eurozone',
    rateToUSD: 0.92,
    popular: true,
    minAmount: 1,
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    country: 'United Kingdom',
    rateToUSD: 0.785,
    popular: true,
    minAmount: 1,
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    flag: '🇮🇳',
    country: 'India',
    rateToUSD: 83.45,
    popular: true,
    minAmount: 50,
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: '🇦🇺',
    country: 'Australia',
    rateToUSD: 1.54,
    popular: true,
    minAmount: 2,
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: '🇨🇦',
    country: 'Canada',
    rateToUSD: 1.365,
    popular: true,
    minAmount: 2,
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    flag: '🇯🇵',
    country: 'Japan',
    rateToUSD: 154.2,
    popular: true,
    minAmount: 100,
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    flag: '🇸🇬',
    country: 'Singapore',
    rateToUSD: 1.35,
    popular: true,
    minAmount: 2,
  },
  {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'د.إ',
    flag: '🇦🇪',
    country: 'United Arab Emirates',
    rateToUSD: 3.6725,
    popular: true,
    minAmount: 5,
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    flag: '🇨🇭',
    country: 'Switzerland',
    rateToUSD: 0.895,
    popular: false,
    minAmount: 1,
  },
  {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
    flag: '🇳🇿',
    country: 'New Zealand',
    rateToUSD: 1.66,
    popular: false,
    minAmount: 2,
  },
  {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    flag: '🇧🇷',
    country: 'Brazil',
    rateToUSD: 5.48,
    popular: false,
    minAmount: 5,
  },
];

export const getCurrencyByCode = (code: string): Currency => {
  return (
    SUPPORTED_CURRENCIES.find((c) => c.code === code) ||
    SUPPORTED_CURRENCIES[0]
  );
};
