import React, { useState } from 'react';
import { Zap, Navigation, Plus, Minus, Layers, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InteractiveMap({ chargers, selectedCharger, onSelectCharger, onBook }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showSatellite, setShowSatellite] = useState(false);

  // Approximate relative mapping for coordinates to SVG canvas space (width 800, height 500)
  // We can position the chargers dynamically across the map
  const getMarkerCoords = (ch, index) => {
    // Generate deterministic SVG points from latitude & index
    const positions = [
      { x: 220, y: 160 },
      { x: 380, y: 220 },
      { x: 620, y: 310 },
      { x: 280, y: 340 },
      { x: 490, y: 140 },
      { x: 160, y: 290 }
    ];
    return positions[index % positions.length];
  };

  const userLocation = { x: 180, y: 120 };
  const targetStationCoord = selectedCharger
    ? getMarkerCoords(selectedCharger, chargers.findIndex(c => c.id === selectedCharger.id))
    : { x: 380, y: 220 };

  return (
    <div className="relative w-full h-[450px] lg:h-full min-h-[440px] rounded-2xl bg-[#061A15] border border-[#214438] overflow-hidden shadow-card-glow flex flex-col justify-between">
      
      {/* Top Map Bar with city label & tools */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Current Location Badge */}
        <div className="pointer-events-auto flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0D2921]/90 backdrop-blur-md border border-[#214438] text-xs font-semibold text-[#F5F7F6] shadow-card-glow">
          <Navigation className="w-3.5 h-3.5 text-[#20D995] fill-[#20D995]" />
          <span>Mumbai / Delhi NCR Corridor</span>
          <span className="w-2 h-2 rounded-full bg-[#20D995] animate-ping" />
        </div>

        {/* Map View Controls */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-[#0D2921]/90 backdrop-blur-md border border-[#214438] p-1 rounded-xl shadow-card-glow">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
            className="p-1.5 rounded-lg text-[#A5B8AF] hover:text-[#20D995] hover:bg-[#13382D] transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
            className="p-1.5 rounded-lg text-[#A5B8AF] hover:text-[#20D995] hover:bg-[#13382D] transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowSatellite(!showSatellite)}
            className={`p-1.5 rounded-lg transition-colors ${
              showSatellite ? 'text-[#20D995] bg-[#13382D]' : 'text-[#A5B8AF] hover:text-[#20D995]'
            }`}
            title="Toggle View Mode"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* SVG Canvas Map Display (inspired by Screenshot 2 EV Hub Map) */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Dark map gradient */}
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#08211B" />
              <stop offset="100%" stopColor="#04100D" />
            </radialGradient>

            {/* Glowing mint path gradient */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#20D995" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#2CEAA2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0DAB75" stopOpacity="0.9" />
            </linearGradient>

            {/* Route glow filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Map Base background */}
          <rect width="800" height="500" fill="url(#mapGlow)" />

          {/* Map Grid / City blocks outline */}
          <g stroke="#13382D" strokeWidth="1" strokeOpacity="0.6">
            {/* Horizontal streets */}
            <line x1="0" y1="80" x2="800" y2="80" />
            <line x1="0" y1="160" x2="800" y2="160" />
            <line x1="0" y1="240" x2="800" y2="240" />
            <line x1="0" y1="320" x2="800" y2="320" />
            <line x1="0" y1="400" x2="800" y2="400" />

            {/* Vertical streets */}
            <line x1="120" y1="0" x2="120" y2="500" />
            <line x1="240" y1="0" x2="240" y2="500" />
            <line x1="360" y1="0" x2="360" y2="500" />
            <line x1="480" y1="0" x2="480" y2="500" />
            <line x1="600" y1="0" x2="600" y2="500" />
            <line x1="720" y1="0" x2="720" y2="500" />
          </g>

          {/* Diagonal Arterial Expressways */}
          <path
            d="M 50,450 C 200,380 300,300 450,200 C 550,130 680,80 780,50"
            fill="none"
            stroke="#214438"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 100,50 C 250,150 400,280 550,380 C 620,430 700,470 780,480"
            fill="none"
            stroke="#214438"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Electric Neon Green Route (inspired directly by Screenshot 2!) */}
          <path
            d={`M ${userLocation.x},${userLocation.y} C ${userLocation.x + 80},${userLocation.y + 40} ${targetStationCoord.x - 60},${targetStationCoord.y - 40} ${targetStationCoord.x},${targetStationCoord.y}`}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="6 4"
            filter="url(#neonGlow)"
            className="animate-pulse"
          />

          {/* User Location Node (Blue/Mint Pulse) */}
          <g transform={`translate(${userLocation.x}, ${userLocation.y})`}>
            <circle r="16" fill="#20D995" fillOpacity="0.2" className="animate-ping" />
            <circle r="9" fill="#0D2921" stroke="#20D995" strokeWidth="2.5" />
            <circle r="4" fill="#20D995" />
          </g>

          {/* Station Markers */}
          {chargers.map((ch, idx) => {
            const coord = getMarkerCoords(ch, idx);
            const isSelected = selectedCharger?.id === ch.id;

            return (
              <g
                key={ch.id}
                transform={`translate(${coord.x}, ${coord.y})`}
                onClick={() => onSelectCharger && onSelectCharger(ch)}
                className="cursor-pointer group"
              >
                {/* Outer halo when selected */}
                {isSelected && (
                  <circle
                    r="24"
                    fill="#20D995"
                    fillOpacity="0.25"
                    className="animate-pulse"
                  />
                )}

                {/* Station Pin Shape */}
                <path
                  d="M 0,-24 C -12,-24 -18,-14 -12,-2 C -8,6 0,16 0,16 C 0,16 8,6 12,-2 C 18,-14 12,-24 0,-24 Z"
                  fill={isSelected ? '#20D995' : '#0D2921'}
                  stroke={isSelected ? '#F5F7F6' : '#20D995'}
                  strokeWidth="2"
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
                  className="transition-all duration-300 group-hover:scale-125"
                />

                {/* Lightning Bolt icon in center */}
                <path
                  d="M 1,-16 L -4,-9 L 0,-9 L -1,-3 L 4,-10 L 0,-10 Z"
                  fill={isSelected ? '#061A15' : '#20D995'}
                  transform="translate(0, 2)"
                />

                {/* Station Quick Label */}
                <text
                  x="0"
                  y="30"
                  textAnchor="middle"
                  fill="#F5F7F6"
                  fontSize="11"
                  fontWeight="bold"
                  className="pointer-events-none select-none drop-shadow-md"
                >
                  {ch.name.split(' ')[0]}
                </text>
                <text
                  x="0"
                  y="42"
                  textAnchor="middle"
                  fill="#20D995"
                  fontSize="9"
                  fontWeight="600"
                  className="pointer-events-none select-none"
                >
                  {ch.pricing.currency}{ch.pricing.perKwh}/kWh
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Popup Card for Selected Station (matching Reference 2 station quick cards) */}
      {selectedCharger && (
        <div className="absolute bottom-4 left-4 right-4 z-20 animate-fadeIn">
          <div className="bg-[#0D2921]/95 backdrop-blur-xl border border-[#20D995] rounded-2xl p-4 shadow-mint-glow flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center space-x-3.5 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-xl bg-[#20D995]/20 border border-[#20D995]/40 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#20D995]" />
              </div>
              <div className="truncate">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm sm:text-base font-bold text-[#F5F7F6] truncate">
                    {selectedCharger.name}
                  </h4>
                  <span className="text-[10px] bg-[#20D995]/20 text-[#20D995] font-bold px-2 py-0.5 rounded-full shrink-0">
                    {selectedCharger.status}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-xs text-[#A5B8AF] mt-0.5">
                  <span>{selectedCharger.distance || '1.5 miles'}</span>
                  <span>•</span>
                  <span>Type DC</span>
                  <span>•</span>
                  <span className="text-[#20D995] font-bold">
                    {selectedCharger.pricing.currency}{selectedCharger.pricing.perKwh}/kW
                  </span>
                  <span>•</span>
                  <span>{selectedCharger.availablePorts} slots open</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <Link
                to={`/chargers/${selectedCharger.id}`}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#061A15] text-[#F5F7F6] border border-[#214438] hover:border-[#20D995] hover:text-[#20D995] transition-all"
              >
                Details
              </Link>
              <button
                type="button"
                onClick={() => onBook && onBook(selectedCharger)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#20D995] text-[#061A15] hover:bg-[#1ab87e] shadow-mint-sm transition-all flex items-center space-x-1.5"
              >
                <span>Book Slot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

