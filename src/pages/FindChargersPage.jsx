import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ChargerCard from '../components/chargers/ChargerCard';
import FilterBar from '../components/chargers/FilterBar';
import InteractiveMap from '../components/chargers/InteractiveMap';
import VehicleStatsWidget from '../components/chargers/VehicleStatsWidget';
import BookingFlowModal from '../components/booking/BookingFlowModal';
import { getStoredChargers } from '../lib/storage';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Map, List, Zap, ShieldCheck, AlertCircle } from 'lucide-react';

export default function FindChargersPage() {
  const [searchParams] = useSearchParams();
  const initialLocation = searchParams.get('location') || '';
  const initialConnector = searchParams.get('connector') || 'any';

  const [chargers, setChargers] = useState(getStoredChargers);
  const [selectedCharger, setSelectedCharger] = useState(chargers[0] || null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [chargerToBook, setChargerToBook] = useState(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState(initialLocation);
  const [selectedConnector, setSelectedConnector] = useState(initialConnector);
  const [selectedSpeed, setSelectedSpeed] = useState('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  
  // Mobile Tab (list vs map)
  const [mobileTab, setMobileTab] = useState('list'); // 'list' | 'map'
  const [dataSource, setDataSource] = useState(isSupabaseConfigured ? 'Live Supabase' : 'Local Verified Network');

  // Load from Supabase if table exists
  useEffect(() => {
    async function fetchFromSupabase() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('chargers')
            .select('*');

          if (!error && data && data.length > 0) {
            setChargers(data);
            setSelectedCharger(data[0]);
            setDataSource('Supabase Real-Time DB');
          }
        } catch (e) {
          console.warn('Could not query Supabase chargers, using local store:', e);
        }
      }
    }
    fetchFromSupabase();
  }, []);

  // Filter & Search Logic
  const filteredChargers = useMemo(() => {
    return chargers.filter((ch) => {
      // 1. Text Search (city, address, name)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = ch.name.toLowerCase().includes(q);
        const matchesAddress = ch.address.toLowerCase().includes(q);
        const matchesCity = ch.city?.toLowerCase().includes(q);
        if (!matchesName && !matchesAddress && !matchesCity) return false;
      }

      // 2. Connector Type
      if (selectedConnector !== 'any') {
        const hasConnector = ch.connectors.some(
          c => c.type.toLowerCase() === selectedConnector.toLowerCase()
        );
        if (!hasConnector) return false;
      }

      // 3. Charging Speed
      if (selectedSpeed !== 'all') {
        const maxKw = Math.max(...ch.connectors.map(c => parseFloat(c.power) || 0));
        if (selectedSpeed === 'ultra' && maxKw < 150) return false;
        if (selectedSpeed === 'fast' && (maxKw < 50 || maxKw >= 150)) return false;
        if (selectedSpeed === 'standard' && maxKw > 22) return false;
      }

      // 4. Available Only
      if (availableOnly && (ch.status !== 'Available' || ch.availablePorts <= 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        const distA = parseFloat(a.distance) || 99;
        const distB = parseFloat(b.distance) || 99;
        return distA - distB;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'price_low') {
        return a.pricing.perKwh - b.pricing.perKwh;
      }
      if (sortBy === 'speed_high') {
        const maxA = Math.max(...a.connectors.map(c => parseFloat(c.power) || 0));
        const maxB = Math.max(...b.connectors.map(c => parseFloat(c.power) || 0));
        return maxB - maxA;
      }
      return 0; // recommended
    });
  }, [chargers, searchQuery, selectedConnector, selectedSpeed, availableOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedConnector('any');
    setSelectedSpeed('all');
    setAvailableOnly(false);
    setSortBy('recommended');
  };

  const handleOpenBooking = (charger) => {
    setChargerToBook(charger);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Top Header & Data Source Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#20D995]">
                Discovery Engine
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#20D995]" />
              <span className="text-xs text-[#A5B8AF]">Live Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7F6] mt-0.5">
              Find & Reserve EV Chargers
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {/* Database mode pill */}
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0D2921] border border-[#214438] text-xs font-medium text-[#A5B8AF]">
              <span className="w-2 h-2 rounded-full bg-[#20D995]" />
              <span>Source: <strong className="text-[#F5F7F6]">{dataSource}</strong></span>
            </div>

            {/* Mobile View Toggle */}
            <div className="flex lg:hidden rounded-xl bg-[#0D2921] border border-[#214438] p-1">
              <button
                type="button"
                onClick={() => setMobileTab('list')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                  mobileTab === 'list'
                    ? 'bg-[#20D995] text-[#061A15]'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('map')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                  mobileTab === 'map'
                    ? 'bg-[#20D995] text-[#061A15]'
                    : 'text-[#A5B8AF] hover:text-[#F5F7F6]'
                }`}
              >
                <Map className="w-4 h-4" />
                <span>Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedConnector={selectedConnector}
          setSelectedConnector={setSelectedConnector}
          selectedSpeed={selectedSpeed}
          setSelectedSpeed={setSelectedSpeed}
          availableOnly={availableOnly}
          setAvailableOnly={setAvailableOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onReset={handleResetFilters}
        />

        {/* Two-Column Discovery Workspace (inspired by Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Charger Listings Cards */}
          <div className={`lg:col-span-7 space-y-4 ${mobileTab === 'map' ? 'hidden lg:block' : 'block'}`}>
            <div className="flex items-center justify-between text-xs text-[#A5B8AF] px-1">
              <span>Showing <strong className="text-[#20D995]">{filteredChargers.length}</strong> verified stations</span>
              <span>Click any station to locate on map</span>
            </div>

            {filteredChargers.length === 0 ? (
              <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-12 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="text-lg font-bold text-[#F5F7F6]">No Charging Stations Found</h3>
                <p className="text-sm text-[#A5B8AF] max-w-sm mx-auto">
                  We couldn't find any chargers matching your current filters. Try resetting filters or searching another area.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChargers.map((ch) => (
                  <ChargerCard
                    key={ch.id}
                    charger={ch}
                    isSelected={selectedCharger?.id === ch.id}
                    onSelect={(c) => setSelectedCharger(c)}
                    onBook={(c) => handleOpenBooking(c)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Interactive Map & Vehicle Stats (inspired by Screenshot 2) */}
          <div className={`lg:col-span-5 space-y-6 lg:sticky lg:top-24 ${mobileTab === 'list' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Interactive Map */}
            <div className="h-[460px]">
              <InteractiveMap
                chargers={filteredChargers}
                selectedCharger={selectedCharger}
                onSelectCharger={(c) => setSelectedCharger(c)}
                onBook={(c) => handleOpenBooking(c)}
              />
            </div>

            {/* Vehicle Stats Widget (Screenshot 2 faithful component!) */}
            <VehicleStatsWidget nearbyStation={selectedCharger} />

          </div>

        </div>

      </main>

      {/* Booking Modal */}
      {isBookingModalOpen && chargerToBook && (
        <BookingFlowModal
          charger={chargerToBook}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBookingSuccess={() => {
            // update chargers
            setChargers(getStoredChargers());
          }}
        />
      )}

      <Footer />
    </div>
  );
}

