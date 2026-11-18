import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getStoredWalletBalance,
  setStoredWalletBalance,
  getStoredRewardPoints,
  setStoredRewardPoints,
  getStoredTransactions,
  addStoredTransaction
} from '../lib/storage';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(getStoredWalletBalance);
  const [rewardPoints, setRewardPoints] = useState(getStoredRewardPoints);
  const [transactions, setTransactions] = useState(getStoredTransactions);
  const [currency, setCurrency] = useState('₹');

  useEffect(() => {
    setStoredWalletBalance(balance);
  }, [balance]);

  useEffect(() => {
    setStoredRewardPoints(rewardPoints);
  }, [rewardPoints]);

  const addMoney = (amount, method = 'UPI') => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return { success: false, error: 'Invalid amount' };

    const newBalance = balance + num;
    setBalance(newBalance);

    // Earn reward points (1 point per 10 currency spent/added)
    const bonusPoints = Math.floor(num / 10);
    const newPoints = rewardPoints + bonusPoints;
    setRewardPoints(newPoints);

    const newTx = {
      id: 'tx-' + Math.floor(1000 + Math.random() * 9000),
      type: 'topup',
      title: `Wallet Top-up via ${method}`,
      date: 'Just now',
      amount: num,
      currency,
      status: 'Completed',
      method: method,
      reference: `${method.toUpperCase()}/${Date.now().toString().slice(-8)}`
    };

    const updated = addStoredTransaction(newTx);
    setTransactions(updated);
    return { success: true, newBalance };
  };

  const deductMoney = (amount, title, bookingId, kwh = 0) => {
    const num = parseFloat(amount);
    if (num > balance) {
      return { success: false, error: 'Insufficient wallet balance. Please add funds.' };
    }

    const newBalance = balance - num;
    setBalance(newBalance);

    // Reward points for charging green energy
    const earnedPoints = Math.round(kwh * 5 || num * 0.1);
    setRewardPoints(rewardPoints + earnedPoints);

    const newTx = {
      id: 'tx-' + Math.floor(1000 + Math.random() * 9000),
      type: 'charge',
      title: title || 'EV Charging Session',
      date: 'Just now',
      amount: -num,
      kwh: parseFloat(kwh) || 0,
      currency,
      status: 'Completed',
      method: 'EVCharge Wallet',
      bookingId: bookingId || 'BK-' + Date.now().toString().slice(-6)
    };

    const updated = addStoredTransaction(newTx);
    setTransactions(updated);
    return { success: true, newBalance };
  };

  const refundTransaction = (amount, bookingId, reason = 'Booking Cancellation') => {
    const num = parseFloat(amount);
    const newBalance = balance + num;
    setBalance(newBalance);

    const newTx = {
      id: 'tx-' + Math.floor(1000 + Math.random() * 9000),
      type: 'refund',
      title: `Refund: ${reason}`,
      date: 'Just now',
      amount: num,
      currency,
      status: 'Completed',
      method: 'Refund to Wallet',
      bookingId
    };

    const updated = addStoredTransaction(newTx);
    setTransactions(updated);
    return { success: true, newBalance };
  };

  const redeemPoints = (pointsToRedeem) => {
    if (pointsToRedeem > rewardPoints || pointsToRedeem <= 0) {
      return { success: false, error: 'Invalid or insufficient reward points' };
    }
    // 100 points = ₹50 or $5 credit
    const creditAmount = (pointsToRedeem / 100) * 50;
    const newPoints = rewardPoints - pointsToRedeem;
    const newBalance = balance + creditAmount;

    setRewardPoints(newPoints);
    setBalance(newBalance);

    const newTx = {
      id: 'tx-' + Math.floor(1000 + Math.random() * 9000),
      type: 'topup',
      title: `Eco-Points Redemption (${pointsToRedeem} pts)`,
      date: 'Just now',
      amount: creditAmount,
      currency,
      status: 'Completed',
      method: 'EV Rewards Store'
    };

    const updated = addStoredTransaction(newTx);
    setTransactions(updated);
    return { success: true, creditAmount, newBalance };
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        rewardPoints,
        transactions,
        currency,
        setCurrency,
        addMoney,
        deductMoney,
        refundTransaction,
        redeemPoints
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
}

