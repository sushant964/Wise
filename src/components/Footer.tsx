import React, { useState } from 'react';
import { Globe2, ShieldCheck } from 'lucide-react';
import { DemoModal } from './DemoModal';

export const Footer: React.FC = () => {
  const [modalTitle, setModalTitle] = useState('Wise Feature Link');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, title: string) => {
    e.preventDefault();
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const footerColumns = [
    {
      title: 'Personal',
      links: [
        'International money transfer',
        'Multi-currency debit card',
        'Receive foreign salary',
        'Large amount transfers',
        'Exchange rate alerts',
      ],
    },
    {
      title: 'Business',
      links: [
        'Business global account',
        'Corporate employee cards',
        'Batch CSV payouts',
        'Invoicing & billing',
        'Automated REST API',
      ],
    },
    {
      title: 'Currency Pairs',
      links: [
        'USD to INR converter',
        'EUR to USD converter',
        'GBP to EUR converter',
        'USD to CAD converter',
        'AUD to USD converter',
      ],
    },
    {
      title: 'Company',
      links: [
        'About Wise',
        'Frontend architecture',
        'Transparent fee manifesto',
        'Privacy & demo safety',
        'Mission & Roadmap',
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-12 text-neutral-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-neutral-200">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-[#163300] text-[#9FE870] flex items-center justify-center transition-transform group-hover:scale-105">
                <Globe2 className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-2xl font-black tracking-tight text-neutral-900 lowercase font-sans select-none">
                wise
              </span>
            </a>

            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              A high-craft fintech landing page and interactive currency converter reproducing modern global money management interfaces.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-lg text-[11px] font-semibold text-neutral-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulated Frontend Demo</span>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-xs font-medium">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      onClick={(e) => handleLinkClick(e, link)}
                      className="hover:text-neutral-900 hover:underline transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal & Educational Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="text-center md:text-left leading-relaxed max-w-3xl">
            <strong>Disclaimer:</strong> This project is a frontend UI practice demo inspired by Wise. No real banking services, deposits, transfers, or payment card issuances take place on this platform.
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
            <span>© 2026 Wise</span>
            <span className="text-neutral-300">·</span>
            <a
              href="#converter"
              className="hover:text-neutral-900 transition-colors"
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </div>

      <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        mode="action"
      />
    </footer>
  );
};
