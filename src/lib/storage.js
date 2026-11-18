import { initialChargers, initialVehicles, initialWalletTransactions, initialBookings } from './mockData';

const KEYS = {
  CHARGERS: 'evcharge_chargers',
  VEHICLES: 'evcharge_vehicles',
  TRANSACTIONS: 'evcharge_transactions',
  BOOKINGS: 'evcharge_bookings',
  WALLET_BALANCE: 'evcharge_wallet_balance',
  REWARD_POINTS: 'evcharge_reward_points',
  HOST_REQUESTS: 'evcharge_host_requests',
  USER_PROFILE: 'evcharge_user_profile',
  FAVORITES: 'evcharge_favorites'
};

export function getStoredChargers() {
  const data = localStorage.getItem(KEYS.CHARGERS);
  if (!data) {
    localStorage.setItem(KEYS.CHARGERS, JSON.stringify(initialChargers));
    return initialChargers;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialChargers;
  }
}

export function saveStoredChargers(chargers) {
  localStorage.setItem(KEYS.CHARGERS, JSON.stringify(chargers));
}

export function addHostCharger(newCharger) {
  const chargers = getStoredChargers();
  const updated = [newCharger, ...chargers];
  saveStoredChargers(updated);
  return updated;
}

export function updateStoredCharger(chargerId, patch) {
  const chargers = getStoredChargers();
  const updated = chargers.map(c => c.id === chargerId ? { ...c, ...patch } : c);
  saveStoredChargers(updated);
  return updated;
}

export function getStoredVehicles() {
  const data = localStorage.getItem(KEYS.VEHICLES);
  if (!data) {
    localStorage.setItem(KEYS.VEHICLES, JSON.stringify(initialVehicles));
    return initialVehicles;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialVehicles;
  }
}

export function saveStoredVehicles(vehicles) {
  localStorage.setItem(KEYS.VEHICLES, JSON.stringify(vehicles));
}

export function getStoredBookings() {
  const data = localStorage.getItem(KEYS.BOOKINGS);
  if (!data) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(initialBookings));
    return initialBookings;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialBookings;
  }
}

export function addStoredBooking(booking) {
  const bookings = getStoredBookings();
  const updated = [booking, ...bookings];
  localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(updated));
  return updated;
}

export function getStoredTransactions() {
  const data = localStorage.getItem(KEYS.TRANSACTIONS);
  if (!data) {
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(initialWalletTransactions));
    return initialWalletTransactions;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialWalletTransactions;
  }
}

export function addStoredTransaction(tx) {
  const transactions = getStoredTransactions();
  const updated = [tx, ...transactions];
  localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(updated));
  return updated;
}

export function getStoredWalletBalance() {
  const val = localStorage.getItem(KEYS.WALLET_BALANCE);
  if (val === null) {
    localStorage.setItem(KEYS.WALLET_BALANCE, '4850.00');
    return 4850.00;
  }
  return parseFloat(val) || 0;
}

export function setStoredWalletBalance(balance) {
  localStorage.setItem(KEYS.WALLET_BALANCE, balance.toFixed(2));
}

export function getStoredRewardPoints() {
  const val = localStorage.getItem(KEYS.REWARD_POINTS);
  if (val === null) {
    localStorage.setItem(KEYS.REWARD_POINTS, '850');
    return 850;
  }
  return parseInt(val, 10) || 0;
}

export function setStoredRewardPoints(pts) {
  localStorage.setItem(KEYS.REWARD_POINTS, pts.toString());
}

