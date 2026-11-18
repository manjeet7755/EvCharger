import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { useVehicles } from '../context/VehicleContext';
import { getStoredBookings } from '../lib/storage';
import { 
  User, 
  Car, 
  PlusCircle, 
  Trash2, 
  CalendarCheck, 
  BatteryCharging, 
  Zap, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  QrCode,
  Gauge
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { vehicles, activeVehicleId, setActiveVehicleId, addVehicle, deleteVehicle } = useVehicles();
  const [bookings] = useState(getStoredBookings);

  const [activeTab, setActiveTab] = useState('garage'); // garage | bookings | settings
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);

  // New vehicle form
  const [make, setMake] = useState('Tata');
  const [model, setModel] = useState('Curvv.ev 55');
  const [year, setYear] = useState('2025');
  const [batteryCapacity, setBatteryCapacity] = useState('55');
  const [connectorType, setConnectorType] = useState('CCS2');
  const [plate, setPlate] = useState('MH 01 EV 8899');

  const handleAddVehicleSubmit = (e) => {
    e.preventDefault();
    addVehicle({
      make,
      model,
      year,
      batteryCapacity,
      currentBattery: 85,
      connectorType,
      plate,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80'
    });
    setIsAddVehicleOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* User Profile Card Header */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0D2921] via-[#13382D] to-[#0D2921] border border-[#214438] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-card-glow">
          <div className="flex items-center space-x-5">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                alt={user?.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#20D995] shadow-mint-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#20D995] rounded-full border-2 border-[#061A15] flex items-center justify-center text-[#061A15]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black text-[#F5F7F6]">{user?.name}</h1>
                <span className="text-[10px] bg-[#20D995]/20 text-[#20D995] font-bold px-2 py-0.5 rounded-full border border-[#20D995]/30">
                  Verified EV Driver
                </span>
              </div>
              <p className="text-xs text-[#A5B8AF]">{user?.email} • {user?.phone || '+91 98765 43210'}</p>
              <p className="text-xs text-[#20D995] font-semibold">
                {vehicles.length} Registered Electric Vehicle{vehicles.length > 1 ? 's' : ''} in Garage
              </p>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="flex bg-[#061A15] p-1 rounded-xl border border-[#214438] text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('garage')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
                activeTab === 'garage'
                  ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm'
                  : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>EV Garage</span>
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 ${
                activeTab === 'bookings'
                  ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm'
                  : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Bookings ({bookings.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: VEHICLE GARAGE */}
        {activeTab === 'garage' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#F5F7F6]">My Electric Vehicles</h3>
                <p className="text-xs text-[#A5B8AF]">
                  Select active vehicle to calculate accurate energy estimates and connector compatibility
                </p>
              </div>

              <button
                onClick={() => setIsAddVehicleOpen(true)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm flex items-center space-x-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Vehicle</span>
              </button>
            </div>

            {/* Vehicles Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((v) => {
                const isActive = activeVehicleId === v.id;
                return (
                  <div
                    key={v.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                      isActive
                        ? 'bg-[#13382D] border-[#20D995] shadow-mint-glow'
                        : 'bg-[#0D2921] border-[#214438] hover:border-[#20D995]/50'
                    }`}
                  >
                    <div>
                      {/* Top plate & delete */}
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="font-mono font-bold text-[#20D995] bg-[#061A15] px-2.5 py-1 rounded-lg border border-[#214438]">
                          {v.plate}
                        </span>

                        <div className="flex items-center space-x-2">
                          {isActive && (
                            <span className="text-[10px] bg-[#20D995] text-[#061A15] font-bold px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                          {vehicles.length > 1 && (
                            <button
                              onClick={() => deleteVehicle(v.id)}
                              className="text-[#A5B8AF] hover:text-red-400 p-1"
                              title="Delete vehicle"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Car Image */}
                      <div className="h-32 w-full flex items-center justify-center p-2 bg-[#061A15] rounded-xl border border-[#214438] mb-4">
                        <img
                          src={v.image}
                          alt={v.model}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <h4 className="text-base font-bold text-[#F5F7F6]">{v.make} {v.model}</h4>
                      <p className="text-xs text-[#A5B8AF]">{v.year} Model • {v.batteryCapacity} kWh Battery</p>

                      {/* Specs */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#214438] text-xs">
                        <div className="bg-[#061A15] p-2 rounded-lg">
                          <span className="text-[10px] text-[#A5B8AF] block">Plug Type</span>
                          <span className="font-bold text-[#20D995]">{v.connectorType}</span>
                        </div>
                        <div className="bg-[#061A15] p-2 rounded-lg">
                          <span className="text-[10px] text-[#A5B8AF] block">Range</span>
                          <span className="font-bold text-[#F5F7F6]">{v.range}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#214438]/60">
                      {!isActive ? (
                        <button
                          onClick={() => setActiveVehicleId(v.id)}
                          className="w-full py-2 rounded-xl text-xs font-bold bg-[#061A15] border border-[#214438] hover:border-[#20D995] text-[#F5F7F6]"
                        >
                          Set as Default Vehicle
                        </button>
                      ) : (
                        <div className="text-center text-xs text-[#20D995] font-bold py-1">
                          ✓ Primary Vehicle for Bookings
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: MY BOOKINGS & PASSES */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-[#F5F7F6]">My Charging Reservations</h3>
              <p className="text-xs text-[#A5B8AF]">View digital access passes, time slots, and receipts</p>
            </div>

            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl bg-[#0D2921] border border-[#214438] p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-card-glow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono font-bold text-xs text-[#20D995] bg-[#061A15] px-2.5 py-1 rounded-lg border border-[#214438]">
                        {b.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#20D995]/20 text-[#20D995]">
                        {b.status}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-[#F5F7F6]">{b.chargerName}</h4>
                    <p className="text-xs text-[#A5B8AF]">{b.location}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#A5B8AF] pt-1">
                      <span>Date: <strong className="text-[#F5F7F6]">{b.date}</strong></span>
                      <span>Slot: <strong className="text-[#20D995]">{b.timeSlot}</strong></span>
                      <span>Vehicle: <strong className="text-[#F5F7F6]">{b.vehicle}</strong></span>
                      <span>Estimated: <strong className="text-[#20D995]">{b.estimatedKwh} kWh</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 self-end md:self-auto">
                    <div className="text-right">
                      <span className="text-xs text-[#A5B8AF] block">Total Paid</span>
                      <span className="text-xl font-black text-[#20D995]">₹{b.cost.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => setSelectedPass(b)}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm flex items-center space-x-1.5"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>View Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* Add Vehicle Modal */}
      {isAddVehicleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0D2921] border border-[#214438] rounded-3xl w-full max-w-md p-6 shadow-card-glow space-y-5 text-[#F5F7F6]">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#214438]">
              <h3 className="text-base font-bold text-[#F5F7F6]">Add Electric Vehicle to Garage</h3>
              <button onClick={() => setIsAddVehicleOpen(false)} className="text-[#A5B8AF] hover:text-[#F5F7F6]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5B8AF] font-bold block mb-1">Make / Brand</label>
                  <input
                    type="text"
                    required
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    placeholder="e.g. Tata, Tesla, MG"
                    className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6]"
                  />
                </div>
                <div>
                  <label className="text-[#A5B8AF] font-bold block mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="e.g. Nexon EV, Model 3"
                    className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A5B8AF] font-bold block mb-1">Battery (kWh)</label>
                  <input
                    type="number"
                    required
                    value={batteryCapacity}
                    onChange={(e) => setBatteryCapacity(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6]"
                  />
                </div>
                <div>
                  <label className="text-[#A5B8AF] font-bold block mb-1">Connector</label>
                  <select
                    value={connectorType}
                    onChange={(e) => setConnectorType(e.target.value)}
                    className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6]"
                  >
                    <option value="CCS2">CCS2</option>
                    <option value="Type 2">Type 2</option>
                    <option value="CHAdeMO">CHAdeMO</option>
                    <option value="Type 1">Type 1</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#A5B8AF] font-bold block mb-1">License Plate Number</label>
                <input
                  type="text"
                  required
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  placeholder="e.g. MH 02 EV 9901"
                  className="w-full bg-[#061A15] border border-[#214438] rounded-xl px-3 py-2 text-[#F5F7F6] font-mono uppercase"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold bg-[#20D995] text-[#061A15] shadow-mint-sm"
              >
                Save Vehicle to Garage
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QR Digital Pass Modal */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0D2921] border border-[#20D995] rounded-3xl w-full max-w-sm p-6 shadow-mint-glow space-y-4 text-[#F5F7F6] text-center">
            <div className="flex justify-between items-center pb-2 border-b border-[#214438]">
              <span className="text-xs font-mono text-[#20D995]">{selectedPass.id}</span>
              <button onClick={() => setSelectedPass(null)} className="text-[#A5B8AF]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h4 className="text-lg font-bold">{selectedPass.chargerName}</h4>
              <p className="text-xs text-[#A5B8AF]">{selectedPass.date} • {selectedPass.timeSlot}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl w-fit mx-auto shadow-lg">
              <QrCode className="w-40 h-40 text-[#061A15]" />
            </div>

            <p className="text-[11px] text-[#A5B8AF]">
              Scan at station kiosk or show to attendant for bay access.
            </p>

            <button
              onClick={() => setSelectedPass(null)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#20D995] text-[#061A15]"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

