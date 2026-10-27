import React from 'react';
import {
  CreditCard,
  Send,
  Building,
  Briefcase,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

interface FeaturesGridProps {
  onSelectFeature?: (feature: string) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  onSelectFeature,
}) => {
  const features = [
    {
      id: 'transfers',
      icon: Send,
      title: 'Send money to 160+ countries',
      tagline: 'Always mid-market exchange rates',
      description:
        'Transfer funds directly to foreign bank accounts across 40+ currencies. You always get the real mid-market exchange rate with transparent, upfront fees and no surprise deductions.',
      metric: '8x cheaper',
      metricLabel: 'than leading high street banks',
      buttonText: 'Simulate transfer',
      accentColor: 'border-emerald-200/80',
    },
    {
      id: 'card',
      icon: CreditCard,
      title: 'Spend globally without excessive foreign fees',
      tagline: 'Smart currency auto-conversion',
      description:
        'Spend in over 150 countries with a physical or digital debit card. If you have the local currency in your balance, spend it with zero conversion fees. If not, smart auto-conversion applies the lowest rate.',
      metric: '0.00%',
      metricLabel: 'hidden foreign transaction markup',
      buttonText: 'Explore demo card',
      accentColor: 'border-blue-200/80',
    },
    {
      id: 'accounts',
      icon: Building,
      title: 'Receive money like a local in 9 currencies',
      tagline: 'Domestic account numbers worldwide',
      description:
        'Get simulated local bank account details for USD, EUR, GBP, AUD, CAD, SGD, and more. Anyone can pay you in their domestic currency using local clearing systems with zero incoming wire fees.',
      metric: '9 currencies',
      metricLabel: 'with local routing & IBANs',
      buttonText: 'View local details',
      accentColor: 'border-amber-200/80',
    },
    {
      id: 'business',
      icon: Briefcase,
      title: 'Scale operations with Wise Business',
      tagline: 'Batch payouts and accounting sync',
      description:
        'Pay up to 1,000 global contractors and suppliers in a single CSV batch. Seamlessly integrate with accounting software and grant granular permission access to team members.',
      metric: '1,000 payouts',
      metricLabel: 'in a single batch upload',
      buttonText: 'Business tools demo',
      accentColor: 'border-purple-200/80',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-bold text-neutral-800 mb-3">
            <Layers className="w-3.5 h-3.5 text-[#163300]" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight">
            Everything you need to move money across borders
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Engineered with full transparency. No sneaky markup on the exchange
            rate, no confusing fee schedules, and no complicated paperwork.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="group relative bg-[#F8F9FA] hover:bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-neutral-200/90 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-[#163300] group-hover:scale-105 transition-transform">
                      <IconComponent className="w-7 h-7 stroke-[2]" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-emerald-800 mb-1 tracking-wide">
                    {item.tagline}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Metric Strip & Action */}
                <div className="pt-6 border-t border-neutral-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl font-extrabold text-neutral-900 font-mono tracking-tight">
                      {item.metric}
                    </div>
                    <div className="text-xs text-neutral-500 font-medium">
                      {item.metricLabel}
                    </div>
                  </div>

                  <a
                    href="#converter"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#163300] hover:text-neutral-900 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
