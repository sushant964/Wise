import React from 'react';
import { Star, Quote, ArrowUpRight } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const testimonials = [
    {
      id: 'maya',
      quote:
        'Getting paid in USD by US clients and converting straight to SGD without hidden bank spreads saved me over $2,400 last year alone. The transfer clears in minutes, not days.',
      author: 'Maya S.',
      role: 'Staff Systems Engineer',
      location: 'Singapore 🇸🇬',
      highlight: 'Saved $2,400/yr in exchange fees',
      avatarColor: 'bg-emerald-100 text-emerald-800',
      initials: 'MS',
    },
    {
      id: 'liam-sofia',
      quote:
        'We live across Europe and the UK. With one multi-currency balance, paying dinner bills in EUR or train tickets in GBP happens automatically at the mid-market rate. Zero foreign markup anxiety.',
      author: 'Liam & Sofia K.',
      role: 'Digital Creators & Nomads',
      location: 'Lisbon & London 🇵🇹 🇬🇧',
      highlight: 'Zero foreign card fees in 30+ countries',
      avatarColor: 'bg-blue-100 text-blue-800',
      initials: 'LK',
    },
    {
      id: 'carlos',
      quote:
        'Our hardware business imports components from Japan and Taiwan while selling in North America. Batch payouts in JPY and CAD with one CSV click cut our weekly supplier accounting from hours to minutes.',
      author: 'Carlos M.',
      role: 'Founder, Apex Goods Co.',
      location: 'Toronto, Canada 🇨🇦',
      highlight: 'Weekly batch payouts in 4 currencies',
      avatarColor: 'bg-purple-100 text-purple-800',
      initials: 'CM',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
              Demonstration Feedback & User Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
              Loved by individuals and global teams everywhere
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-100/80 px-4 py-2 rounded-2xl shrink-0 font-medium">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-neutral-900">4.9 / 5</span>
            <span className="text-neutral-400">·</span>
            <span>Simulated review benchmark</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#F8F9FA] rounded-3xl p-8 border border-neutral-200/90 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="text-xs font-bold text-[#163300] bg-[#9FE870]/30 px-3 py-1 rounded-full inline-block mb-4">
                  {t.highlight}
                </div>

                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-200/60 flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${t.avatarColor}`}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-sm text-neutral-900">
                    {t.author}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
