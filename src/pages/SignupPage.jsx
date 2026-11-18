import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Mail, Lock, User, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading, authError } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (!firstName || !email || !password) {
      setLocalError('Please complete all required fields.');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    const res = await signup({ firstName, lastName, email, password });
    if (res.success) {
      navigate('/chargers');
    } else {
      setLocalError(res.error || 'Failed to create account.');
    }
  };

  const handleSocialSignup = (provider) => {
    signup({
      firstName: provider,
      lastName: 'Driver',
      email: `${provider.toLowerCase()}driver@evcharge.in`,
      password: 'password123'
    }).then(() => {
      navigate('/chargers');
    });
  };

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background glow halos */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#20D995]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top back button */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xs font-semibold text-[#A5B8AF] hover:text-[#20D995] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to EVCharge Home</span>
        </Link>
        <span className="text-xs text-[#20D995] font-mono">⚡ EVCharge Register</span>
      </div>

      {/* Signup Card */}
      <div className="w-full max-w-md rounded-3xl bg-[#0D2921] border border-[#214438] p-8 shadow-card-glow space-y-6">
        
        {/* Brand & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#20D995] to-[#0DAB75] flex items-center justify-center mx-auto shadow-mint-sm">
            <Zap className="w-6 h-6 text-[#061A15] fill-[#061A15]" />
          </div>
          <h1 className="text-2xl font-black text-[#F5F7F6] tracking-tight">Create Account</h1>
          <p className="text-xs text-[#A5B8AF]">Join India's connected EV charging marketplace</p>
        </div>

        {/* Error message */}
        {(localError || authError) && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{localError || authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* First & Last name row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">First Name</label>
              <div className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-[#061A15] border border-[#214438] focus-within:border-[#20D995]">
                <User className="w-3.5 h-3.5 text-[#20D995] shrink-0" />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tejas"
                  className="w-full bg-transparent text-xs text-[#F5F7F6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Last Name</label>
              <div className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-[#061A15] border border-[#214438] focus-within:border-[#20D995]">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Shukla"
                  className="w-full bg-transparent text-xs text-[#F5F7F6] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Email input */}
          <div>
            <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Email Address</label>
            <div className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl bg-[#061A15] border border-[#214438] focus-within:border-[#20D995] transition-colors">
              <Mail className="w-4 h-4 text-[#20D995] shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full bg-transparent text-xs text-[#F5F7F6] placeholder-[#A5B8AF]/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Create Password</label>
            <div className="flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl bg-[#061A15] border border-[#214438] focus-within:border-[#20D995] transition-colors">
              <Lock className="w-4 h-4 text-[#20D995] shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-transparent text-xs text-[#F5F7F6] placeholder-[#A5B8AF]/50 focus:outline-none"
              />
            </div>
          </div>

          {/* Terms checkbox */}
          <p className="text-[11px] text-[#A5B8AF] leading-tight">
            By registering, you agree to EVCharge's <a href="#terms" className="text-[#20D995]">Terms</a> and <a href="#privacy" className="text-[#20D995]">Privacy Policy</a>.
          </p>

          {/* Signup Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-xs bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow transition-all flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Creating Account...' : 'Get Started with EVCharge'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#214438] w-full" />
          <span className="bg-[#0D2921] px-3 text-[11px] text-[#A5B8AF] uppercase font-bold tracking-wider relative">
            or sign up with
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignup('Google')}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#061A15] border border-[#214438] hover:border-[#20D995] text-xs font-semibold text-[#F5F7F6] transition-colors"
          >
            <img src="/photos/google.png" alt="Google" className="w-4 h-4 object-contain" />
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignup('Apple')}
            className="flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-[#061A15] border border-[#214438] hover:border-[#20D995] text-xs font-semibold text-[#F5F7F6] transition-colors"
          >
            <img src="/photos/apple.png" alt="Apple" className="w-4 h-4 object-contain invert" />
            <span>Apple</span>
          </button>
        </div>

        {/* Footer Link to Login */}
        <div className="pt-2 text-center text-xs text-[#A5B8AF]">
          <span>Already have an account? </span>
          <Link to="/login" className="text-[#20D995] font-bold hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}

