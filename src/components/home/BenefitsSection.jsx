import React, { useState } from 'react';
import { Car, Zap, Check, ShieldCheck, Clock, Award, Wallet, Smartphone, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState('drivers');

  const driverBenefits = [
    {
      title: "Zero Waiting Queues",
      desc: "Pre-book guaranteed charging slots with server-side validation. Your charger is ready the moment you park.",
      icon: Clock
    },
    {
      title: "Universal Connector Discovery",
      desc: "Instant filtering for CCS2, Type 2, CHAdeMO, and Type 1. Compatible with Tesla, Tata, Hyundai, MG, and Ather.",
      icon: Zap
    },
    {
      title: "Cashless Instant Payments",
      desc: "Pay seamlessly with the EVCharge Wallet, UPI, or saved cards. Receive instant digital invoices and tax breakdown.",
      icon: Wallet
    },
    {
      title: "Eco-Points & Free Charge Credits",
      desc: "Earn green loyalty points for every kilowatt-hour charged. Redeem points directly for wallet balance.",
      icon: Award
    }
  ];

  const hostBenefits = [
    {
      title: "Earn Up to ₹35,000 / Month",
      desc: "Monetize your residential wallbox or commercial charging infrastructure while your car is away at work.",
      icon: Wallet
    },
    {
      title: "Complete Control on Schedule & Rates",
      desc: "Set operating hours, peak surcharge pricing, and customer eligibility with just a toggle on your Host Dashboard.",
      icon: Smartphone
    },
    {
      title: "Verified Community Drivers",
      desc: "Every EV driver on our marketplace is KYC and vehicle-verified with ratings and booking security deposits.",
      icon: ShieldCheck
    },
    {
      title: "Automated Host Payouts",
      desc: "Earnings are credited directly to your registered bank account or EVCharge wallet without manual chasing.",
      icon: Users
    }
  ];

  const currentBenefits = activeTab === 'drivers' ? driverBenefits : hostBenefits;

  return (
    <section className="py-20 bg-[#04100D]/50 border-t border-[#214438] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#20D995] bg-[#0D2921] border border-[#214438] px-3 py-1 rounded-full">
            Why Choose EVCharge
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7F6]">
            Engineered for Drivers & Hosts Alike
          </h2>
          <p className="text-[#A5B8AF] text-base">
            Whether you're hitting the open road or looking to generate passive income from your garage, EVCharge has you covered.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-xl bg-[#0D2921] border border-[#214438] mt-4">
            <button
              onClick={() => setActiveTab('drivers')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'drivers'
                  ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm'
                  : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>For EV Drivers</span>
            </button>
            <button
              onClick={() => setActiveTab('hosts')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'hosts'
                  ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm'
                  : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>For Charger Hosts</span>
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentBenefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0D2921] border border-[#214438] p-6 hover:border-[#20D995]/60 hover:bg-[#13382D] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#20D995]/15 border border-[#20D995]/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#20D995]" />
                </div>
                <h3 className="text-lg font-bold text-[#F5F7F6] mb-2 group-hover:text-[#20D995] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A5B8AF] leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-[#214438]/50 flex items-center space-x-2 text-xs text-[#20D995]">
                  <Check className="w-4 h-4" />
                  <span>Verified Feature</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner below benefits */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#0D2921] via-[#13382D] to-[#0D2921] border border-[#214438] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card-glow">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-[#F5F7F6]">
              {activeTab === 'drivers' ? 'Ready to experience stress-free charging?' : 'Have an idle EV charger at your property?'}
            </h4>
            <p className="text-sm text-[#A5B8AF]">
              {activeTab === 'drivers' ? 'Find chargers nearby and reserve in under 60 seconds.' : 'Join hundreds of hosts already earning recurring revenue.'}
            </p>
          </div>
          <Link
            to={activeTab === 'drivers' ? '/chargers' : '/host'}
            className="px-6 py-3 rounded-xl font-bold text-sm bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm transition-all whitespace-nowrap"
          >
            {activeTab === 'drivers' ? 'Explore Stations Now' : 'List Your Charger'}
          </Link>
        </div>

      </div>
    </section>
  );
}

