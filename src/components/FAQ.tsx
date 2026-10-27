import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'What is this Wise web project?',
      answer:
        'This is a frontend engineering portfolio and practice application inspired by the modern, minimalist fintech design system of Wise (wise.com). It demonstrates clean typography, responsive component architecture, interactive state management, and real-time client-side currency calculations with zero backend dependencies.',
    },
    {
      question: 'How are the exchange rates and transfer fees calculated?',
      answer:
        'All rates in the interactive calculator are derived from an illustrative local mid-market benchmark table. The transfer fee is calculated transparently (approx. 0.32% variable + localized base fee) depending on the selected simulated funding method (ACH, Wire, or Card). In line with transparent fintech principles, no hidden markup is applied to the exchange rate.',
    },
    {
      question: 'Can I send real money or link my real bank account?',
      answer:
        'No. This is strictly a frontend design practice project. No real banking connections, payment APIs, or financial institutions are connected. Clicking "Send demo" opens an informational confirmation dialog explaining the simulated transfer parameters without charging any card or account.',
    },
    {
      question: 'Which currencies are supported in the interactive converter?',
      answer:
        'The practice converter supports USD, EUR, GBP, INR, AUD, CAD, JPY, SGD, AED, CHF, NZD, and BRL. You can search by currency code, country name, or symbol, and freely reverse source and destination currencies using the animated swap button.',
    },
    {
      question: 'Why do traditional banks cost significantly more for foreign exchange?',
      answer:
        'Traditional banks frequently advertise "0% commission" while concealing a 3% to 6% markup inside an inflated exchange rate, plus charging $15 to $40 for domestic and intermediary correspondent wire legs. Transparent multi-currency platforms show the real mid-market rate and charge one honest, itemized fee.',
    },
    {
      question: 'How does the simulated account view work?',
      answer:
        'The account preview replicates the card layout and balance overview from modern multi-currency mobile banking apps. You can click "Simulate receive" to deposit mock INR/USD funds, click "Simulate card coffee" to spend, and click "Account details" to inspect simulated ACH routing and account numbers.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-neutral-200 rounded-full text-xs font-bold text-neutral-800 shadow-2xs mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#163300]" />
            <span>Got questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Everything you need to know about this fintech demonstration and modern currency mechanics.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/80 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#9FE870] text-[#0E1500]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
