import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useWallet } from '../context/WalletContext';
import { 
  Wallet, 
  PlusCircle, 
  Award, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RotateCcw, 
  CreditCard, 
  Zap, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  X,
  TrendingUp,
  Receipt
} from 'lucide-react';

export default function WalletPage() {
  const { 
    balance, 
    rewardPoints, 
    transactions, 
    currency, 
    addMoney, 
    refundTransaction, 
    redeemPoints 
  } = useWallet();

  const [filterType, setFilterType] = useState('all'); // all | charge | topup | refund
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [addAmount, setAddAmount] = useState('1000');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [selectedTxForReceipt, setSelectedTxForReceipt] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [rewardMsg, setRewardMsg] = useState(null);

  // Filtered transactions
  const filteredTx = transactions.filter(tx => {
    if (filterType === 'all') return true;
    return tx.type === filterType;
  });

  const handleAddMoneySubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const res = addMoney(parseFloat(addAmount), selectedMethod.toUpperCase());
      setIsProcessing(false);
      if (res.success) {
        setIsAddMoneyOpen(false);
      } else {
        alert(res.error);
      }
    }, 800);
  };

  const handleRedeemClick = () => {
    if (rewardPoints < 100) {
      alert('You need at least 100 Eco-Points to redeem credits.');
      return;
    }
    const res = redeemPoints(200);
    if (res.success) {
      setRewardMsg(`Redeemed 200 points for ${currency}${res.creditAmount} wallet credits!`);
      setTimeout(() => setRewardMsg(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#20D995]">
                Fintech Dashboard
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20D995]" />
              <span className="text-xs text-[#A5B8AF]">Secure EV Payments</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7F6] mt-0.5">
              Wallet & Charging Balances
            </h1>
          </div>

          <button
            onClick={() => setIsAddMoneyOpen(true)}
            className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow transition-all flex items-center space-x-2 self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Funds to Wallet</span>
          </button>
        </div>

        {/* Top 3 Metric Cards (inspired by Reference 3 Cointracker style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Balance Card */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0D2921] to-[#13382D] border border-[#20D995]/50 p-6 shadow-mint-glow space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF]">
                Total Available Balance
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#20D995]/20 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-[#20D995]" />
              </div>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-black text-[#F5F7F6] tracking-tight">
                {currency}{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <p className="text-xs text-[#20D995] mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Instant auto-pay ready at all 10,000+ chargers</span>
              </p>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => { setAddAmount('500'); setIsAddMoneyOpen(true); }}
                className="px-3 py-1.5 rounded-lg bg-[#061A15]/60 hover:bg-[#061A15] border border-[#214438] text-xs font-semibold text-[#F5F7F6]"
              >
                + {currency}500
              </button>
              <button
                onClick={() => { setAddAmount('1000'); setIsAddMoneyOpen(true); }}
                className="px-3 py-1.5 rounded-lg bg-[#061A15]/60 hover:bg-[#061A15] border border-[#214438] text-xs font-semibold text-[#F5F7F6]"
              >
                + {currency}1,000
              </button>
              <button
                onClick={() => { setAddAmount('2000'); setIsAddMoneyOpen(true); }}
                className="px-3 py-1.5 rounded-lg bg-[#061A15]/60 hover:bg-[#061A15] border border-[#214438] text-xs font-semibold text-[#F5F7F6]"
              >
                + {currency}2,000
              </button>
            </div>
          </div>

          {/* EV Green Reward Points */}
          <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 shadow-card-glow space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF]">
                EV Green Eco-Points
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                {rewardPoints.toLocaleString()} <span className="text-sm font-semibold text-[#A5B8AF]">pts</span>
              </span>
              <p className="text-xs text-[#A5B8AF] mt-1">
                Saved 142 kg CO₂ • Earned via 100% clean power
              </p>
            </div>

            {rewardMsg && (
              <p className="text-xs text-[#20D995] font-semibold animate-fadeIn">{rewardMsg}</p>
            )}

            <button
              onClick={handleRedeemClick}
              className="w-full py-2 rounded-xl text-xs font-bold bg-[#061A15] border border-[#214438] hover:border-[#20D995] text-[#20D995] transition-colors"
            >
              Redeem 200 pts ({currency}100 credit)
            </button>
          </div>

          {/* Payment Methods Status */}
          <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 shadow-card-glow space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF]">
                Linked Payment Methods
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-blue-400" />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#061A15] border border-[#214438] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#F5F7F6]">UPI ID:</span>
                  <span className="font-mono text-[#A5B8AF]">tejas@okaxis</span>
                </div>
                <span className="text-[10px] bg-[#20D995]/20 text-[#20D995] px-2 py-0.5 rounded font-bold">Default</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#061A15] border border-[#214438] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-[#F5F7F6]">HDFC Debit:</span>
                  <span className="font-mono text-[#A5B8AF]">•••• 4492</span>
                </div>
                <span className="text-[10px] text-[#A5B8AF]">Verified</span>
              </div>
            </div>

            <p className="text-[11px] text-[#A5B8AF] flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#20D995]" />
              <span>PCI-DSS Level 1 Encrypted Vault</span>
            </p>
          </div>

        </div>

        {/* Luminous Bar Chart (Inspired directly by Screenshot 3!) */}
        <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 sm:p-8 shadow-card-glow space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#F5F7F6]">
                Energy Consumption & Spend Analytics
              </h3>
              <p className="text-xs text-[#A5B8AF]">
                Total energy delivered: <strong className="text-[#20D995]">248.6 kWh</strong> across recent charging sessions
              </p>
            </div>

            <div className="flex items-center space-x-2 bg-[#061A15] p-1 rounded-xl border border-[#214438] text-xs">
              <button className="px-3 py-1 rounded-lg bg-[#13382D] text-[#20D995] font-bold">Monthly</button>
              <button className="px-3 py-1 rounded-lg text-[#A5B8AF] hover:text-[#F5F7F6]">Weekly</button>
            </div>
          </div>

          {/* Glowing Green Rounded Bar Chart (matching Screenshot 3) */}
          <div className="h-48 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2 border-b border-[#214438]/60">
            {[
              { month: 'Jan', val: 40, spend: '₹620' },
              { month: 'Feb', val: 55, spend: '₹880' },
              { month: 'Mar', val: 85, spend: '₹1,420' },
              { month: 'Apr', val: 65, spend: '₹980' },
              { month: 'May', val: 95, spend: '₹1,650' },
              { month: 'Jun', val: 75, spend: '₹1,240' },
              { month: 'Jul', val: 50, spend: '₹790' },
              { month: 'Aug', val: 80, spend: '₹1,380' },
              { month: 'Sep', val: 90, spend: '₹1,560' },
              { month: 'Oct', val: 70, spend: '₹1,180' },
              { month: 'Nov', val: 100, spend: '₹1,890', active: true }
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                
                {/* Tooltip on hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#061A15] border border-[#20D995] text-[10px] text-[#20D995] px-2 py-1 rounded shadow-mint-sm whitespace-nowrap z-20 pointer-events-none">
                  {col.spend}
                </div>

                {/* Bar Pill */}
                <div
                  style={{ height: `${col.val}%` }}
                  className={`w-full max-w-[28px] rounded-full transition-all duration-500 ${
                    col.active
                      ? 'bg-gradient-to-t from-[#0DAB75] to-[#20D995] shadow-mint-glow scale-105'
                      : 'bg-gradient-to-t from-[#13382D] to-[#20D995]/60 hover:to-[#20D995]'
                  }`}
                />

                {/* Month label */}
                <span className={`text-[11px] font-semibold ${col.active ? 'text-[#20D995]' : 'text-[#A5B8AF]'}`}>
                  {col.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions & Activity Table (matching Reference 3 recent activity) */}
        <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 shadow-card-glow space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-[#F5F7F6]">Transaction & Payment History</h3>
              <p className="text-xs text-[#A5B8AF]">Detailed records of charging sessions, top-ups and refunds</p>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-1.5 bg-[#061A15] p-1 rounded-xl border border-[#214438] text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterType === 'all' ? 'bg-[#20D995] text-[#061A15]' : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('charge')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterType === 'charge' ? 'bg-[#20D995] text-[#061A15]' : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
                }`}
              >
                Charging Sessions
              </button>
              <button
                onClick={() => setFilterType('topup')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterType === 'topup' ? 'bg-[#20D995] text-[#061A15]' : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
                }`}
              >
                Top-Ups
              </button>
              <button
                onClick={() => setFilterType('refund')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  filterType === 'refund' ? 'bg-[#20D995] text-[#061A15]' : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
                }`}
              >
                Refunds
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTx.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTxForReceipt(tx)}
                className="p-4 rounded-2xl bg-[#061A15] border border-[#214438] hover:border-[#20D995]/50 hover:bg-[#13382D]/40 transition-all flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.type === 'charge'
                        ? 'bg-amber-500/15 text-amber-400'
                        : tx.type === 'topup'
                        ? 'bg-[#20D995]/15 text-[#20D995]'
                        : 'bg-purple-500/15 text-purple-400'
                    }`}
                  >
                    {tx.type === 'charge' && <Zap className="w-5 h-5" />}
                    {tx.type === 'topup' && <ArrowDownLeft className="w-5 h-5" />}
                    {tx.type === 'refund' && <RotateCcw className="w-5 h-5" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[#F5F7F6]">{tx.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-[#A5B8AF] mt-0.5">
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span>{tx.method}</span>
                      {tx.kwh && (
                        <>
                          <span>•</span>
                          <span className="text-[#20D995] font-semibold">{tx.kwh} kWh</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-base font-extrabold block ${
                      tx.amount > 0 ? 'text-[#20D995]' : 'text-[#F5F7F6]'
                    }`}
                  >
                    {tx.amount > 0 ? '+' : ''}{tx.currency}{Math.abs(tx.amount).toFixed(2)}
                  </span>
                  <span className="text-[10px] font-bold text-[#20D995] bg-[#20D995]/15 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </main>

      {/* Add Money Modal */}
      {isAddMoneyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0D2921] border border-[#214438] rounded-3xl w-full max-w-md p-6 shadow-card-glow space-y-6 text-[#F5F7F6]">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#214438]">
              <div>
                <h3 className="text-lg font-bold text-[#F5F7F6]">Top-up EVCharge Wallet</h3>
                <p className="text-xs text-[#A5B8AF]">Instant credit for hassle-free charging</p>
              </div>
              <button
                onClick={() => setIsAddMoneyOpen(false)}
                className="p-1.5 rounded-lg text-[#A5B8AF] hover:text-[#F5F7F6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMoneySubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#A5B8AF] block mb-2">Enter Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#20D995]">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="100"
                    max="50000"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl pl-10 pr-4 py-3 text-lg font-bold text-[#F5F7F6] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Quick amount chips */}
              <div className="flex gap-2">
                {['500', '1000', '2000', '5000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAddAmount(amt)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      addAmount === amt
                        ? 'bg-[#20D995] text-[#061A15] border-[#20D995]'
                        : 'bg-[#061A15] text-[#A5B8AF] border-[#214438]'
                    }`}
                  >
                    +{amt}
                  </button>
                ))}
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="text-xs font-bold text-[#A5B8AF] block mb-2">Payment Method</label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-semibold ${
                      selectedMethod === 'upi'
                        ? 'bg-[#13382D] border-[#20D995] text-[#20D995]'
                        : 'bg-[#061A15] border-[#214438] text-[#F5F7F6]'
                    }`}
                  >
                    <span>Instant UPI (GPay / PhonePe / QR)</span>
                    {selectedMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-[#20D995]" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs font-semibold ${
                      selectedMethod === 'card'
                        ? 'bg-[#13382D] border-[#20D995] text-[#20D995]'
                        : 'bg-[#061A15] border-[#214438] text-[#F5F7F6]'
                    }`}
                  >
                    <span>Credit / Debit Card (Visa, RuPay, MC)</span>
                    {selectedMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-[#20D995]" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl font-bold text-sm bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm transition-all"
              >
                {isProcessing ? 'Verifying with Gateway...' : `Proceed to Pay ${currency}${addAmount}`}
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Transaction Receipt Modal */}
      {selectedTxForReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0D2921] border border-[#214438] rounded-3xl w-full max-w-sm p-6 shadow-card-glow space-y-4 text-[#F5F7F6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#214438]">
              <div className="flex items-center space-x-2">
                <Receipt className="w-4 h-4 text-[#20D995]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#20D995]">Receipt Details</span>
              </div>
              <button
                onClick={() => setSelectedTxForReceipt(null)}
                className="text-[#A5B8AF] hover:text-[#F5F7F6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-2 space-y-1">
              <span className="text-xs text-[#A5B8AF]">Transaction Total</span>
              <h4 className="text-2xl font-black text-[#20D995]">
                {selectedTxForReceipt.currency}{Math.abs(selectedTxForReceipt.amount).toFixed(2)}
              </h4>
              <span className="text-[10px] bg-[#20D995]/20 text-[#20D995] px-2.5 py-0.5 rounded-full font-bold">
                {selectedTxForReceipt.status}
              </span>
            </div>

            <div className="bg-[#061A15] p-3.5 rounded-xl border border-[#214438] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A5B8AF]">Transaction ID</span>
                <span className="font-mono text-[#F5F7F6]">{selectedTxForReceipt.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5B8AF]">Date</span>
                <span className="text-[#F5F7F6]">{selectedTxForReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A5B8AF]">Method</span>
                <span className="text-[#F5F7F6]">{selectedTxForReceipt.method}</span>
              </div>
              {selectedTxForReceipt.kwh && (
                <div className="flex justify-between">
                  <span className="text-[#A5B8AF]">Energy Delivered</span>
                  <span className="font-bold text-[#20D995]">{selectedTxForReceipt.kwh} kWh</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedTxForReceipt(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15]"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

