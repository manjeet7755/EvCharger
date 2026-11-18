import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Heart, Shield, Sparkles, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#04100D] border-t border-[#214438] pt-16 pb-12 text-[#A5B8AF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#214438]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#20D995] to-[#0DAB75] flex items-center justify-center shadow-mint-sm">
                <Zap className="w-5 h-5 text-[#061A15] fill-[#061A15]" />
              </div>
              <span className="text-2xl font-black text-[#F5F7F6]">
                EV<span className="text-[#20D995]">Charge</span>
              </span>
            </Link>
            <p className="text-sm text-[#A5B8AF] leading-relaxed max-w-sm">
              India's smart electric vehicle charging marketplace. Connecting drivers with verified high-speed charging hubs and residential hosts for seamless, zero-emission mobility.
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#20D995] bg-[#0D2921] border border-[#214438] px-3 py-1.5 rounded-lg w-fit">
              <Sparkles className="w-4 h-4" />
              <span>Tagline: Find. Book. Charge. Connect.</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5F7F6]">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/chargers" className="hover:text-[#20D995] transition-colors">Find Chargers</Link>
              </li>
              <li>
                <Link to="/chargers" className="hover:text-[#20D995] transition-colors">Interactive Map</Link>
              </li>
              <li>
                <Link to="/host" className="hover:text-[#20D995] transition-colors">Become a Host</Link>
              </li>
              <li>
                <Link to="/wallet" className="hover:text-[#20D995] transition-colors">EV Wallet & Rewards</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#20D995] transition-colors">Vehicle Garage</Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5F7F6]">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#20D995] transition-colors">About EVCharge</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#20D995] transition-colors">Our Mission & Vision</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#20D995] transition-colors">Founders</Link>
              </li>
              <li>
                <a href="#press" className="hover:text-[#20D995] transition-colors">Sustainability Impact</a>
              </li>
              <li>
                <a href="#careers" className="hover:text-[#20D995] transition-colors">Careers <span className="text-[10px] bg-[#20D995]/20 text-[#20D995] px-1.5 py-0.5 rounded">Hiring</span></a>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5F7F6]">Contact & Help</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#20D995]" />
                <span>support@evcharge.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#20D995]" />
                <span>+91 (800) 420-EV-NOW</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-[#20D995]" />
                <span>24/7 Smart Roadside Support</span>
              </li>
              <li className="pt-2">
                <span className="text-xs text-[#20D995] bg-[#20D995]/10 border border-[#20D995]/30 px-2.5 py-1 rounded-full">
                  All systems operational (99.98%)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Founders acknowledgment */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#A5B8AF] space-y-4 md:space-y-0">
          <div>
            <p>© {new Date().getFullYear()} EVCharge Technologies Inc. All rights reserved.</p>
            <p className="mt-1 text-[#20D995]/90">
              Co-founded with passion by <strong className="text-[#F5F7F6]">Tejas Shukla</strong> & <strong className="text-[#F5F7F6]">Manjeet Maurya</strong>.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-[#20D995] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#20D995] transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-[#20D995] transition-colors">Security Audit</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

