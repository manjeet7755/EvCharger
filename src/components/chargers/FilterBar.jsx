import React from 'react';
import { Search, Zap, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedConnector,
  setSelectedConnector,
  selectedSpeed,
  setSelectedSpeed,
  availableOnly,
  setAvailableOnly,
  sortBy,
  setSortBy,
  onReset
}) {
  const connectors = ['All', 'CCS2', 'Type 2', 'CHAdeMO', 'Type 1'];
  const speeds = [
    { label: 'All Speeds', value: 'all' },
    { label: 'Ultra-Fast (150+ kW)', value: 'ultra' },
    { label: 'Fast (50–150 kW)', value: 'fast' },
    { label: 'Standard (≤22 kW)', value: 'standard' }
  ];

  return (
    <div className="bg-[#0D2921] border border-[#214438] rounded-2xl p-4 sm:p-5 space-y-4 shadow-card-glow">
      
      {/* Top Search Bar & Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="flex-1 flex items-center space-x-2.5 px-3.5 py-2.5 bg-[#061A15] rounded-xl border border-[#214438] focus-within:border-[#20D995] transition-colors">
          <Search className="w-4 h-4 text-[#20D995] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, station name, or locality (e.g. Mumbai, BKC)..."
            className="w-full bg-transparent text-sm text-[#F5F7F6] placeholder-[#A5B8AF]/60 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-[#A5B8AF] hover:text-[#F5F7F6]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="sm:w-52">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full py-2.5 px-3 bg-[#061A15] border border-[#214438] text-sm text-[#F5F7F6] rounded-xl focus:outline-none focus:border-[#20D995] cursor-pointer"
          >
            <option value="recommended">Sort: Recommended</option>
            <option value="distance">Sort: Nearest First</option>
            <option value="rating">Sort: Highest Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="speed_high">Speed: Fastest First</option>
          </select>
        </div>
      </div>

      {/* Filter Row 1: Connector Type Pills */}
      <div>
        <label className="text-xs font-semibold text-[#A5B8AF] block mb-2">
          Connector Type
        </label>
        <div className="flex flex-wrap gap-2">
          {connectors.map((c) => {
            const isSelected = (selectedConnector.toLowerCase() === c.toLowerCase()) || 
                               (c === 'All' && selectedConnector === 'any');
            return (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedConnector(c === 'All' ? 'any' : c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-[#20D995] text-[#061A15] shadow-mint-sm'
                    : 'bg-[#061A15] text-[#A5B8AF] hover:text-[#F5F7F6] border border-[#214438]'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>{c}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Row 2: Charging Speeds & Available Only Switch */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#214438]/60">
        
        {/* Speed pills */}
        <div className="flex flex-wrap gap-1.5">
          {speeds.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSelectedSpeed(s.value)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedSpeed === s.value
                  ? 'bg-[#13382D] text-[#20D995] border border-[#20D995]'
                  : 'bg-[#061A15]/70 text-[#A5B8AF] hover:text-[#F5F7F6] border border-[#214438]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Toggle & Reset button */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-xs font-semibold text-[#F5F7F6] cursor-pointer">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 rounded text-[#20D995] focus:ring-0 focus:ring-offset-0 bg-[#061A15] border-[#214438] cursor-pointer"
            />
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-[#20D995]" />
              <span>Available Now Only</span>
            </span>
          </label>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center space-x-1 text-xs text-[#A5B8AF] hover:text-[#20D995] transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

      </div>

    </div>
  );
}

