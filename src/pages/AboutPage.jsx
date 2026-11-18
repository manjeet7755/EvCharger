import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Zap, ShieldCheck, Target, Eye, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const features = [
    "Find nearby EV charging stations with live GPS mapping",
    "Filter chargers based on connector types (CCS2, Type 2, CHAdeMO, Type 1)",
    "Guarantee arrival slots with backend double-booking prevention",
    "Empower homeowners and businesses to monetize idle chargers",
    "Foster a clean, connected green transportation community across India"
  ];

  const founders = [
    {
      name: "Tejas Shukla",
      role: "Co-Founder & Lead Architect",
      bio: "Passionate about full-stack systems, clean energy architecture, and creating frictionless digital experiences for electric mobility.",
      image: "/image/manjeet.png"
    },
    {
      name: "Manjeet Maurya",
      role: "Co-Founder & Product Engineer",
      bio: "Dedicated to solving real-world infrastructure bottlenecks through robust distributed software and intuitive user-centric design.",
      image: "/image/manjeet.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#20D995] bg-[#0D2921] border border-[#214438] px-3.5 py-1.5 rounded-full">
            About EVCharge
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#F5F7F6] tracking-tight">
            Powering the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20D995] to-[#0DAB75]">
              Electric Mobility
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#A5B8AF] leading-relaxed">
            EVCharge is India's premier community-driven charging marketplace designed to make electric vehicle charging simple, transparent, and universally accessible.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission */}
          <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-8 space-y-4 shadow-card-glow hover:border-[#20D995]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#20D995]/15 border border-[#20D995]/30 flex items-center justify-center">
              <Target className="w-6 h-6 text-[#20D995]" />
            </div>
            <h2 className="text-2xl font-bold text-[#F5F7F6]">Our Mission</h2>
            <p className="text-sm text-[#A5B8AF] leading-relaxed">
              Our mission is to eliminate range anxiety and accelerate the adoption of zero-emission mobility. We bridge the gap between EV drivers and underutilized private/public charging points, turning idle power outlets into a high-reliability distributed charging network.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-8 space-y-4 shadow-card-glow hover:border-[#20D995]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#20D995]/15 border border-[#20D995]/30 flex items-center justify-center">
              <Eye className="w-6 h-6 text-[#20D995]" />
            </div>
            <h2 className="text-2xl font-bold text-[#F5F7F6]">Our Vision</h2>
            <p className="text-sm text-[#A5B8AF] leading-relaxed">
              We envision a future where finding and plugging into an EV charger is as straightforward, dependable, and ubiquitous as finding a fuel station. EVCharge is dedicated to accelerating cleaner, smarter, and greener transportation nationwide.
            </p>
          </div>

        </div>

        {/* What We Do */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0D2921] via-[#13382D] to-[#0D2921] border border-[#214438] p-8 sm:p-12 space-y-6 shadow-card-glow">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20D995]">Platform Capabilities</span>
            <h2 className="text-3xl font-extrabold text-[#F5F7F6] mt-1">What We Do</h2>
            <p className="text-sm text-[#A5B8AF] mt-2">
              Combining cutting-edge IoT station monitoring, verified host communities, and high-speed expressway hubs into one unified ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#061A15]/80 border border-[#214438] flex items-center space-x-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#20D995]/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#20D995]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#F5F7F6]">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Founders Section (Preserving Tejas Shukla & Manjeet Maurya) */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#20D995]">Leadership</span>
            <h2 className="text-3xl font-extrabold text-[#F5F7F6]">Meet Our Founders</h2>
            <p className="text-sm text-[#A5B8AF]">
              EVCharge was founded by passionate technologists committed to electric mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((f, i) => (
              <div
                key={i}
                className="rounded-3xl bg-[#0D2921] border border-[#214438] p-8 text-center space-y-4 hover:border-[#20D995]/60 transition-all group shadow-card-glow"
              >
                <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-2 border-[#20D995] shadow-mint-sm">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#F5F7F6] group-hover:text-[#20D995] transition-colors">
                    {f.name}
                  </h3>
                  <p className="text-xs font-bold text-[#20D995] uppercase tracking-wider mt-0.5">{f.role}</p>
                </div>

                <p className="text-xs text-[#A5B8AF] leading-relaxed max-w-xs mx-auto">
                  {f.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#F5F7F6]">Be Part of the Green Transition</h3>
          <p className="text-xs sm:text-sm text-[#A5B8AF] max-w-md mx-auto">
            Join thousands of smart drivers and hosts building sustainable transportation together.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              to="/chargers"
              className="px-6 py-3 rounded-xl font-bold text-xs bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm"
            >
              Discover Chargers
            </Link>
            <Link
              to="/host"
              className="px-6 py-3 rounded-xl font-bold text-xs bg-[#061A15] text-[#F5F7F6] border border-[#214438] hover:border-[#20D995]"
            >
              List Your Wallbox
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

