import React, { useState } from 'react';
import { Menu, X, Globe2 } from 'lucide-react';
import { DemoModal } from './DemoModal';

interface NavbarProps {
  currentTab: 'personal' | 'business';
  onTabChange: (tab: 'personal' | 'business') => void;
  onOpenDemo: (mode?: 'login' | 'signup' | 'action') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'signup' | 'action'>('login');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (mode: 'login' | 'signup' | 'action') => {
    setModalMode(mode);
    setIsModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Converter', href: '#converter' },
    { label: 'Account Demo', href: '#account-preview' },
    { label: 'Features', href: '#features' },
    { label: 'Compare', href: '#comparison' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Disclaimer Hairline Banner */}
      <div className="bg-[#163300] text-[#9FE870] text-xs font-medium py-1.5 px-4 text-center border-b border-[#244f05] flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#9FE870] shrink-0" />
        <span>
          <strong>Wise</strong> — Frontend practice project. No real banking, payments, or identity collection.
        </span>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
            {/* Zone 1: Brand Wordmark (Wise) */}
            <div className="flex items-center gap-6 shrink-0">
              <a
                href="#"
                className="flex items-center gap-2.5 text-neutral-900 group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#163300] text-[#9FE870] flex items-center justify-center transition-transform group-hover:scale-105">
                  <Globe2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-2xl font-black tracking-tight text-neutral-900 lowercase font-sans select-none">
                  wise
                </span>
              </a>

              {/* Personal / Business Toggle */}
              <div className="hidden lg:flex items-center p-1 bg-neutral-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => onTabChange('personal')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    currentTab === 'personal'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Personal
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange('business')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    currentTab === 'business'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Business
                </button>
              </div>
            </div>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-neutral-600">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-2 decoration-[#9FE870]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions (Get Started button removed per user request) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => handleAction('login')}
                className="text-sm font-bold text-neutral-800 hover:text-neutral-950 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Log in
              </button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="md:hidden p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
            {/* Personal / Business Mobile Segmented control */}
            <div className="flex p-1 bg-neutral-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  onTabChange('personal');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${
                  currentTab === 'personal'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500'
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => {
                  onTabChange('business');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-center rounded-lg transition-all ${
                  currentTab === 'business'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500'
                }`}
              >
                Business
              </button>
            </div>

            <div className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-neutral-800 hover:text-neutral-950 hover:bg-neutral-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => handleAction('login')}
                className="w-full py-2.5 px-4 text-center text-sm font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
              >
                Log in to demo
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Demo Modal for Nav Actions */}
      <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalMode === 'login'
            ? 'Wise Log In Demo'
            : 'Wise Demo Action'
        }
        mode={modalMode}
      />
    </>
  );
};
