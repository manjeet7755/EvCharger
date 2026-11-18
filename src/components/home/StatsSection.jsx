import React from 'react';
import { Zap, MapPin, Star, Headphones } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      label: "Chargers Listed",
      value: "10,000+",
      sub: "Across all major networks & private hosts",
      icon: Zap
    },
    {
      label: "Cities Covered",
      value: "120+",
      sub: "From metropolitan hubs to expressway corridors",
      icon: MapPin
    },
    {
      label: "Average Rating",
      value: "4.8 / 5",
      sub: "Over 85,000+ verified charging reviews",
      icon: Star
    },
    {
      label: "Smart Support",
      value: "24/7",
      sub: "Live roadside & station technical assistance",
      icon: Headphones
    }
  ];

  return (
    <section className="py-12 border-y border-[#214438] bg-[#04100D]/70 backdrop-blur-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0D2921]/60 border border-[#214438] hover:border-[#20D995]/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#20D995]/10 border border-[#20D995]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-[#20D995]" />
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7F6] tracking-tight group-hover:text-[#20D995] transition-colors">
                  {s.value}
                </h3>
                <p className="text-sm font-semibold text-[#F5F7F6] mt-1">{s.label}</p>
                <p className="text-xs text-[#A5B8AF] mt-1 line-clamp-2 leading-relaxed">{s.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

