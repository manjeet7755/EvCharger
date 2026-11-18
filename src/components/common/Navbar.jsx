import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { 
  Zap, 
  MapPin, 
  Wallet, 
  LayoutDashboard, 
  Info, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Car, 
  PlusCircle, 
  ChevronDown 
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { balance, currency } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#061A15]/90 backdrop-blur-xl border-b border-[#214438]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#20D995] to-[#0DAB75] flex items-center justify-center shadow-mint-sm group-hover:scale-105 transition-transform">
            <Zap className="w-6 h-6 text-[#061A15] fill-[#061A15]" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-[#F5F7F6]">
              EV<span className="text-[#20D995]">Charge</span>
            </span>
            <span className="hidden sm:block text-[10px] font-medium tracking-widest uppercase text-[#A5B8AF]">
              Find • Book • Charge
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isActive('/')
                ? 'text-[#20D995] bg-[#0D2921] border border-[#214438]'
                : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#0D2921]/50'
            }`}
          >
            Home
          </Link>
          <Link
            to="/chargers"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              isActive('/chargers')
                ? 'text-[#20D995] bg-[#0D2921] border border-[#214438]'
                : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#0D2921]/50'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#20D995]" />
            <span>Find Chargers</span>
          </Link>
          <Link
            to="/host"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              location.pathname.startsWith('/host')
                ? 'text-[#20D995] bg-[#0D2921] border border-[#214438]'
                : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#0D2921]/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#20D995]" />
            <span>Host Dashboard</span>
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
              isActive('/about')
                ? 'text-[#20D995] bg-[#0D2921] border border-[#214438]'
                : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#0D2921]/50'
            }`}
          >
            <Info className="w-4 h-4 text-[#20D995]" />
            <span>About Us</span>
          </Link>
        </nav>

        {/* Right Section: Wallet & User profile / Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          
          {/* Quick Wallet Pill */}
          <Link
            to="/wallet"
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D2921] border border-[#214438] hover:border-[#20D995]/60 hover:bg-[#13382D] transition-all group"
            title="Open Wallet"
          >
            <div className="w-6 h-6 rounded-full bg-[#20D995]/20 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5 text-[#20D995]" />
            </div>
            <div className="text-left text-xs">
              <span className="text-[#A5B8AF] text-[10px] block leading-none">Wallet</span>
              <span className="font-bold text-[#F5F7F6] group-hover:text-[#20D995] transition-colors leading-tight">
                {currency}{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </Link>

          {user ? (
            /* User profile avatar and dropdown */
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-full bg-[#0D2921] border border-[#214438] hover:border-[#20D995]/60 transition-all focus:outline-none"
              >
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#20D995]/40"
                />
                <span className="text-sm font-semibold text-[#F5F7F6] max-w-[100px] truncate">
                  {user.firstName || user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-4 h-4 text-[#A5B8AF]" />
              </button>

              {profileDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-60 rounded-xl bg-[#0D2921] border border-[#214438] shadow-card-glow py-2 z-50 backdrop-blur-xl animate-fadeIn"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#214438]">
                    <p className="text-xs text-[#A5B8AF]">Signed in as</p>
                    <p className="text-sm font-bold text-[#F5F7F6] truncate">{user.name}</p>
                    <p className="text-xs text-[#20D995] font-mono truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-[#A5B8AF] hover:text-[#20D995] hover:bg-[#13382D] transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile & Vehicles</span>
                  </Link>

                  <Link
                    to="/wallet"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-[#A5B8AF] hover:text-[#20D995] hover:bg-[#13382D] transition-colors"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>My Wallet & Points</span>
                  </Link>

                  <Link
                    to="/host"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-[#A5B8AF] hover:text-[#20D995] hover:bg-[#13382D] transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Host Management</span>
                  </Link>

                  <div className="border-t border-[#214438] my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Unauthenticated CTA buttons */
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-[#F5F7F6] hover:text-[#20D995] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-lg text-sm font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm transition-all transform hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <Link
            to="/wallet"
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0D2921] border border-[#214438] text-xs font-bold text-[#20D995]"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{currency}{Math.round(balance)}</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#0D2921] border border-[#214438]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D2921] border-b border-[#214438] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#F5F7F6] hover:bg-[#13382D]"
          >
            Home
          </Link>
          <Link
            to="/chargers"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#F5F7F6] hover:bg-[#13382D]"
          >
            Find Chargers
          </Link>
          <Link
            to="/host"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#F5F7F6] hover:bg-[#13382D]"
          >
            Host Dashboard
          </Link>
          <Link
            to="/wallet"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#F5F7F6] hover:bg-[#13382D]"
          >
            My Wallet & Transactions
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#F5F7F6] hover:bg-[#13382D]"
          >
            About Us
          </Link>
          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#F5F7F6] hover:bg-[#13382D]"
          >
            My Profile & Vehicles
          </Link>

          <div className="pt-4 border-t border-[#214438] flex flex-col space-y-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-center font-bold text-red-400 bg-red-500/10 rounded-lg hover:bg-red-500/20"
              >
                Log Out ({user.name})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-bold text-[#F5F7F6] bg-[#061A15] border border-[#214438] rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center font-bold text-[#061A15] bg-[#20D995] rounded-lg shadow-mint-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

