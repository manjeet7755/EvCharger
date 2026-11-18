import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  BatteryCharging, 
  Clock, 
  CreditCard,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedConnector, setSelectedConnector] = useState('any');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchLocation) query.set('location', searchLocation);
    if (selectedConnector !== 'any') query.set('connector', selectedConnector);
    navigate(`/chargers?${query.toString()}`);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#20D995]/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#0DAB75]/15 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#0D2921] border border-[#214438] shadow-mint-sm animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-[#20D995] animate-ping" />
              <span className="text-xs font-semibold text-[#20D995] tracking-wide">
                India's #1 Peer-to-Peer & Fast Charging Network
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F7F6] leading-[1.12]">
              Power Your Journey. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20D995] via-[#2CEAA2] to-[#0DAB75]">
                Find Your Charge.
              </span>
            </h1>

            {/* Subheading description */}
            <p className="text-lg sm:text-xl text-[#A5B8AF] leading-relaxed max-w-xl font-normal">
              Discover public fast chargers and private residential hosts wherever your journey takes you — or share your personal charger and generate steady passive income.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/chargers"
                className="px-7 py-4 rounded-xl font-bold text-base bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow hover:shadow-mint-sm transition-all transform hover:-translate-y-0.5 flex items-center space-x-2.5"
              >
                <span>Find Chargers</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/host"
                className="px-7 py-4 rounded-xl font-semibold text-base bg-[#0D2921] text-[#F5F7F6] border border-[#214438] hover:border-[#20D995]/70 hover:bg-[#13382D] transition-all flex items-center space-x-2"
              >
                <Zap className="w-5 h-5 text-[#20D995]" />
                <span>Become a Host</span>
              </Link>
            </div>

            {/* Quick Live Search Bar Widget */}
            <div className="pt-4 max-w-2xl">
              <form 
                onSubmit={handleSearchSubmit}
                className="p-2 sm:p-2.5 rounded-2xl bg-[#0D2921]/90 backdrop-blur-xl border border-[#214438] shadow-card-glow grid grid-cols-1 sm:grid-cols-12 gap-2"
              >
                {/* Location Input */}
                <div className="sm:col-span-6 flex items-center space-x-2.5 px-3 py-2 bg-[#061A15]/80 rounded-xl border border-[#214438]/80 focus-within:border-[#20D995]">
                  <MapPin className="w-5 h-5 text-[#20D995] shrink-0" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search city, area, or landmark..."
                    className="w-full bg-transparent text-sm text-[#F5F7F6] placeholder-[#A5B8AF]/60 focus:outline-none"
                  />
                </div>

                {/* Connector Selector */}
                <div className="sm:col-span-4 flex items-center space-x-2 px-3 py-2 bg-[#061A15]/80 rounded-xl border border-[#214438]/80">
                  <Zap className="w-4 h-4 text-[#20D995] shrink-0" />
                  <select
                    value={selectedConnector}
                    onChange={(e) => setSelectedConnector(e.target.value)}
                    className="w-full bg-transparent text-sm text-[#F5F7F6] focus:outline-none cursor-pointer"
                  >
                    <option value="any" className="bg-[#0D2921] text-[#F5F7F6]">All Connectors</option>
                    <option value="CCS2" className="bg-[#0D2921] text-[#F5F7F6]">CCS2 (Fast DC)</option>
                    <option value="Type 2" className="bg-[#0D2921] text-[#F5F7F6]">Type 2 (AC)</option>
                    <option value="CHAdeMO" className="bg-[#0D2921] text-[#F5F7F6]">CHAdeMO</option>
                    <option value="Type 1" className="bg-[#0D2921] text-[#F5F7F6]">Type 1</option>
                  </select>
                </div>

                {/* Search Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full h-full py-2.5 px-4 rounded-xl font-bold text-sm bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] transition-colors flex items-center justify-center space-x-1.5 shadow-mint-sm"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>
              
              <div className="flex items-center space-x-4 mt-3 text-xs text-[#A5B8AF]">
                <span>Popular:</span>
                <button onClick={() => { setSearchLocation('Mumbai'); navigate('/chargers?location=Mumbai'); }} className="hover:text-[#20D995] underline underline-offset-2">Mumbai</button>
                <button onClick={() => { setSearchLocation('Bengaluru'); navigate('/chargers?location=Bengaluru'); }} className="hover:text-[#20D995] underline underline-offset-2">Bengaluru</button>
                <button onClick={() => { setSearchLocation('Delhi'); navigate('/chargers?location=Delhi'); }} className="hover:text-[#20D995] underline underline-offset-2">Delhi NCR</button>
                <button onClick={() => { setSearchLocation('Hyderabad'); navigate('/chargers?location=Hyderabad'); }} className="hover:text-[#20D995] underline underline-offset-2">Hyderabad</button>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#214438]/60 text-xs text-[#A5B8AF]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#20D995]" />
                <span>100% Guaranteed Slots</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#20D995]" />
                <span>Verified Hosts</span>
              </div>
              <div className="flex items-center space-x-2">
                <BatteryCharging className="w-4 h-4 text-[#20D995]" />
                <span>Real-Time Speed Data</span>
              </div>
            </div>

          </div>

          {/* Right Column: Inspired by Reference 1 - Interactive Phone Charging Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Ambient mint halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#20D995]/20 to-transparent rounded-full filter blur-3xl -z-10" />

            {/* Realistic Smartphone Mockup */}
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] rounded-[44px] p-3.5 bg-gradient-to-b from-[#214438] via-[#0D2921] to-[#061A15] shadow-card-glow border border-[#214438]">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#061A15] rounded-full z-20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#0D2921] border border-[#214438]" />
              </div>

              {/* Phone Inner Display */}
              <div className="rounded-[36px] bg-[#061A15] p-5 pt-7 text-left space-y-4 border border-[#214438]/50 overflow-hidden relative">
                
                {/* Header inside phone */}
                <div className="flex items-center justify-between text-xs text-[#A5B8AF] pt-1">
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-[#F5F7F6]">TYZ181</span>
                    <span className="text-[10px] text-[#20D995] bg-[#0D2921] px-1.5 py-0.5 rounded">Active Session</span>
                  </div>
                  <span className="text-[10px]">Charging Receipt</span>
                </div>

                {/* Station Card in phone */}
                <div>
                  <h3 className="text-base font-bold text-[#F5F7F6]">Shell BKC SuperHub</h3>
                  <p className="text-xs text-[#A5B8AF]">Bay #02 • CCS2 150 kW</p>
                </div>

                {/* Amount Paid & VISA badge (Reference 1 inspired) */}
                <div className="bg-[#20D995] rounded-2xl p-4 text-[#061A15] flex items-center justify-between shadow-mint-sm">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider block opacity-85">Amount Paid</span>
                    <span className="text-2xl font-black leading-none">₹540.00</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black tracking-widest block">WALLET</span>
                    <span className="text-[10px] opacity-80">Auto-Deducted</span>
                  </div>
                </div>

                {/* Energy Transfers & Mini Bar Chart (Reference 1 inspired) */}
                <div className="bg-[#0D2921] rounded-2xl p-3.5 border border-[#214438] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A5B8AF]">Energy Delivered</span>
                    <span className="font-bold text-[#20D995]">29.5 kWh</span>
                  </div>

                  {/* Luminous mini bars */}
                  <div className="flex items-end space-x-1 h-9 pt-1">
                    {[35, 45, 60, 50, 75, 80, 95, 90, 85, 70, 60, 40, 20].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={`flex-1 rounded-full ${
                          i > 8 ? 'bg-[#214438]' : 'bg-gradient-to-t from-[#0DAB75] to-[#20D995]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Charging Duration & Status Circle */}
                <div className="bg-[#0D2921] rounded-2xl p-3.5 border border-[#214438] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#A5B8AF] flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#20D995]" />
                      <span>Duration</span>
                    </div>
                    <p className="text-lg font-bold text-[#F5F7F6] mt-0.5">38m 20s</p>
                  </div>
                  
                  <div className="text-right text-xs space-y-1">
                    <div className="flex items-center justify-end space-x-1.5 text-[#20D995]">
                      <span className="w-2 h-2 rounded-full bg-[#20D995]" />
                      <span className="font-semibold">Fast Charging</span>
                    </div>
                    <div className="text-[#A5B8AF] text-[11px]">80% of 100 kWh</div>
                  </div>
                </div>

                {/* Station Pricing Breakdown */}
                <div className="text-xs space-y-1.5 pt-1 text-[#A5B8AF]">
                  <div className="flex justify-between">
                    <span>Rate</span>
                    <span className="text-[#F5F7F6] font-medium">₹18.50 / kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Idle Grace Period</span>
                    <span className="text-[#20D995] font-medium">15 minutes free</span>
                  </div>
                </div>

                {/* Interactive Action inside phone */}
                <Link
                  to="/chargers"
                  className="w-full py-2.5 rounded-xl bg-[#20D995]/15 border border-[#20D995]/40 text-[#20D995] hover:bg-[#20D995] hover:text-[#061A15] transition-all text-xs font-bold flex items-center justify-center space-x-1"
                >
                  <span>Explore Stations Nearby</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

