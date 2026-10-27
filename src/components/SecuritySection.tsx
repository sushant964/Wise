import React from 'react';
import { ShieldCheck, Lock, KeyRound, AlertCircle, FileCheck2 } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityPillars = [
    {
      icon: Lock,
      title: 'Simulated 256-bit Encryption',
      desc: 'All communications, requests, and data models simulate TLS 1.3 and military-grade AES-256 data standards.',
    },
    {
      icon: KeyRound,
      title: 'Two-Factor Authentication (2FA)',
      desc: 'Simulated multi-factor authentication, passkey readiness, and biometric mobile device confirmation.',
    },
    {
      icon: ShieldCheck,
      title: 'Proactive Fraud Detection',
      desc: 'Automated 24/7 transaction behavioral anomaly detection simulation to safeguard account integrity.',
    },
    {
      icon: FileCheck2,
      title: 'Safeguarded Architecture Demo',
      desc: 'Visual illustration of how segregated tier-one banking partner reserves operate in global fintech.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0E1500] text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#9FE870]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#163300] border border-[#9FE870]/30 rounded-full text-xs font-bold text-[#9FE870] mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Fintech Security Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Built with uncompromising security and total clarity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
            International money movement demands rigorous security paradigms. Our UI reflects the strictest institutional safety standards while maintaining rapid, effortless user experiences.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-[#162305]/80 border border-[#9FE870]/20 rounded-3xl p-6 hover:border-[#9FE870]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#9FE870]/15 text-[#9FE870] flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Practice Safety Disclaimer Box */}
        <div className="p-6 rounded-3xl bg-[#141C0C] border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center gap-4 text-amber-200 text-xs">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5 md:mt-0" />
          <div className="leading-relaxed">
            <strong className="text-white block sm:inline mr-1">
              Important Educational Project Disclaimer:
            </strong>
            This is an original frontend engineering practice demo
            inspired by modern fintech interfaces such as Wise. It does not hold
            a banking license, does not initiate payment orders, and does not
            collect sensitive identity or payment card details.
          </div>
        </div>
      </div>
    </section>
  );
};
