import React from 'react';
import {
  X,
  Home,
  CreditCard,
  Users,
  ArrowLeftRight,
  Settings,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Building,
} from 'lucide-react';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConverter: () => void;
  onOpenAccountDetails: () => void;
  onOpenDemo: (action: string) => void;
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  onOpenConverter,
  onOpenAccountDetails,
  onOpenDemo,
}) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      label: 'Home',
      icon: Home,
      active: true,
      onClick: () => onClose(),
    },
    {
      label: 'Send & Convert Money',
      icon: ArrowLeftRight,
      badge: 'Live',
      onClick: () => {
        onClose();
        onOpenConverter();
      },
    },
    {
      label: 'Cards',
      icon: CreditCard,
      onClick: () => {
        onClose();
        onOpenDemo('Wise Digital & Physical Debit Card');
      },
    },
    {
      label: 'Recipients',
      icon: Users,
      onClick: () => {
        onClose();
        onOpenDemo('Manage Global Recipients');
      },
    },
    {
      label: 'Account Details (USD / INR)',
      icon: Building,
      onClick: () => {
        onClose();
        onOpenAccountDetails();
      },
    },
    {
      label: 'Open a New Balance',
      icon: PlusCircle,
      onClick: () => {
        onClose();
        onOpenDemo('Open a Currency Balance');
      },
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between p-6 animate-in slide-in-from-left duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Top Bar inside Sidebar */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black lowercase tracking-tight text-neutral-900 font-sans">
                wise
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Snippet */}
          <div className="flex items-center gap-3 py-4 my-2 px-3 bg-neutral-50 rounded-2xl border border-neutral-100">
            <div className="w-10 h-10 rounded-full bg-neutral-200 text-neutral-800 font-bold text-sm flex items-center justify-center shrink-0">
              DA
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-sm text-neutral-900 truncate">
                Deeshan A
              </div>
              <div className="text-xs text-neutral-500 font-mono">
                Wise Account #98402187
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-1 mt-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-colors cursor-pointer ${
                    item.active
                      ? 'bg-[#9FE870]/25 text-[#163300]'
                      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold bg-[#9FE870] text-[#0E1500] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="pt-4 border-t border-neutral-100 space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenDemo('Settings & Security');
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDemo('Help Center & FAQs');
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          <div className="flex items-center gap-2 text-[11px] text-neutral-400 px-2 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Wise Homepage UI Practice Demo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
