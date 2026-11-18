import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { useVehicles } from '../../context/VehicleContext';
import { validateBookingSlotConflict } from '../../lib/supabase';
import { addStoredBooking } from '../../lib/storage';
import { 
  X, 
  Calendar, 
  Clock, 
  Car, 
  Zap, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Wallet, 
  CreditCard, 
  QrCode, 
  ArrowRight, 
  ArrowLeft,
  Download,
  Share2,
  Loader2
} from 'lucide-react';

export default function BookingFlowModal({ charger, isOpen, onClose, onBookingSuccess }) {
  const { user } = useAuth();
  const { balance, deductMoney, currency } = useWallet();
  const { vehicles, activeVehicle } = useVehicles();

  // Booking Form State
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Vehicle & Duration, 3: Review & Conflict Check, 4: Payment, 5: Confirmed
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today;
  });
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM – 11:00 AM');
  const [selectedVehicleId, setSelectedVehicleId] = useState(activeVehicle?.id || vehicles[0]?.id || '');
  const [selectedConnector, setSelectedConnector] = useState(charger.connectors[0]?.type || 'CCS2');
  const [durationMinutes, setDurationMinutes] = useState(60); // minutes
  
  // Validation state
  const [isCheckingConflict, setIsCheckingConflict] = useState(false);
  const [conflictError, setConflictError] = useState(null);
  const [conflictValidated, setConflictValidated] = useState(false);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isOpen || !charger) return null;

  const currentVehicle = vehicles.find(v => v.id === selectedVehicleId) || activeVehicle || vehicles[0];

  // Energy & Price calculations
  const connectorObj = charger.connectors.find(c => c.type === selectedConnector) || charger.connectors[0];
  const powerKw = parseFloat(connectorObj?.power) || 50;
  const ratePerKwh = connectorObj?.price || charger.pricing?.perKwh || 18;
  
  // Estimated energy delivered
  const estimatedKwh = Math.min(
    (powerKw * (durationMinutes / 60) * 0.85), // 85% realistic charging curve
    currentVehicle?.batteryCapacity || 70
  );
  
  const baseCost = estimatedKwh * ratePerKwh;
  const serviceFee = 20.0;
  const gstTax = baseCost * 0.18;
  const totalCost = baseCost + serviceFee + gstTax;

  const availableSlots = [
    { time: '08:00 AM – 09:00 AM', period: 'Morning' },
    { time: '09:00 AM – 10:00 AM', period: 'Morning' },
    { time: '10:00 AM – 11:00 AM', period: 'Morning' },
    { time: '11:30 AM – 12:30 PM', period: 'Morning' },
    { time: '02:00 PM – 03:00 PM', period: 'Afternoon' },
    { time: '04:00 PM – 05:00 PM', period: 'Afternoon' },
    { time: '06:30 PM – 07:30 PM', period: 'Evening' },
    { time: '08:00 PM – 09:00 PM', period: 'Evening' }
  ];

  // Trigger server-side booking conflict check
  const handleProceedToReview = async () => {
    setIsCheckingConflict(true);
    setConflictError(null);
    setConflictValidated(false);

    try {
      const result = await validateBookingSlotConflict({
        chargerId: charger.id,
        date: selectedDate,
        timeSlot: selectedSlot
      });

      if (result.isConflict) {
        setConflictError(result.message);
        setIsCheckingConflict(false);
        return;
      }

      // Validated successfully
      setConflictValidated(true);
      setStep(3); // Proceed to review summary
    } catch (err) {
      setConflictError('Unable to verify real-time slot availability. Please try again.');
    } finally {
      setIsCheckingConflict(false);
    }
  };

  // Complete Payment & Finalize Booking
  const handleConfirmAndPay = async () => {
    setIsProcessingPayment(true);

    // Final backend check before charge
    const doubleCheck = await validateBookingSlotConflict({
      chargerId: charger.id,
      date: selectedDate,
      timeSlot: selectedSlot
    });

    if (doubleCheck.isConflict) {
      setConflictError(doubleCheck.message);
      setIsProcessingPayment(false);
      setStep(1);
      return;
    }

    if (paymentMethod === 'wallet') {
      const deduction = deductMoney(
        totalCost,
        `Charging at ${charger.name}`,
        null,
        estimatedKwh
      );
      if (!deduction.success) {
        alert(deduction.error);
        setIsProcessingPayment(false);
        return;
      }
    }

    const bookingId = 'BK-' + Math.floor(10000 + Math.random() * 90000);
    const bookingRecord = {
      id: bookingId,
      chargerId: charger.id,
      chargerName: charger.name,
      location: charger.address,
      connectorType: `${selectedConnector} (${connectorObj.power})`,
      vehicle: `${currentVehicle.make} ${currentVehicle.model}`,
      plate: currentVehicle.plate,
      date: selectedDate,
      timeSlot: selectedSlot,
      durationMinutes,
      estimatedKwh: Math.round(estimatedKwh * 10) / 10,
      cost: Math.round(totalCost * 100) / 100,
      paymentMethod: paymentMethod === 'wallet' ? 'EVCharge Wallet' : paymentMethod.toUpperCase(),
      status: 'Confirmed',
      qrCode: `EVCHARGE-${bookingId}-${charger.id}-${selectedDate}`
    };

    addStoredBooking(bookingRecord);
    setConfirmedBooking(bookingRecord);
    setIsProcessingPayment(false);
    setStep(5); // Show confirmation

    if (onBookingSuccess) {
      onBookingSuccess(bookingRecord);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0D2921] border border-[#214438] rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-card-glow text-[#F5F7F6]">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-[#214438] flex items-center justify-between bg-[#061A15]/70">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#20D995]">
                {step < 5 ? `Step ${step} of 4` : 'Reservation Confirmed'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20D995]" />
              <span className="text-xs text-[#A5B8AF]">{charger.name}</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#F5F7F6] mt-0.5">
              {step === 1 && 'Select Date & Time Slot'}
              {step === 2 && 'Select Vehicle & Duration'}
              {step === 3 && 'Review Booking Summary'}
              {step === 4 && 'Choose Payment Method'}
              {step === 5 && 'Charging Pass Ready!'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: Date & Time Slot */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Date Picker */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF] flex items-center space-x-1.5 mb-2">
                  <Calendar className="w-4 h-4 text-[#20D995]" />
                  <span>Select Arrival Date</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-3 text-sm text-[#F5F7F6] focus:outline-none"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF] flex items-center space-x-1.5 mb-2">
                  <Clock className="w-4 h-4 text-[#20D995]" />
                  <span>Choose Charging Window (1-Hour Slot)</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {availableSlots.map((slot, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        selectedSlot === slot.time
                          ? 'bg-[#13382D] border-[#20D995] shadow-mint-sm'
                          : 'bg-[#061A15] border-[#214438] hover:border-[#20D995]/50'
                      }`}
                    >
                      <span className="text-xs font-bold text-[#F5F7F6]">{slot.time}</span>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-[#A5B8AF]">{slot.period}</span>
                        <span className="text-[#20D995] font-semibold flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#20D995]" />
                          <span>Available</span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conflict Error Message if any */}
              {conflictError && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2 animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{conflictError}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Vehicle & Duration */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Vehicle Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF] flex items-center space-x-1.5 mb-2">
                  <Car className="w-4 h-4 text-[#20D995]" />
                  <span>Select Registered EV Vehicle</span>
                </label>
                <div className="space-y-2.5">
                  {vehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedVehicleId === v.id
                          ? 'bg-[#13382D] border-[#20D995] shadow-mint-sm'
                          : 'bg-[#061A15] border-[#214438] hover:border-[#20D995]/40'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={v.image}
                          alt={v.model}
                          className="w-12 h-10 object-contain"
                        />
                        <div>
                          <p className="text-sm font-bold text-[#F5F7F6]">{v.make} {v.model}</p>
                          <p className="text-xs text-[#A5B8AF]">Plate: {v.plate} • {v.batteryCapacity} kWh</p>
                        </div>
                      </div>
                      {selectedVehicleId === v.id && (
                        <CheckCircle2 className="w-5 h-5 text-[#20D995]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connector selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF] flex items-center space-x-1.5 mb-2">
                  <Zap className="w-4 h-4 text-[#20D995]" />
                  <span>Select Plug Type</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {charger.connectors.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedConnector(c.type)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedConnector === c.type
                          ? 'bg-[#13382D] border-[#20D995] shadow-mint-sm'
                          : 'bg-[#061A15] border-[#214438]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#F5F7F6]">{c.type}</span>
                        <span className="text-[10px] text-[#20D995] font-mono">{c.power}</span>
                      </div>
                      <p className="text-[11px] text-[#A5B8AF] mt-1">{currency}{c.price}/kWh</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Charging Duration */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#A5B8AF] block mb-2">
                  Estimated Charging Duration
                </label>
                <div className="flex gap-2">
                  {[30, 45, 60, 90, 120].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDurationMinutes(dur)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        durationMinutes === dur
                          ? 'bg-[#20D995] text-[#061A15] border-[#20D995]'
                          : 'bg-[#061A15] text-[#A5B8AF] border-[#214438] hover:text-[#F5F7F6]'
                      }`}
                    >
                      {dur}m
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Summary */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Server Conflict Validation Success Banner */}
              <div className="p-3 rounded-xl bg-[#20D995]/15 border border-[#20D995]/40 flex items-center space-x-2 text-xs text-[#20D995]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Backend conflict validation passed. Slot is guaranteed for reservation.</span>
              </div>

              {/* Booking Overview Card */}
              <div className="p-4 rounded-2xl bg-[#061A15] border border-[#214438] space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#214438]">
                  <span className="text-[#A5B8AF]">Charging Station</span>
                  <span className="font-bold text-[#F5F7F6]">{charger.name}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#214438]">
                  <span className="text-[#A5B8AF]">Reserved Slot</span>
                  <span className="font-bold text-[#F5F7F6]">{selectedDate} • {selectedSlot}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#214438]">
                  <span className="text-[#A5B8AF]">Vehicle</span>
                  <span className="font-bold text-[#F5F7F6]">{currentVehicle.make} {currentVehicle.model} ({currentVehicle.plate})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#214438]">
                  <span className="text-[#A5B8AF]">Plug Type & Power</span>
                  <span className="font-bold text-[#20D995]">{selectedConnector} • {connectorObj.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A5B8AF]">Estimated Energy Transfer</span>
                  <span className="font-bold text-[#20D995]">~{Math.round(estimatedKwh * 10) / 10} kWh</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-[#061A15] border border-[#214438] space-y-2 text-xs">
                <div className="flex justify-between text-[#A5B8AF]">
                  <span>Energy Cost ({Math.round(estimatedKwh * 10) / 10} kWh × {currency}{ratePerKwh})</span>
                  <span>{currency}{baseCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#A5B8AF]">
                  <span>Platform / Grid Fee</span>
                  <span>{currency}{serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#A5B8AF]">
                  <span>GST Taxes (18%)</span>
                  <span>{currency}{gstTax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#214438] flex justify-between text-sm font-extrabold text-[#F5F7F6]">
                  <span>Estimated Total</span>
                  <span className="text-[#20D995] text-base">{currency}{totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Choose Payment Method */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-[#A5B8AF]">
                Select your preferred payment method. Payment will only settle upon confirmation.
              </p>

              {/* Wallet Option */}
              <div
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'wallet'
                    ? 'bg-[#13382D] border-[#20D995] shadow-mint-sm'
                    : 'bg-[#061A15] border-[#214438]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#20D995]/20 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-[#20D995]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#F5F7F6]">EVCharge Wallet</p>
                      <p className="text-xs text-[#A5B8AF]">
                        Available balance: {currency}{balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {paymentMethod === 'wallet' && (
                    <CheckCircle2 className="w-5 h-5 text-[#20D995]" />
                  )}
                </div>

                {balance < totalCost && (
                  <p className="text-[11px] text-amber-400 mt-2">
                    Balance low. Please top up your wallet or select UPI below.
                  </p>
                )}
              </div>

              {/* UPI Option */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-[#13382D] border-[#20D995] shadow-mint-sm'
                    : 'bg-[#061A15] border-[#214438]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#F5F7F6]">Instant UPI (GPay / PhonePe / Paytm)</p>
                      <p className="text-xs text-[#A5B8AF]">Zero transaction fees • Instant verification</p>
                    </div>
                  </div>
                  {paymentMethod === 'upi' && (
                    <CheckCircle2 className="w-5 h-5 text-[#20D995]" />
                  )}
                </div>
              </div>

              {/* Card Option */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#13382D] border-[#20D995] shadow-mint-sm'
                    : 'bg-[#061A15] border-[#214438]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#F5F7F6]">Credit / Debit Card</p>
                      <p className="text-xs text-[#A5B8AF]">Visa, Mastercard, RuPay & Corporate cards</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && (
                    <CheckCircle2 className="w-5 h-5 text-[#20D995]" />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Final Confirmed Digital Pass */}
          {step === 5 && confirmedBooking && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-[#20D995]/20 border border-[#20D995] flex items-center justify-center mx-auto text-[#20D995] shadow-mint-glow">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-[#F5F7F6]">Booking Confirmed!</h4>
                <p className="text-xs text-[#A5B8AF] mt-1">
                  Your charging slot is locked and saved in your account.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-5 rounded-3xl bg-[#061A15] border border-[#20D995]/60 text-left space-y-4 shadow-mint-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#20D995] tracking-widest block">
                      Digital Charging Pass
                    </span>
                    <h5 className="text-base font-bold text-[#F5F7F6]">{confirmedBooking.chargerName}</h5>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#20D995] bg-[#0D2921] px-2.5 py-1 rounded-lg border border-[#214438]">
                    {confirmedBooking.id}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-[#214438]">
                  <div>
                    <span className="text-[#A5B8AF] block">Date & Time</span>
                    <span className="font-semibold text-[#F5F7F6]">{confirmedBooking.date}</span>
                    <span className="block text-[11px] text-[#20D995]">{confirmedBooking.timeSlot}</span>
                  </div>
                  <div>
                    <span className="text-[#A5B8AF] block">Vehicle</span>
                    <span className="font-semibold text-[#F5F7F6]">{confirmedBooking.vehicle}</span>
                    <span className="block text-[11px] text-[#A5B8AF] font-mono">{confirmedBooking.plate}</span>
                  </div>
                </div>

                {/* QR Code Mockup */}
                <div className="pt-3 border-t border-[#214438] flex items-center justify-between">
                  <div className="p-2.5 bg-white rounded-xl shadow-md">
                    <QrCode className="w-16 h-16 text-[#061A15]" />
                  </div>
                  <div className="text-right space-y-1">
                    <span className="text-[10px] text-[#A5B8AF] block">Show QR to Station Scanner</span>
                    <span className="text-xs font-bold text-[#20D995] block">Authorized Driver</span>
                    <span className="text-[11px] text-[#F5F7F6] block">{confirmedBooking.paymentMethod} • Paid {currency}{confirmedBooking.cost}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Receipt downloaded for ${confirmedBooking.id}`)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#061A15] border border-[#214438] hover:border-[#20D995] text-[#F5F7F6] flex items-center justify-center space-x-1.5"
                >
                  <Download className="w-4 h-4 text-[#20D995]" />
                  <span>Download Pass</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1-4) */}
        {step < 5 && (
          <div className="p-4 sm:p-6 border-t border-[#214438] bg-[#061A15]/80 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A5B8AF] hover:text-[#F5F7F6] flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                disabled={isCheckingConflict}
                onClick={handleProceedToReview}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm flex items-center space-x-1.5 transition-all"
              >
                {isCheckingConflict ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Next: Vehicle</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm flex items-center space-x-1.5"
              >
                <span>Review Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm flex items-center space-x-1.5"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleConfirmAndPay}
                className="px-7 py-3 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow flex items-center space-x-1.5 transition-all"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Authorizing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Pay {currency}{totalCost.toFixed(2)}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

