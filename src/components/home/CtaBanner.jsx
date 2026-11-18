import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0D2921] via-[#13382D] to-[#0D2921] border border-[#214438] p-10 sm:p-14 lg:p-16 text-center space-y-6 shadow-card-glow overflow-hidden">
          
          {/* Ambient light ring */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#20D995]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#061A15]/80 border border-[#214438] text-xs font-bold text-[#20D995]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join India's Fastest Growing EV Network</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#F5F7F6] tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Electrify Your Journey?
          </h2>

          <p className="text-base sm:text-lg text-[#A5B8AF] max-w-xl mx-auto font-normal">
            Discover thousands of verified charging points, plan your routes with zero range anxiety, or turn your personal charger into passive income.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/chargers"
              className="px-8 py-4 rounded-xl font-bold text-sm sm:text-base bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>Find Chargers Near Me</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/host"
              className="px-8 py-4 rounded-xl font-bold text-sm sm:text-base bg-[#061A15] text-[#F5F7F6] border border-[#214438] hover:border-[#20D995] hover:bg-[#0D2921] transition-all flex items-center space-x-2"
            >
              <Zap className="w-5 h-5 text-[#20D995]" />
              <span>List Your Station</span>
            </Link>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#A5B8AF]">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#20D995]" />
              <span>Instant Confirmation</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#20D995]" />
              <span>Free Cancellation within 10 min</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#20D995]" />
              <span>No Hidden Fees</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

