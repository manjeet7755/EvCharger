import React from 'react';
import { Search, CalendarCheck, BatteryCharging, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Locate Nearest Station",
      desc: "Use our interactive GPS map to filter by connector compatibility (CCS2, Type 2, CHAdeMO) and real-time charging power.",
      icon: Search
    },
    {
      step: "02",
      title: "Reserve Guaranteed Slot",
      desc: "Select your arrival time and duration. Our real-time backend prevents double-booking so your plug is ready when you arrive.",
      icon: CalendarCheck
    },
    {
      step: "03",
      title: "Plug, Charge & Monitor",
      desc: "Authenticate via QR pass, monitor live charging telemetry on your phone, and settle automatically via your EVCharge wallet.",
      icon: BatteryCharging
    },
    {
      step: "04",
      title: "Share Your Charger & Earn",
      desc: "Have a home or commercial charger? List it on EVCharge, set your own hourly rate, and earn steady income while it sits idle.",
      icon: DollarSign
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#20D995] bg-[#0D2921] border border-[#214438] px-3.5 py-1.5 rounded-full">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7F6]">
            How EVCharge Works
          </h2>
          <p className="text-base sm:text-lg text-[#A5B8AF]">
            From discovering high-speed expressway chargers to listing your private home garage plug, EVCharge provides the smoothest end-to-end experience.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-[#0D2921]/60 border border-[#214438] p-7 hover:border-[#20D995]/60 hover:bg-[#13382D]/70 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#20D995]/15 border border-[#20D995]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-[#20D995]" />
                    </div>
                    <span className="text-3xl font-black text-[#214438] group-hover:text-[#20D995]/40 transition-colors font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F5F7F6] mb-3 group-hover:text-[#20D995] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#A5B8AF] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#214438]/60 flex items-center text-xs font-semibold text-[#20D995]">
                  <span>Step {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Link */}
        <div className="text-center mt-12">
          <Link
            to="/chargers"
            className="inline-flex items-center space-x-2 text-sm font-bold text-[#20D995] hover:underline underline-offset-4"
          >
            <span>Try searching available chargers in your city now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

