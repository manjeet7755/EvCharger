import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPassword, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    const res = await resetPassword(email);
    if (res.success) {
      setIsSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to send password reset email.');
    }
  };

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#20D995]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top back button */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between">
        <Link
          to="/login"
          className="flex items-center space-x-2 text-xs font-semibold text-[#A5B8AF] hover:text-[#20D995] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
        <span className="text-xs text-[#20D995] font-mono">⚡ Reset Access</span>
      </div>

      {/* Forgot Pass Card */}
      <div className="w-full max-w-md rounded-3xl bg-[#0D2921] border border-[#214438] p-8 shadow-card-glow space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#20D995]/20 border border-[#20D995]/40 flex items-center justify-center mx-auto text-[#20D995] shadow-mint-sm">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-[#F5F7F6] tracking-tight">Forgot Password</h1>
          <p className="text-xs text-[#A5B8AF]">
            Enter the email associated with your EVCharge account to receive a secure password recovery link.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSubmitted ? (
          <div className="p-5 rounded-2xl bg-[#061A15] border border-[#20D995]/50 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-8 h-8 text-[#20D995] mx-auto" />
            <h4 className="text-sm font-bold text-[#F5F7F6]">Reset Link Dispatched!</h4>
            <p className="text-xs text-[#A5B8AF]">
              We've dispatched recovery instructions to <strong className="text-[#20D995]">{email}</strong>. Please check your inbox and spam folder.
            </p>
            <Link
              to="/login"
              className="inline-block mt-2 px-5 py-2 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15]"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Registered Email</label>
              <div className="flex items-center space-x-2.5 px-3.5 py-3 rounded-xl bg-[#061A15] border border-[#214438] focus-within:border-[#20D995] transition-colors">
                <Mail className="w-4 h-4 text-[#20D995] shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="eg- abc@gmail.com"
                  className="w-full bg-transparent text-xs text-[#F5F7F6] placeholder-[#A5B8AF]/50 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? 'Sending Mail...' : 'Send Recovery Mail'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-[#A5B8AF]">
          <span>Remember your password? </span>
          <Link to="/login" className="text-[#20D995] font-bold hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}

