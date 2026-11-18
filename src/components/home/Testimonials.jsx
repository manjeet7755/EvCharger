import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Alok Verma",
      role: "EV Driver • Hyundai Ioniq 5",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      content: "EVCharge eliminated my range anxiety entirely. Reserving slots before road trips means no waiting behind taxis or ride shares. The wallet auto-pay is smoother than fastag!",
      rating: 5,
      city: "Mumbai"
    },
    {
      name: "Meera Krishnan",
      role: "Residential Host • 22kW Wallbox",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      content: "I installed an EV charger at my villa in Indiranagar. Listing it on EVCharge has paid off my installation costs within 4 months! The verified guest system gives complete peace of mind.",
      rating: 5,
      city: "Bengaluru"
    },
    {
      name: "Siddharth Jain",
      role: "Commercial Fleet Manager",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      content: "We manage 18 electric delivery vans in Delhi NCR. The server-side conflict booking guarantees our drivers never encounter occupied bays. High-power DC speeds are spot-on.",
      rating: 5,
      city: "Delhi NCR"
    }
  ];

  return (
    <section className="py-20 bg-[#04100D]/70 border-t border-[#214438] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#20D995] bg-[#0D2921] border border-[#214438] px-3.5 py-1.5 rounded-full">
            Driver & Host Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7F6]">
            Trusted by Over 50,000+ EV Pioneers
          </h2>
          <p className="text-base text-[#A5B8AF]">
            Read how everyday drivers and charger hosts are accelerating green mobility.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="rounded-3xl bg-[#0D2921] border border-[#214438] p-8 hover:border-[#20D995]/50 transition-all flex flex-col justify-between group shadow-card-glow"
            >
              <div className="space-y-4">
                {/* Rating stars & quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#20D995]/30 group-hover:text-[#20D995] transition-colors" />
                </div>

                <p className="text-sm text-[#F5F7F6] leading-relaxed italic">
                  "{rev.content}"
                </p>
              </div>

              {/* User Bio */}
              <div className="pt-6 mt-6 border-t border-[#214438] flex items-center space-x-3.5">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#20D995]/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#F5F7F6] group-hover:text-[#20D995] transition-colors">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-[#A5B8AF]">{rev.role}</p>
                  <p className="text-[10px] text-[#20D995]">{rev.city}, India</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

