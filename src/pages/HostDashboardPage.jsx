import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { getStoredChargers, addHostCharger, updateStoredCharger, getStoredBookings } from '../lib/storage';
import { 
  LayoutDashboard, 
  Zap, 
  PlusCircle, 
  CalendarCheck, 
  DollarSign, 
  BarChart3, 
  User, 
  LogOut, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  X,
  Upload,
  ArrowUpRight
} from 'lucide-react';

export default function HostDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | my-chargers | add-charger | bookings | earnings | analytics

  const [chargers, setChargers] = useState(getStoredChargers);
  const [bookings, setBookings] = useState(getStoredBookings);

  // Add Charger Form State
  const [newChargerName, setNewChargerName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newPower, setNewPower] = useState('60');
  const [newConnector, setNewConnector] = useState('CCS2');
  const [newPrice, setNewPrice] = useState('16.0');
  const [newOperatingHours, setNewOperatingHours] = useState('24/7 Always Open');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1200&q=80');
  const [addSuccessMessage, setAddSuccessMessage] = useState(null);

  // Edit Charger Modal state
  const [editingCharger, setEditingCharger] = useState(null);

  // Toggle status of a host's charger
  const handleToggleChargerStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'Available' ? 'Under Maintenance' : 'Available';
    const updated = updateStoredCharger(id, { status: nextStatus });
    setChargers(updated);
  };

  // Add Charger Handler
  const handleAddChargerSubmit = (e) => {
    e.preventDefault();

    const newStation = {
      id: 'ch-' + Date.now().toString().slice(-4),
      name: newChargerName,
      tag: 'Host Listed Station',
      address: newAddress,
      city: newCity,
      latitude: 19.0760,
      longitude: 72.8777,
      distance: '0.5 km',
      rating: 5.0,
      reviewsCount: 1,
      host: {
        name: user?.name || 'EV Host',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        isSuperHost: true,
        joined: 'Just now',
        phone: user?.phone || '+91 98765 43210'
      },
      connectors: [
        { type: newConnector, power: `${newPower} kW`, current: 'DC', status: 'Available', price: parseFloat(newPrice) }
      ],
      pricing: {
        perKwh: parseFloat(newPrice),
        currency: '₹',
        idleFeePerMin: 2.0,
        parkingFee: 0.0
      },
      operatingHours: newOperatingHours,
      isOpen247: newOperatingHours.includes('24/7'),
      status: 'Available',
      availablePorts: 1,
      totalPorts: 1,
      images: [newImageUrl],
      amenities: ['CCTV 24/7', 'Covered Parking', 'Dedicated Bay', 'High-Speed Wi-Fi'],
      description: newDescription || 'Modern, safe host charger listed via EVCharge Host Marketplace.',
      reviews: [
        { id: 'r-init', user: 'EV Driver', rating: 5, date: 'Today', comment: 'Newly listed charger with top speed.' }
      ]
    };

    const updated = addHostCharger(newStation);
    setChargers(updated);
    setAddSuccessMessage(`Station "${newChargerName}" listed successfully!`);
    
    // Reset form
    setNewChargerName('');
    setNewAddress('');
    setNewDescription('');

    setTimeout(() => {
      setAddSuccessMessage(null);
      setActiveTab('my-chargers');
    }, 2000);
  };

  // Save edited charger
  const handleSaveEditCharger = (e) => {
    e.preventDefault();
    if (!editingCharger) return;

    const updated = updateStoredCharger(editingCharger.id, {
      name: editingCharger.name,
      address: editingCharger.address,
      pricing: {
        ...editingCharger.pricing,
        perKwh: parseFloat(editingCharger.pricing.perKwh)
      },
      operatingHours: editingCharger.operatingHours
    });

    setChargers(updated);
    setEditingCharger(null);
  };

  // Booking request actions
  const handleAcceptBooking = (bId) => {
    const updated = bookings.map(b => b.id === bId ? { ...b, status: 'Confirmed' } : b);
    setBookings(updated);
    localStorage.setItem('evcharge_bookings', JSON.stringify(updated));
  };

  const handleDeclineBooking = (bId) => {
    const updated = bookings.map(b => b.id === bId ? { ...b, status: 'Cancelled' } : b);
    setBookings(updated);
    localStorage.setItem('evcharge_bookings', JSON.stringify(updated));
  };

  // Host calculations
  const totalListings = chargers.length;
  const activeChargers = chargers.filter(c => c.status === 'Available').length;
  const totalHostBookings = bookings.length;
  const totalEarnings = 42850.00; // ₹

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Host Sidebar (8 items required by prompt) */}
          <aside className="lg:col-span-3 bg-[#0D2921] border border-[#214438] rounded-3xl p-5 shadow-card-glow space-y-6">
            
            {/* Host Profile Badge */}
            <div className="flex items-center space-x-3.5 pb-4 border-b border-[#214438]">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                alt={user?.name}
                className="w-12 h-12 rounded-2xl object-cover border border-[#20D995]"
              />
              <div className="truncate">
                <h4 className="text-sm font-bold text-[#F5F7F6] truncate">{user?.name}</h4>
                <p className="text-xs text-[#20D995] font-semibold">Verified Charger Host</p>
                <p className="text-[10px] text-[#A5B8AF] truncate">{user?.email}</p>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="space-y-1.5 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === 'dashboard'
                    ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm font-bold'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('my-chargers')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === 'my-chargers'
                    ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm font-bold'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>My Chargers ({chargers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('add-charger')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === 'add-charger'
                    ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm font-bold'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D]'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Charger</span>
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === 'bookings'
                    ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm font-bold'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D]'
                }`}
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Bookings ({bookings.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('earnings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === 'earnings'
                    ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm font-bold'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D]'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Earnings Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left ${
                  activeTab === 'analytics'
                    ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm font-bold'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D]'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Performance Analytics</span>
              </button>

              <div className="pt-2 border-t border-[#214438]/60 space-y-1.5">
                <button
                  onClick={() => alert('Profile settings managed in Account view.')}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-[#A5B8AF] hover:text-[#F5F7F6] hover:bg-[#13382D] text-left"
                >
                  <User className="w-4 h-4" />
                  <span>Host Profile</span>
                </button>

                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>

          </aside>

          {/* Main Host Content Area (9 cols) */}
          <main className="lg:col-span-9 space-y-8">
            
            {/* TAB: DASHBOARD OVERVIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                
                {/* Welcome section */}
                <div className="rounded-3xl bg-gradient-to-r from-[#0D2921] via-[#13382D] to-[#0D2921] border border-[#214438] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-card-glow">
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#20D995]">
                      Host Management Center
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7F6]">
                      Welcome Back, {user?.name.split(' ')[0] || 'Host'}!
                    </h2>
                    <p className="text-xs sm:text-sm text-[#A5B8AF]">
                      Your chargers are actively accepting reservations. 0 reports or downtime issues today.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('add-charger')}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm flex items-center space-x-2 self-start sm:self-auto"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add New Charger</span>
                  </button>
                </div>

                {/* 4 Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#0D2921] border border-[#214438]">
                    <span className="text-xs text-[#A5B8AF] block">Total Listed</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#F5F7F6] mt-1 block">
                      {totalListings}
                    </span>
                    <span className="text-[10px] text-[#20D995] font-semibold">Stations live</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0D2921] border border-[#214438]">
                    <span className="text-xs text-[#A5B8AF] block">Active Ready</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#20D995] mt-1 block">
                      {activeChargers}
                    </span>
                    <span className="text-[10px] text-[#A5B8AF]">Online now</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0D2921] border border-[#214438]">
                    <span className="text-xs text-[#A5B8AF] block">Total Bookings</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#F5F7F6] mt-1 block">
                      {totalHostBookings}
                    </span>
                    <span className="text-[10px] text-[#20D995] font-semibold">100% fulfilled</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0D2921] border border-[#214438]">
                    <span className="text-xs text-[#A5B8AF] block">Gross Earnings</span>
                    <span className="text-2xl sm:text-3xl font-black text-[#20D995] mt-1 block">
                      ₹{totalEarnings.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] text-[#A5B8AF]">Deposited to wallet</span>
                  </div>
                </div>

                {/* Tracking History Graph (inspired by Screenshot 4 Ener.charge) */}
                <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 sm:p-8 space-y-4 shadow-card-glow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#F5F7F6]">Tracking History & Station Utilization</h3>
                      <p className="text-xs text-[#A5B8AF]">Monthly charging throughput (kWh) & average session durations</p>
                    </div>
                    <span className="text-xs text-[#20D995] bg-[#20D995]/15 px-3 py-1 rounded-full font-bold">
                      +18.4% this month
                    </span>
                  </div>

                  {/* SVG Curve Line Graph (Screenshot 4 inspired) */}
                  <div className="h-44 w-full pt-4">
                    <svg viewBox="0 0 700 140" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="hostGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#20D995" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#20D995" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path
                        d="M 20,120 Q 90,80 160,95 T 300,50 T 440,70 T 580,30 L 680,45 L 680,140 L 20,140 Z"
                        fill="url(#hostGlow)"
                      />

                      {/* Line */}
                      <path
                        d="M 20,120 Q 90,80 160,95 T 300,50 T 440,70 T 580,30 L 680,45"
                        fill="none"
                        stroke="#20D995"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Node circles */}
                      {[
                        { x: 20, y: 120, label: 'Feb' },
                        { x: 160, y: 95, label: 'Apr' },
                        { x: 300, y: 50, label: 'Jun' },
                        { x: 440, y: 70, label: 'Aug' },
                        { x: 580, y: 30, label: 'Oct' },
                        { x: 680, y: 45, label: 'Nov' }
                      ].map((pt, i) => (
                        <g key={i}>
                          <circle cx={pt.x} cy={pt.y} r="5" fill="#061A15" stroke="#20D995" strokeWidth="3" />
                          <text x={pt.x} y="135" textAnchor="middle" fill="#A5B8AF" fontSize="10">{pt.label}</text>
                        </g>
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Recent Bookings Quick Table */}
                <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 space-y-4 shadow-card-glow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#F5F7F6]">Recent Booking Requests</h3>
                    <button onClick={() => setActiveTab('bookings')} className="text-xs text-[#20D995] font-semibold hover:underline">
                      View all ({bookings.length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-xl bg-[#061A15] border border-[#214438] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#F5F7F6]">{b.vehicle}</span>
                            <span className="text-[#20D995] bg-[#20D995]/15 px-2 py-0.5 rounded font-mono font-bold">
                              {b.id}
                            </span>
                          </div>
                          <p className="text-[#A5B8AF] mt-0.5">
                            {b.date} • {b.timeSlot} • {b.chargerName}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <span className="font-extrabold text-[#20D995] text-sm">
                            ₹{b.cost.toFixed(2)}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#20D995]/20 text-[#20D995]">
                            {b.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: MY CHARGERS */}
            {activeTab === 'my-chargers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#F5F7F6]">My Listed Chargers</h2>
                    <p className="text-xs text-[#A5B8AF]">Manage availability status, pricing, and configurations</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('add-charger')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e]"
                  >
                    + Add Charger
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {chargers.map((ch) => (
                    <div
                      key={ch.id}
                      className="rounded-2xl bg-[#0D2921] border border-[#214438] overflow-hidden shadow-card-glow flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative h-40 w-full">
                          <img
                            src={ch.images[0]}
                            alt={ch.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <button
                              onClick={() => handleToggleChargerStatus(ch.id, ch.status)}
                              className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                                ch.status === 'Available'
                                  ? 'bg-[#20D995]/20 text-[#20D995] border-[#20D995]'
                                  : 'bg-amber-400/20 text-amber-400 border-amber-400'
                              }`}
                            >
                              {ch.status === 'Available' ? '● Online' : '● Offline'}
                            </button>
                          </div>
                        </div>

                        <div className="p-5 space-y-2">
                          <h4 className="text-base font-bold text-[#F5F7F6]">{ch.name}</h4>
                          <p className="text-xs text-[#A5B8AF] flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-[#20D995]" />
                            <span className="truncate">{ch.address}</span>
                          </p>
                          <div className="pt-2 flex justify-between text-xs text-[#A5B8AF]">
                            <span>Max Speed: <strong className="text-[#20D995]">{ch.connectors[0]?.power}</strong></span>
                            <span>Rate: <strong className="text-[#20D995]">₹{ch.pricing.perKwh}/kWh</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 grid grid-cols-2 gap-2 text-xs">
                        <button
                          onClick={() => setEditingCharger(ch)}
                          className="py-2 rounded-xl font-bold bg-[#061A15] border border-[#214438] hover:border-[#20D995] text-[#F5F7F6]"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={() => handleToggleChargerStatus(ch.id, ch.status)}
                          className="py-2 rounded-xl font-bold bg-[#13382D] text-[#20D995]"
                        >
                          {ch.status === 'Available' ? 'Pause Bays' : 'Activate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ADD CHARGER FORM */}
            {activeTab === 'add-charger' && (
              <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 sm:p-8 space-y-6 shadow-card-glow">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F7F6]">List a New Charging Station</h2>
                  <p className="text-xs text-[#A5B8AF]">
                    Make your personal wallbox or commercial charging hub discoverable to thousands of EV drivers.
                  </p>
                </div>

                {addSuccessMessage && (
                  <div className="p-4 rounded-xl bg-[#20D995]/15 border border-[#20D995] text-[#20D995] text-xs font-bold animate-fadeIn">
                    {addSuccessMessage}
                  </div>
                )}

                <form onSubmit={handleAddChargerSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Station Name</label>
                      <input
                        type="text"
                        required
                        value={newChargerName}
                        onChange={(e) => setNewChargerName(e.target.value)}
                        placeholder="e.g. GreenPoint Villa Fast Charger"
                        className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">City</label>
                      <input
                        type="text"
                        required
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        placeholder="e.g. Mumbai, Bengaluru, Delhi"
                        className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Full Physical Address</label>
                    <input
                      type="text"
                      required
                      value={newAddress}
                      onChange={(e) => setNewAddress(e.target.value)}
                      placeholder="e.g. Plot 42, Hiranandani Gardens, Powai, Mumbai, MH"
                      className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Connector Type</label>
                      <select
                        value={newConnector}
                        onChange={(e) => setNewConnector(e.target.value)}
                        className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                      >
                        <option value="CCS2">CCS2 (Fast DC)</option>
                        <option value="Type 2">Type 2 (AC Wallbox)</option>
                        <option value="CHAdeMO">CHAdeMO</option>
                        <option value="Type 1">Type 1</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Charging Power (kW)</label>
                      <input
                        type="number"
                        min="3"
                        max="350"
                        value={newPower}
                        onChange={(e) => setNewPower(e.target.value)}
                        className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Price (₹ per kWh)</label>
                      <input
                        type="number"
                        step="0.5"
                        min="5"
                        max="50"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Operating Hours</label>
                      <input
                        type="text"
                        value={newOperatingHours}
                        onChange={(e) => setNewOperatingHours(e.target.value)}
                        placeholder="e.g. 24/7 Always Open or 08:00 AM - 10:00 PM"
                        className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Station Photo URL</label>
                      <input
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl px-4 py-2.5 text-xs text-[#F5F7F6] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#A5B8AF] block mb-1.5">Station Description & Parking Instructions</label>
                    <textarea
                      rows={3}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Access instructions, gate codes, covered parking details, Wi-Fi info..."
                      className="w-full bg-[#061A15] border border-[#214438] focus:border-[#20D995] rounded-xl p-3 text-xs text-[#F5F7F6] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-glow transition-all"
                  >
                    Submit & Publish Charging Station
                  </button>
                </form>
              </div>
            )}

            {/* TAB: BOOKINGS MANAGEMENT */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F7F6]">Driver Reservations</h2>
                  <p className="text-xs text-[#A5B8AF]">Manage booking requests and view fulfillment statuses</p>
                </div>

                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-[#0D2921] border border-[#214438] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card-glow"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-base text-[#F5F7F6]">{b.vehicle}</span>
                          <span className="font-mono text-xs text-[#20D995] bg-[#061A15] px-2 py-0.5 rounded border border-[#214438]">
                            {b.id}
                          </span>
                        </div>
                        <p className="text-xs text-[#A5B8AF]">
                          {b.chargerName} • {b.date} • {b.timeSlot}
                        </p>
                        <p className="text-[11px] text-[#A5B8AF]">
                          Plate: {b.plate} • Estimated: {b.estimatedKwh} kWh
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <span className="text-base font-extrabold text-[#20D995] block">
                            ₹{b.cost.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-[#A5B8AF]">{b.paymentMethod}</span>
                        </div>

                        {b.status === 'Pending' ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleAcceptBooking(b.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#20D995] text-[#061A15] text-xs font-bold"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleDeclineBooking(b.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold"
                            >
                              Decline
                            </button>
                          </div>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#20D995]/20 text-[#20D995]">
                            {b.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: EARNINGS OVERVIEW */}
            {activeTab === 'earnings' && (
              <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 sm:p-8 space-y-6 shadow-card-glow">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F7F6]">Host Earnings Breakdown</h2>
                  <p className="text-xs text-[#A5B8AF]">Track revenue settlements, platform fees, and payouts</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-[#061A15] border border-[#214438]">
                    <span className="text-xs text-[#A5B8AF]">Total Earned</span>
                    <h3 className="text-2xl font-black text-[#20D995] mt-1">₹42,850.00</h3>
                  </div>
                  <div className="p-4 rounded-xl bg-[#061A15] border border-[#214438]">
                    <span className="text-xs text-[#A5B8AF]">Next Payout</span>
                    <h3 className="text-2xl font-black text-[#F5F7F6] mt-1">₹6,280.00</h3>
                    <span className="text-[10px] text-[#20D995]">Friday, Direct Bank Deposit</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#061A15] border border-[#214438]">
                    <span className="text-xs text-[#A5B8AF]">Platform Commission</span>
                    <h3 className="text-2xl font-black text-[#A5B8AF] mt-1">5%</h3>
                    <span className="text-[10px] text-[#A5B8AF]">Lowest host rate in India</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="rounded-3xl bg-[#0D2921] border border-[#214438] p-6 sm:p-8 space-y-6 shadow-card-glow">
                <div>
                  <h2 className="text-xl font-bold text-[#F5F7F6]">Performance & Charger Telemetry</h2>
                  <p className="text-xs text-[#A5B8AF]">Uptime monitoring, average dwell times, and peak hours</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#061A15] border border-[#214438]">
                    <span className="text-[#A5B8AF]">Peak Charging Hour</span>
                    <p className="text-lg font-bold text-[#20D995] mt-1">6:00 PM - 9:00 PM</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#061A15] border border-[#214438]">
                    <span className="text-[#A5B8AF]">Average Session</span>
                    <p className="text-lg font-bold text-[#F5F7F6] mt-1">42 Minutes</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#061A15] border border-[#214438]">
                    <span className="text-[#A5B8AF]">Network Uptime</span>
                    <p className="text-lg font-bold text-[#20D995] mt-1">99.8%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#061A15] border border-[#214438]">
                    <span className="text-[#A5B8AF]">Customer Rating</span>
                    <p className="text-lg font-bold text-amber-400 mt-1">4.9 / 5.0</p>
                  </div>
                </div>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Edit Charger Modal */}
      {editingCharger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0D2921] border border-[#214438] rounded-3xl w-full max-w-md p-6 shadow-card-glow space-y-4 text-[#F5F7F6]">
            <div className="flex items-center justify-between pb-3 border-b border-[#214438]">
              <h3 className="text-base font-bold text-[#F5F7F6]">Edit Charger Specifications</h3>
              <button onClick={() => setEditingCharger(null)} className="text-[#A5B8AF] hover:text-[#F5F7F6]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditCharger} className="space-y-3 text-xs">
              <div>
                <label className="text-[#A5B8AF] block mb-1">Station Name</label>
                <input
                  type="text"
                  value={editingCharger.name}
                  onChange={(e) => setEditingCharger({ ...editingCharger, name: e.target.value })}
                  className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6]"
                />
              </div>

              <div>
                <label className="text-[#A5B8AF] block mb-1">Address</label>
                <input
                  type="text"
                  value={editingCharger.address}
                  onChange={(e) => setEditingCharger({ ...editingCharger, address: e.target.value })}
                  className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6]"
                />
              </div>

              <div>
                <label className="text-[#A5B8AF] block mb-1">Rate (₹ per kWh)</label>
                <input
                  type="number"
                  step="0.5"
                  value={editingCharger.pricing.perKwh}
                  onChange={(e) => setEditingCharger({
                    ...editingCharger,
                    pricing: { ...editingCharger.pricing, perKwh: e.target.value }
                  })}
                  className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCharger(null)}
                  className="flex-1 py-2 rounded-xl bg-[#061A15] border border-[#214438] text-[#A5B8AF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#20D995] text-[#061A15] font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

